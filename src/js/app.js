/**
 * Israeli Whist Scorekeeper - Main Entrypoint
 */
import { GameSession } from './engine/game-state.js';
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
    this.bindGlobalEvents();

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);
    });
  }

  initElements() {
    this.leaderboardContainer = document.getElementById('leaderboard-section');
    this.roundContainer = document.getElementById('round-view-container');
    this.historyContainer = document.getElementById('history-view-container');
    this.chartContainer = document.getElementById('chart-view-container');
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

  setSession(newSession) {
    this.session = newSession;
    this.session.saveToStorage();
    this.roundView.updateSession(this.session);
    this.scoreboard.updateSession(this.session);
    this.chartView.updateSession(this.session);

    this.session.subscribe(() => {
      this.roundView.updateSession(this.session);
      this.scoreboard.updateSession(this.session);
      this.chartView.updateSession(this.session);
    });
  }

  bindGlobalEvents() {
    document.getElementById('btn-open-new-game').addEventListener('click', () => this.dialogs.showNewGameModal());
    document.getElementById('btn-open-rules').addEventListener('click', () => this.dialogs.showRulesModal());
    document.getElementById('btn-open-stats').addEventListener('click', () => this.dialogs.showStatsModal());
    document.getElementById('btn-open-export').addEventListener('click', () => this.dialogs.showExportModal());

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
