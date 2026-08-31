/**
 * Israeli Whist Scorekeeper - Main Application Entrypoint
 */
import { GameSession } from './engine/game-state.js';
import { RoundView } from './ui/round-view.js';
import { Scoreboard } from './ui/scoreboard.js';
import { ChartView } from './ui/chart-view.js';
import { Dialogs } from './ui/dialogs.js';
import { HE } from './i18n/he.js';
import { EN } from './i18n/en.js';

class IsraeliWhistApp {
  constructor() {
    this.currentLang = localStorage.getItem('israeli_whist_lang') || 'he';
    this.i18n = this.currentLang === 'he' ? HE : EN;
    
    // Load session from storage or create fresh session
    this.session = GameSession.loadFromStorage();
    
    this.initElements();
    this.initControllers();
    this.bindGlobalEvents();
    this.applyLocalization();

    // Subscribe to state updates
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
        // Switch to history tab temporarily on round complete or refresh
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

  toggleLanguage() {
    this.currentLang = this.currentLang === 'he' ? 'en' : 'he';
    this.i18n = this.currentLang === 'he' ? HE : EN;
    localStorage.setItem('israeli_whist_lang', this.currentLang);
    this.applyLocalization();
    this.roundView.updateI18n(this.i18n);
    this.scoreboard.updateI18n(this.i18n);
    this.chartView.updateI18n(this.i18n);
  }

  applyLocalization() {
    const isHe = (this.currentLang === 'he');
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = isHe ? 'rtl' : 'ltr';

    document.getElementById('nav-app-title').textContent = this.i18n.appTitle;
    document.getElementById('nav-app-subtitle').textContent = this.i18n.subtitle;
    document.getElementById('lang-indicator').textContent = isHe ? 'EN' : 'עב';

    document.getElementById('tab-label-round').textContent = isHe ? 'סיבוב נוכחי' : 'Active Round';
    document.getElementById('tab-label-history').textContent = this.i18n.history;
    document.getElementById('tab-label-chart').textContent = isHe ? 'גרף מגמות' : 'Trend Chart';
  }

  bindGlobalEvents() {
    // Language toggle
    document.getElementById('btn-toggle-lang').addEventListener('click', () => this.toggleLanguage());

    // Modals
    document.getElementById('btn-open-new-game').addEventListener('click', () => this.dialogs.showNewGameModal());
    document.getElementById('btn-open-rules').addEventListener('click', () => this.dialogs.showRulesModal());
    document.getElementById('btn-open-stats').addEventListener('click', () => this.dialogs.showStatsModal());
    document.getElementById('btn-open-export').addEventListener('click', () => this.dialogs.showExportModal());

    // Tab switching
    const tabs = document.querySelectorAll('.tab-btn');
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

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new IsraeliWhistApp();
});
