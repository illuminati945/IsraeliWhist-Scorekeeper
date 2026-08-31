/**
 * Real-Time Session & Multi-User Sync Manager
 */

export class SyncManager {
  constructor(app, onRemoteUpdate) {
    this.app = app;
    this.onRemoteUpdate = onRemoteUpdate;
    this.roomId = this.detectRoomIdFromUrl();
    this.ws = null;
    this.connected = false;
    this.userCount = 1;
    this.listeners = [];
    this.isApplyingRemote = false;

    this.init();
  }

  detectRoomIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('game') || urlParams.get('room');
    if (!id && window.location.hash) {
      id = window.location.hash.replace('#', '').trim();
    }
    if (!id) {
      id = this.generateFallbackCode();
    }
    this.updateUrl(id);
    return id;
  }

  generateFallbackCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `W-${code}`;
  }

  updateUrl(roomId) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('game', roomId);
    window.history.replaceState({ roomId }, '', newUrl.toString());
  }

  getShareUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('game', this.roomId);
    return url.toString();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        roomId: this.roomId,
        connected: this.connected,
        userCount: this.userCount,
        shareUrl: this.getShareUrl()
      });
    }
  }

  init() {
    this.connectWebSocket();
  }

  connectWebSocket() {
    const loc = window.location;
    const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:';
    
    // In nginx, /whist/ is reverse proxied
    let wsUrl = `${protocol}//${loc.host}/whist/ws`;
    if (loc.pathname === '/' || !loc.pathname.startsWith('/whist')) {
      wsUrl = `${protocol}//${loc.host}/ws`;
    }

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.connected = true;
        this.notify();
        this.joinRoom(this.roomId);
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch (e) {
          console.warn('Sync parse error:', e);
        }
      };

      this.ws.onclose = () => {
        this.connected = false;
        this.notify();
        // Try reconnecting after delay
        setTimeout(() => this.connectWebSocket(), 3000);
      };

      this.ws.onerror = (err) => {
        console.warn('WebSocket connection error:', err);
        this.connected = false;
        this.notify();
      };
    } catch (e) {
      console.warn('WebSocket init error:', e);
    }
  }

  joinRoom(roomId) {
    this.roomId = roomId;
    this.updateUrl(roomId);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'JOIN',
        roomId
      }));
    }
  }

  handleMessage(msg) {
    if (msg.type === 'JOINED') {
      this.userCount = msg.userCount || 1;
      this.notify();
      if (msg.state) {
        this.isApplyingRemote = true;
        this.onRemoteUpdate(msg.state);
        this.isApplyingRemote = false;
      } else {
        // Broadcast current local state so room has state
        this.broadcastLocalState();
      }
    } else if (msg.type === 'USER_COUNT_CHANGED') {
      this.userCount = msg.userCount || 1;
      this.notify();
    } else if (msg.type === 'STATE_UPDATED') {
      if (msg.state) {
        this.isApplyingRemote = true;
        this.onRemoteUpdate(msg.state);
        this.isApplyingRemote = false;
      }
      if (msg.userCount) {
        this.userCount = msg.userCount;
        this.notify();
      }
    }
  }

  broadcastLocalState() {
    if (this.isApplyingRemote) return;
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const state = {
      id: this.app.session.id,
      createdAt: this.app.session.createdAt,
      rules: this.app.session.rules,
      targetPoints: this.app.session.targetPoints,
      maxRounds: this.app.session.maxRounds,
      players: this.app.session.players,
      currentDealerIndex: this.app.session.currentDealerIndex,
      roundNumber: this.app.session.roundNumber,
      completedRounds: this.app.session.completedRounds,
      activeRound: this.app.session.activeRound,
      status: this.app.session.status
    };

    this.ws.send(JSON.stringify({
      type: 'SYNC_STATE',
      roomId: this.roomId,
      state
    }));
  }

  switchRoom(newRoomId) {
    this.joinRoom(newRoomId);
  }
}
