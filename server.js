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

if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
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

// In-memory sessions cache
const memorySessions = new Map();

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
  memorySessions.set(roomId, state);
  const filePath = path.join(SESSIONS_DIR, `${roomId}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {
    console.error(`Error saving session file for ${roomId}:`, e);
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
          saveSession(roomId, state);
          const count = rooms.get(roomId) ? rooms.get(roomId).size : 1;
          broadcastToRoom(roomId, {
            type: 'STATE_UPDATED',
            roomId,
            state,
            userCount: count
          }, ws);
        }
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Israeli Whist Multiplayer Server running on port ${PORT}`);
});
