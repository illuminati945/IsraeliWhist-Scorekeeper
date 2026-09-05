/**
 * Israeli Whist Scorekeeper - Main Entrypoint with Landing Page, Real-Time Sync, Server Archive & Bilingual i18n
 */
import { GameSession } from './engine/game-state.js';
import { SyncManager } from './engine/sync-manager.js';
import { ArchiveManager } from './engine/archive-manager.js';
import { LandingView } from './ui/landing-view.js';
import { RoundView } from './ui/round-view.js';
import { Scoreboard } from './ui/scoreboard.js';
import { ChartView } from './ui/chart-view.js';
import { Dialogs } from './ui/dialogs.js';
import { EN } from './i18n/en.js';
import { HE } from './i18n/he.js';

class IsraeliWhistApp {
  constructor() {
    window.__ISRAELI_WHIST_APP__ = this;
    this.initLanguage();

    // Check if URL specifies a game room or if we should show landing lobby
    const urlParams = new URLSearchParams(window.location.search);
    const targetRoomId = urlParams.get('game') || urlParams.get('room') || (window.location.hash.length > 1 ? window.location.hash.replace('#', '').trim() : null);
    const hasGameParam = !!targetRoomId;

    // Load initial session safely without wiping shared rooms
    this.session = this.loadInitialSession(targetRoomId);
    
    this.initElements();
    this.initControllers();
    this.initSyncManager();
    this.bindGlobalEvents();
    this.updateStaticI18n();

    // Sync persistent games from server
    ArchiveManager.syncWithServer(() => {
      if (this.landingContainer && this.landingContainer.style.display !== 'none') {
        this.landingView.render();
      }
    });

    if (hasGameParam) {
      this.showGameView();
      // Fetch authoritative state from server asynchronously via REST
      this.fetchRoomStateFromServer(targetRoomId);
    } else {
      this.showLandingView();
    }

    this.bindSessionListeners(this.session);
  }

  loadInitialSession(targetRoomId) {
    if (targetRoomId) {
      const recent = ArchiveManager.getRecentGames();
      const match = recent.find(g => g.roomId === targetRoomId || g.id === targetRoomId);
      if (match && match.fullState) {
        return new GameSession(match.fullState);
      }
    }
    return GameSession.loadFromStorage();
  }

