/**
 * Israeli Whist Scorekeeper - Main Entrypoint with Landing Page & Real-Time Sync
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

class IsraeliWhistApp {
  constructor() {
    this.i18n = EN;
    this.session = GameSession.loadFromStorage();
    
    this.initElements();
    this.initControllers();
    this.initSyncManager();
    this.bindGlobalEvents();

    // Check if URL specifies a game room or if we should show landing lobby
    const urlParams = new URLSearchParams(window.location.search);
    const hasGameParam = urlParams.has('game') || urlParams.has('room') || window.location.hash.length > 1;

    if (hasGameParam) {
      this.showGameView();
    } else {
      this.showLandingView();
    }

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);

      if (this.syncManager) {
        this.syncManager.broadcastLocalState();
      }

      this.archiveCurrentGame();
    });
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
    this.btnLobbyHome = document.getElementById('btn-lobby-home');
    this.btnBrandHome = document.getElementById('btn-brand-home');
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
    if (this.btnLobbyHome) this.btnLobbyHome.style.display = 'none';

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
    if (this.btnLobbyHome) this.btnLobbyHome.style.display = 'inline-flex';

    if (this.syncManager) {
      this.syncManager.updateUrl(this.syncManager.roomId);
    }

    this.roundView.updateSession(this.session);
    this.scoreboard.updateSession(this.session);
    this.chartView.updateSession(this.session);
    this.archiveCurrentGame();
  }

  joinRoomByCode(code) {
    if (!code) return;
    if (this.syncManager) {
      this.syncManager.joinRoom(code);
    }
    this.showGameView();
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

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);

      if (this.syncManager) {
        this.syncManager.broadcastLocalState();
      }

      this.archiveCurrentGame();
    });
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

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);

      if (this.syncManager) {
        this.syncManager.broadcastLocalState();
      }

      this.archiveCurrentGame();
    });
  }

  resumeGameFromArchive(gameSummary) {
    if (!gameSummary || !gameSummary.fullState) return;
    
    this.session = new GameSession(gameSummary.fullState);
    this.session.saveToStorage();

    if (this.syncManager && gameSummary.roomId) {
      this.syncManager.joinRoom(gameSummary.roomId);
    }

    this.showGameView();

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);

      if (this.syncManager) {
        this.syncManager.broadcastLocalState();
      }

      this.archiveCurrentGame();
    });
  }

  bindGlobalEvents() {
    const btnShare = document.getElementById('btn-open-share');
    const btnRoom = document.getElementById('btn-room-badge');
    const btnMenu = document.getElementById('btn-open-menu');

    if (btnShare) btnShare.addEventListener('click', () => this.dialogs.showShareModal());
    if (btnRoom) btnRoom.addEventListener('click', () => this.dialogs.showShareModal());
    if (btnMenu) btnMenu.addEventListener('click', () => this.dialogs.showMenuModal());

    if (this.btnLobbyHome) {
      this.btnLobbyHome.addEventListener('click', () => this.showLandingView());
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

document.addEventListener('DOMContentLoaded', () => {
  window.app = new IsraeliWhistApp();
});
