/**
 * Modals & Dialogs Component (New Game, Rules, Stats, Export/Import)
 */
import { RULE_PRESETS } from '../engine/whist-rules.js';
import { calculateGameStatistics } from '../engine/statistics.js';
import { GameSession } from '../engine/game-state.js';

export class Dialogs {
  constructor(app) {
    this.app = app;
  }

  showNewGameModal() {
    const i18n = this.app.i18n;
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">🎲 ${i18n.newGame}</h3>
          <button class="btn-icon modal-close">✕</button>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
          ${i18n.resetWarning}
        </div>

        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">${i18n.playerNames}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="text" class="form-input player-name-input" data-p-idx="${idx}" value="${p.name}" style="flex: 1;" />
              <input type="text" class="form-input player-avatar-input" data-p-idx="${idx}" value="${p.avatar}" style="width: 50px; text-align: center;" />
            </div>
          `).join('')}
        </div>

        <div class="form-group">
          <label class="form-label">${i18n.rules}</label>
          <select class="form-select" id="new-game-rule-select">
            ${Object.values(RULE_PRESETS).map(r => `
              <option value="${r.id}" ${session.rules.id === r.id ? 'selected' : ''}>
                ${r.nameEn} — (${r.nameHe})
              </option>
            `).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">${i18n.targetScorePrompt}</label>
          <select class="form-select" id="new-game-target-select">
            <option value="UNLIMITED">Unlimited Rounds (משחק חופשי)</option>
            <option value="13_ROUNDS">13 Rounds (13 סיבובים)</option>
            <option value="16_ROUNDS">16 Rounds (4 סיבובים לכל מחלק)</option>
            <option value="TARGET_500">First to 500 Points (עד 500 נקודות)</option>
            <option value="TARGET_1000">First to 1000 Points (עד 1000 נקודות)</option>
          </select>
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <button class="btn-secondary modal-close" style="flex: 1;">${i18n.cancel}</button>
          <button class="btn-primary" id="btn-start-new-game" style="flex: 1;">${i18n.save}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-start-new-game').addEventListener('click', () => {
      const nameInputs = modal.querySelectorAll('.player-name-input');
      const avatarInputs = modal.querySelectorAll('.player-avatar-input');
      const ruleKey = modal.querySelector('#new-game-rule-select').value;
      const targetVal = modal.querySelector('#new-game-target-select').value;

      const newPlayers = session.players.map((p, idx) => ({
        ...p,
        name: nameInputs[idx].value.trim() || p.name,
        avatar: avatarInputs[idx].value.trim() || p.avatar
      }));

      let maxRounds = null;
      let targetPoints = null;
      if (targetVal === '13_ROUNDS') maxRounds = 13;
      else if (targetVal === '16_ROUNDS') maxRounds = 16;
      else if (targetVal === 'TARGET_500') targetPoints = 500;
      else if (targetVal === 'TARGET_1000') targetPoints = 1000;

      const newSession = new GameSession({
        players: newPlayers,
        rules: { ...RULE_PRESETS[ruleKey] },
        maxRounds,
        targetPoints
      });

      this.app.setSession(newSession);
      closeModal();
    });
  }

  showRulesModal() {
    const i18n = this.app.i18n;
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">⚙️ ${i18n.rules}</h3>
          <button class="btn-icon modal-close">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.25rem;">
          ${Object.values(RULE_PRESETS).map(preset => `
            <div style="background: rgba(15,23,42,0.5); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid ${session.rules.id === preset.id ? 'var(--accent-primary)' : 'var(--border-glass)'};">
              <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem;">
                ${preset.nameEn}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                ${preset.descriptionEn}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                ${preset.descriptionHe}
              </div>
              <button class="btn-secondary btn-apply-rule" data-rule-id="${preset.id}" style="padding: 4px 10px; font-size: 0.8rem; width: auto;">
                ${session.rules.id === preset.id ? '✓ Active Preset' : 'Activate Preset'}
              </button>
            </div>
          `).join('')}
        </div>

        <div class="form-group">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-enforce-hook" ${session.rules.enforceHookRule ? 'checked' : ''} style="width: 18px; height: 18px;">
            <span style="font-weight: 600; font-size: 0.9rem;">Enforce Dealer Hook Rule (Total Bets ≠ 13)</span>
          </label>
        </div>

        <button class="btn-primary modal-close" style="margin-top: 1rem;">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelectorAll('.btn-apply-rule').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.ruleId;
        session.rules = { ...RULE_PRESETS[id], enforceHookRule: session.rules.enforceHookRule };
        session.notify();
        closeModal();
      });
    });

    const chkHook = modal.querySelector('#chk-enforce-hook');
    if (chkHook) {
      chkHook.addEventListener('change', (e) => {
        session.rules.enforceHookRule = e.target.checked;
        session.notify();
      });
    }
  }

  showStatsModal() {
    const i18n = this.app.i18n;
    const session = this.app.session;
    const stats = calculateGameStatistics(session);

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">📊 ${i18n.statistics}</h3>
          <button class="btn-icon modal-close">✕</button>
        </div>

        <!-- Quick Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1.25rem;">
          <div style="background: rgba(15,23,42,0.5); padding: 0.75rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-glass);">
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Total Rounds</div>
            <div style="font-size: 1.3rem; font-weight: 800;">${stats.numRounds}</div>
          </div>
          <div style="background: rgba(15,23,42,0.5); padding: 0.75rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-glass);">
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Over Rounds</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #a5b4fc;">${stats.overRoundsCount}</div>
          </div>
          <div style="background: rgba(15,23,42,0.5); padding: 0.75rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-glass);">
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Under Rounds</div>
            <div style="font-size: 1.3rem; font-weight: 800; color: #6ee7b7;">${stats.underRoundsCount}</div>
          </div>
        </div>

        <!-- Player Breakdown -->
        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.6rem;">Player Accuracy & Hit Rates</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
          ${stats.playerStats.map(ps => `
            <div style="background: rgba(15,23,42,0.4); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
                <span style="font-weight: 700;">${ps.player.avatar} ${ps.player.name}</span>
                <span style="font-weight: 800; color: ${ps.hitRate >= 50 ? '#10b981' : '#f59e0b'};">${ps.hitRate}% Hit Rate</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                <span>Made: ${ps.madeBidsCount}/${ps.totalBidsCount}</span>
                <span>Avg Tricks: ${ps.avgTricksPerRound}</span>
                <span>Pass Success: ${ps.passSuccess}/${ps.passAttempts} (${ps.passRate}%)</span>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn-primary modal-close">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));
  }

