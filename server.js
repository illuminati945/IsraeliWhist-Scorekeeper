import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'src');
const SESSIONS_DIR = path.join(__dirname, 'data', 'sessions');
const BACKUPS_DIR = path.join(__dirname, 'data', 'backups');
const ARCHIVE_FILE = path.join(__dirname, 'data', 'archive.json');

if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Generate human-friendly 6-character room codes (e.g. W-7429)
function generateRoomCode() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `W-${code}`;
}

// Helper to detect state regression (prevent wiping/clearing active games with empty/blank states)
export function isStateRegression(existing, incoming) {
  if (!existing) return false;
  if (!incoming) return true;

  const existingRounds = (existing.completedRounds || []).length;
  const incomingRounds = (incoming.completedRounds || []).length;

  // 1. If existing game has completed rounds and incoming has 0, strictly reject
  if (existingRounds > 0 && incomingRounds === 0) {
    return true;
  }

  // 2. Player names & baseline protection: if existing has custom names or baseline scores, do not allow default blank to overwrite
  const isDefaultName = (name, idx) => !name || name === `Player ${idx + 1}` || name === `שחקן ${idx + 1}`;
  const existingHasCustomNames = (existing.players || []).some((p, i) => !isDefaultName(p.name, i));
  const incomingHasOnlyDefault = (incoming.players || []).every((p, i) => isDefaultName(p.name, i));
  const existingHasBaseline = (existing.initialScores || []).some(s => s !== 0);
  const incomingHasOnlyZeroBaseline = (incoming.initialScores || []).every(s => s === 0);

  if ((existingHasCustomNames || existingHasBaseline) && incomingHasOnlyDefault && incomingHasOnlyZeroBaseline && incomingRounds === 0) {
    return true;
  }

  // 3. If incoming has fewer rounds than existing, only allow a legitimate single-step undo
  if (incomingRounds < existingRounds) {
    const isSingleUndo = (
      existingRounds - incomingRounds === 1 &&
      incoming.id === existing.id
    );
    if (!isSingleUndo) {
      return true;
    }
  }

  return false;
}

// In-memory sessions cache
const memorySessions = new Map();

// Helper to extract summary from session state
function createGameSummary(roomId, session) {
  if (!session) return null;
  const players = (session.players || []).map((p, idx) => {
    let score = (session.initialScores && typeof session.initialScores[idx] === 'number') ? session.initialScores[idx] : 0;
    if (session.completedRounds && session.completedRounds.length > 0) {
      const lastRound = session.completedRounds[session.completedRounds.length - 1];
      if (lastRound.cumulativeScores && typeof lastRound.cumulativeScores[idx] === 'number') {
        score = lastRound.cumulativeScores[idx];
      }
    }
    return {
      name: p.name,
      color: p.color,
      score
    };
  });

  let leaderName = players[0] ? players[0].name : 'Player 1';
  let leaderScore = players[0] ? players[0].score : 0;
  players.forEach(p => {
    if (p.score > leaderScore) {
      leaderScore = p.score;
      leaderName = p.name;
    }
  });

  return {
    roomId: roomId || session.id || 'W-LOCAL',
    id: session.id || roomId,
    createdAt: session.createdAt || new Date().toISOString(),
    updatedAt: session.updatedAt || new Date().toISOString(),
    roundNumber: session.roundNumber || 1,
    completedRoundsCount: session.completedRounds ? session.completedRounds.length : 0,
    status: session.status || 'IN_PROGRESS',
    simplifiedMode: session.simplifiedMode !== undefined ? session.simplifiedMode : true,
    players,
    leaderName,
    leaderScore,
    fullState: session
  };
}

// Helper to get persistent recent games (top 10)
function getRecentGames() {
  const summaries = [];
  try {
    const files = fs.readdirSync(SESSIONS_DIR);
    for (const file of files) {
      if (!file.endsWith('.json') || file.startsWith('TEST-')) continue;
      const roomId = file.replace('.json', '');
      const filePath = path.join(SESSIONS_DIR, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const summary = createGameSummary(roomId, data);
        if (summary) {
          const stats = fs.statSync(filePath);
          summary.updatedAt = stats.mtime.toISOString();
          summaries.push(summary);
        }
      } catch (e) {
        console.error(`Error reading session file ${file}:`, e);
      }
    }
  } catch (e) {
    console.error('Error scanning sessions directory:', e);
  }

  // Sort by updatedAt descending
  summaries.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return summaries.slice(0, 10);
}