  async fetchRoomStateFromServer(roomId) {
    if (!roomId) return;
    try {
      const basePath = ArchiveManager.getBasePath();
      const apiUrl = `${basePath}/api/session/${roomId}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.session) {
          this.applyRemoteState(data.session);
        }
      }
    } catch (e) {
      console.warn('REST session fetch failed, relying on WebSocket:', e);
    }
  }

  bindSessionListeners(session) {
    if (!session) return;
    session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);

      if (this.syncManager) {
        this.syncManager.broadcastLocalState();
      }

      this.archiveCurrentGame();
    });
  }

  initLanguage() {
    let savedLang = null;
    try {
      savedLang = localStorage.getItem('israeli_whist_lang');
    } catch (e) {}

    if (!savedLang && typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.startsWith('he')) {
        savedLang = 'he';
      }
    }

    this.i18n = savedLang === 'he' ? HE : EN;
    document.documentElement.lang = this.i18n.lang;
    document.documentElement.dir = this.i18n.dir;
  }

  setLanguage(langCode) {
    this.i18n = langCode === 'he' ? HE : EN;
    document.documentElement.lang = this.i18n.lang;
    document.documentElement.dir = this.i18n.dir;
    
    try {
      localStorage.setItem('israeli_whist_lang', langCode);
    } catch (e) {}

    this.updateStaticI18n();

    this.landingView.render();
    this.roundView.updateI18n(this.i18n);
    this.scoreboard.updateI18n(this.i18n);
    this.chartView.render();
  }

  updateStaticI18n() {
    const t = this.i18n;
    if (this.btnBrandHome) this.btnBrandHome.textContent = t.appName;
    if (this.btnLangToggle) {
      this.btnLangToggle.textContent = t.lang === 'he' ? 'EN' : 'עב';
    }
    if (this.btnShare) this.btnShare.textContent = t.share;
    if (this.btnMenu) this.btnMenu.textContent = t.menu;

    const tabRound = document.getElementById('tab-btn-round');
    const tabHistory = document.getElementById('tab-btn-history');
    const tabChart = document.getElementById('tab-btn-chart');

    if (tabRound) tabRound.textContent = t.tabActiveDeal;
    if (tabHistory) tabHistory.textContent = t.tabHistory;
    if (tabChart) tabChart.textContent = t.tabChart;
  }

  initElements() {
    this.landingContainer = document.getElementById('landing-view-container');
    this.gameContainer = document.getElementById('game-view-container');
    this.leaderboardContainer = document.getElementById('leaderboard-section');
    this.roundContainer = document.getElementById('round-view-container');
    this.historyContainer = document.getElementById('history-view-container');
    this.chartContainer = document.getElementById('chart-view-container');
    this.roomCodeDisplay = document.getElementById('room-code-display');
    this.syncIndicator = document.getElementById('sync-indicator');
    this.btnBrandHome = document.getElementById('btn-brand-home');
    this.btnLangToggle = document.getElementById('btn-lang-toggle');
    this.btnShare = document.getElementById('btn-open-share');
    this.btnMenu = document.getElementById('btn-open-menu');

    if (ArchiveManager.getBasePath() === '/whist-dev') {
      if (this.btnBrandHome && !document.getElementById('dev-env-badge')) {
        const badge = document.createElement('span');
        badge.id = 'dev-env-badge';
        badge.className = 'dev-badge';
        badge.textContent = 'DEV';
        this.btnBrandHome.parentNode.insertBefore(badge, this.btnBrandHome.nextSibling);
      }
    }
  }

  initControllers() {
    this.dialogs = new Dialogs(this);
    this.landingView = new LandingView(this, this.landingContainer);

    this.roundView = new RoundView(
      this.session, 
      this.roundContainer, 
      this.i18n,
      () => {
        this.scoreboard.render();
        this.chartView.render();
      }
    );

    this.scoreboard = new Scoreboard(
      this.session,
      this.leaderboardContainer,
      this.historyContainer,
      this.i18n,
      () => {
        this.session.undoLastRound();
        this.roundView.render();
        this.scoreboard.render();
        this.chartView.render();
      },
      (playerIdx) => {
        this.dialogs.showReorganizeSeatingModal(playerIdx);
      },
      (roundIdx) => {
        this.dialogs.showEditDealModal(roundIdx);
      },
      () => {
        this.dialogs.showBaselineModal();
      }
    );

    this.chartView = new ChartView(
      this.session,
      this.chartContainer,
      this.i18n
    );
  }

  initSyncManager() {
    this.syncManager = new SyncManager(this, (remoteState) => {
      this.applyRemoteState(remoteState);
    });

    this.syncManager.subscribe((info) => {
      if (this.roomCodeDisplay) {
        this.roomCodeDisplay.textContent = info.roomId || 'W-...';
      }
      if (this.syncIndicator) {
        this.syncIndicator.style.background = info.connected ? '#10b981' : '#ef4444';
        this.syncIndicator.style.boxShadow = info.connected ? '0 0 8px #10b981' : 'none';
        this.syncIndicator.title = info.connected ? `Connected (${info.userCount} online)` : 'Connecting...';
      }
    });

    this.syncManager.notify();
  }

  showLandingView() {
    if (this.landingContainer) this.landingContainer.style.display = 'block';
    if (this.gameContainer) this.gameContainer.style.display = 'none';

    this.landingView.render();
    
    // Clear URL param while in lobby
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('game');
    newUrl.searchParams.delete('room');
    newUrl.hash = '';
    window.history.replaceState({}, '', newUrl.toString());
  }

  showGameView() {
    if (this.landingContainer) this.landingContainer.style.display = 'none';
    if (this.gameContainer) this.gameContainer.style.display = 'block';

    if (this.syncManager) {
      this.syncManager.updateUrl(this.syncManager.roomId);
    }

    this.roundView.updateSession(this.session);
    this.scoreboard.updateSession(this.session);
    this.chartView.updateSession(this.session);
  }

  joinRoomByCode(code) {
    if (!code) return;
    if (this.syncManager) {
      this.syncManager.joinRoom(code);
    }
    this.showGameView();
    this.fetchRoomStateFromServer(code);
  }

  archiveCurrentGame() {
    if (this.session) {
      const roomId = this.syncManager ? this.syncManager.roomId : this.session.id;
      ArchiveManager.saveGameToArchive(this.session, roomId);
    }
  }

  startNewGame(options = {}) {
    // 1. Archive current active game before switching
    if (this.session) {
      this.archiveCurrentGame();
    }

    // 2. Generate a new room ID and update URL & WebSocket
    let newRoomId = 'game_' + Date.now();
    if (this.syncManager) {
      newRoomId = this.syncManager.createNewRoom();
    }

    // 3. Create fresh GameSession
    const newSession = new GameSession({
      id: newRoomId,
      ...options
    });

    // 4. Set as active session and show game view
    this.setSession(newSession);
    this.showGameView();
  }

  applyRemoteState(remoteState) {
    if (!remoteState) return;
    this.session = new GameSession(remoteState);
    this.session.saveToStorage();

    this.roundView.updateSession(this.session);
    this.scoreboard.updateSession(this.session);
    this.chartView.updateSession(this.session);
    this.archiveCurrentGame();

    this.bindSessionListeners(this.session);
  }

  setSession(newSession) {
    this.session = newSession;
    this.session.saveToStorage();
    this.roundView.updateSession(this.session);
    this.scoreboard.updateSession(this.session);
    this.chartView.updateSession(this.session);
    this.archiveCurrentGame();

    if (this.syncManager) {
      this.syncManager.broadcastLocalState();
    }

    this.bindSessionListeners(this.session);
  }

  resumeGameFromArchive(gameSummary) {
    if (!gameSummary || !gameSummary.fullState) return;
    
    this.session = new GameSession(gameSummary.fullState);
    this.session.saveToStorage();

    if (this.syncManager && gameSummary.roomId) {
      this.syncManager.joinRoom(gameSummary.roomId);
    }

    this.showGameView();
    this.bindSessionListeners(this.session);
  }

  bindGlobalEvents() {
    if (this.btnShare) this.btnShare.addEventListener('click', () => this.dialogs.showShareModal());
    const btnRoom = document.getElementById('btn-room-badge');
    if (btnRoom) btnRoom.addEventListener('click', () => this.dialogs.showShareModal());
    if (this.btnMenu) this.btnMenu.addEventListener('click', () => this.dialogs.showMenuModal());

    if (this.btnLangToggle) {
      this.btnLangToggle.addEventListener('click', () => {
        const nextLang = this.i18n.lang === 'he' ? 'en' : 'he';
        this.setLanguage(nextLang);
      });
    }

    if (this.btnBrandHome) {
      this.btnBrandHome.addEventListener('click', () => this.showLandingView());
    }

    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        tab.classList.add('active');
        const targetId = tab.dataset.tab;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.style.display = 'block';
        }
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new IsraeliWhistApp();
  });
} else {
  window.app = new IsraeliWhistApp();
}
