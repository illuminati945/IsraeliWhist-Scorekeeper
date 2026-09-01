/**
 * Israeli Whist Scorekeeper - Main Entrypoint with Real-Time Multiplayer Sync & Archive
 */
import { GameSession } from './engine/game-state.js';
import { SyncManager } from './engine/sync-manager.js';
import { ArchiveManager } from './engine/archive-manager.js';
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

  initElements() {
    this.leaderboardContainer = document.getElementById('leaderboard-section');
    this.roundContainer = document.getElementById('round-view-container');
    this.historyContainer = document.getElementById('history-view-container');
    this.chartContainer = document.getElementById('chart-view-container');
    this.roomCodeDisplay = document.getElementById('room-code-display');
    this.syncIndicator = document.getElementById('sync-indicator');
  }

  initControllers() {
    this.dialogs = new Dialogs(this);

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

  archiveCurrentGame() {
    if (this.session) {
      const roomId = this.syncManager ? this.syncManager.roomId : this.session.id;
      ArchiveManager.saveGameToArchive(this.session, roomId);
    }
  }

  startNewGame(options = {}) {
    // 1. Ensure current active game is archived before starting fresh
    if (this.session) {
      this.archiveCurrentGame();
    }

    // 2. Generate a new room ID, update URL, and join new room
    let newRoomId = 'game_' + Date.now();
    if (this.syncManager) {
      newRoomId = this.syncManager.createNewRoom();
    }

    // 3. Create fresh GameSession with the new room ID
    const newSession = new GameSession({
      id: newRoomId,
      ...options
    });

    // 4. Set as active session
    this.setSession(newSession);
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

  bindGlobalEvents() {
    const btnShare = document.getElementById('btn-open-share');
    const btnRoom = document.getElementById('btn-room-badge');
    const btnMenu = document.getElementById('btn-open-menu');

    if (btnShare) btnShare.addEventListener('click', () => this.dialogs.showShareModal());
    if (btnRoom) btnRoom.addEventListener('click', () => this.dialogs.showShareModal());
    if (btnMenu) btnMenu.addEventListener('click', () => this.dialogs.showMenuModal());

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