// Helper to load session
function loadSession(roomId) {
  if (memorySessions.has(roomId)) {
    return memorySessions.get(roomId);
  }
  const filePath = path.join(SESSIONS_DIR, `${roomId}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      memorySessions.set(roomId, data);
      return data;
    } catch (e) {
      console.error(`Error reading session file for ${roomId}:`, e);
    }
  }
  return null;
}

// Helper to save session
function saveSession(roomId, state) {
  state.updatedAt = new Date().toISOString();
  memorySessions.set(roomId, state);
  const filePath = path.join(SESSIONS_DIR, `${roomId}.json`);

  // Maintain automatic rolling backup of previous valid state
  if (fs.existsSync(filePath)) {
    try {
      const backupPath = path.join(BACKUPS_DIR, `${roomId}.bak.json`);
      fs.copyFileSync(filePath, backupPath);
    } catch (e) {
      console.error(`Error creating backup for ${roomId}:`, e);
    }
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {
    console.error(`Error saving session file for ${roomId}:`, e);
  }
}

// Helper to delete session
function deleteSession(roomId) {
  memorySessions.delete(roomId);
  const filePath = path.join(SESSIONS_DIR, `${roomId}.json`);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.error(`Error deleting session file for ${roomId}:`, e);
    }
  }
}

// Create HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let reqPath = parsedUrl.pathname;

  // Handle /whist/ prefix
  if (reqPath.startsWith('/whist/')) {
    reqPath = reqPath.slice(6);
  } else if (reqPath === '/whist') {
    res.writeHead(301, { 'Location': '/whist/' });
    res.end();
    return;
  }

  // REST API Endpoints
  if (reqPath === '/api/new-room') {
    const roomId = generateRoomCode();
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ roomId }));
    return;
  }

  if (reqPath === '/api/recent-games') {
    const games = getRecentGames();
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ success: true, games }));
    return;
  }

  if (reqPath.startsWith('/api/delete-session/')) {
    const roomId = reqPath.replace('/api/delete-session/', '').trim();
    deleteSession(roomId);
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ success: true, roomId }));
    return;
  }

  if (reqPath.startsWith('/api/session/')) {
    const roomId = reqPath.replace('/api/session/', '').trim();
    if (req.method === 'GET') {
      const session = loadSession(roomId);
      if (session) {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, session }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: 'Session not found' }));
      }
      return;
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const existing = loadSession(roomId);

          if (isStateRegression(existing, parsed)) {
            console.warn(`[Security] Blocked session regression for ${roomId} from HTTP POST.`);
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ success: true, rejected: true, session: existing }));
            return;
          }

          saveSession(roomId, parsed);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: true, roomId }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        }
      });
      return;
    }
  }

  // Static File Serving
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, fallback) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(fallback);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    }
  });
});

// WebSocket Real-Time Synchronization Server
const wss = new WebSocketServer({ server });

// Map of roomId -> Set of WebSocket clients
const rooms = new Map();

function broadcastToRoom(roomId, message, senderWs = null) {
  const clients = rooms.get(roomId);
  if (!clients) return;
  const payload = JSON.stringify(message);
  for (const client of clients) {
    if (client !== senderWs && client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

wss.on('connection', (ws) => {
  let currentRoomId = null;

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);

      if (msg.type === 'JOIN') {
        currentRoomId = msg.roomId;
        if (!rooms.has(currentRoomId)) {
          rooms.set(currentRoomId, new Set());
        }
        rooms.get(currentRoomId).add(ws);

        // Load existing session if available
        const sessionState = loadSession(currentRoomId);
        const count = rooms.get(currentRoomId).size;

        ws.send(JSON.stringify({
          type: 'JOINED',
          roomId: currentRoomId,
          state: sessionState,
          userCount: count
        }));

        // Notify other room members
        broadcastToRoom(currentRoomId, {
          type: 'USER_COUNT_CHANGED',
          roomId: currentRoomId,
          userCount: count
        }, ws);

      } else if (msg.type === 'SYNC_STATE') {
        const { roomId, state } = msg;
        if (roomId && state) {
          const existing = loadSession(roomId);
          if (isStateRegression(existing, state)) {
            console.warn(`[Security] Blocked session regression for ${roomId} from WebSocket client. Restoring authoritative state to sender.`);
            ws.send(JSON.stringify({
              type: 'STATE_UPDATED',
              roomId,
              state: existing,
              userCount: rooms.get(roomId) ? rooms.get(roomId).size : 1
            }));
            return;
          }

          saveSession(roomId, state);
          const count = rooms.get(roomId) ? rooms.get(roomId).size : 1;
          broadcastToRoom(roomId, {
            type: 'STATE_UPDATED',
            roomId,
            state,
            userCount: count
          }, ws);
        }
      } else if (msg.type === 'GET_RECENT_GAMES') {
        const games = getRecentGames();
        ws.send(JSON.stringify({
          type: 'RECENT_GAMES_LIST',
          games
        }));
      } else if (msg.type === 'PING') {
        ws.send(JSON.stringify({ type: 'PONG' }));
      }
    } catch (e) {
      console.error('WebSocket message parsing error:', e);
    }
  });

  ws.on('close', () => {
    if (currentRoomId && rooms.has(currentRoomId)) {
      const set = rooms.get(currentRoomId);
      set.delete(ws);
      if (set.size === 0) {
        rooms.delete(currentRoomId);
      } else {
        broadcastToRoom(currentRoomId, {
          type: 'USER_COUNT_CHANGED',
          roomId: currentRoomId,
          userCount: set.size
        });
      }
    }
  });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Israeli Whist Multiplayer Server running on port ${PORT}`);
  });
}