  showExportModal() {
    const session = this.app.session;
    const jsonStr = session.exportJson();
    const scores = session.getCumulativeScores();
    const rankings = session.getRankings();

    // Generate formatted text for Discord or WhatsApp
    let shareText = `🃏 **Israeli Whist Match Results (וויסט ישראלי)**\n`;
    shareText += `Rounds Played: ${session.completedRounds.length}\n\n`;
    rankings.forEach((r, idx) => {
      const medals = ['🥇', '🥈', '🥉', '4️⃣'];
      shareText += `${medals[idx]} **${r.player.name}**: ${r.score >= 0 ? '+' : ''}${r.score} pts\n`;
    });

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">📤 ${this.app.i18n.exportData}</h3>
          <button class="btn-icon modal-close">✕</button>
        </div>

        <div class="form-group">
          <label class="form-label">Discord / WhatsApp Share Text</label>
          <textarea class="form-input" id="txt-share-summary" rows="5" readonly style="font-family: monospace; font-size: 0.8rem;">${shareText}</textarea>
          <button class="btn-secondary" id="btn-copy-share" style="margin-top: 0.5rem;">📋 Copy Summary</button>
        </div>

        <div class="form-group">
          <label class="form-label">JSON Backup Data</label>
          <textarea class="form-input" id="txt-json-export" rows="4" readonly style="font-family: monospace; font-size: 0.75rem;">${jsonStr}</textarea>
          <button class="btn-secondary" id="btn-copy-json" style="margin-top: 0.5rem;">💾 Copy Full JSON</button>
        </div>

        <button class="btn-primary modal-close" style="margin-top: 1rem;">
          Done
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-copy-share').addEventListener('click', () => {
      navigator.clipboard.writeText(shareText);
      alert('Copied summary to clipboard!');
    });

    modal.querySelector('#btn-copy-json').addEventListener('click', () => {
      navigator.clipboard.writeText(jsonStr);
      alert('Copied JSON data to clipboard!');
    });
  }
}
