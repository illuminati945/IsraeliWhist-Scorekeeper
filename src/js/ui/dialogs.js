/**
 * Modals & Dialogs (Menu, Share, New Game, Rules, Stats, Export)
 */
import { RULE_PRESETS } from '../engine/whist-rules.js';
import { calculateGameStatistics } from '../engine/statistics.js';
import { GameSession } from '../engine/game-state.js';

export class Dialogs {
  constructor(app) {
    this.app = app;
  }

  showMenuModal() {
    const isSimplified = this.app.session.simplifiedMode;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">Menu & Settings</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div class="menu-list">
          <button class="menu-item-btn" id="menu-opt-toggle-mode" style="background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.35);">
            <div>
              <div style="font-weight: 700;">Mode: ${isSimplified ? '⚡ Simplified (Quick)' : '🎴 Full Trump Auction'}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${isSimplified ? 'Direct Bids & Tricks (Tap to switch to Full)' : 'Includes Trump winner & suits (Tap to switch)'}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Switch ⇄</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-new-game">
            <span>🎲 New Game Session</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-share">
            <span>📲 Share Link & QR Code</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-rules">
            <span>⚙️ Scoring Rules Preset</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-stats">
            <span>📊 Player Stats & Accuracy</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-export">
            <span>📤 Export / Share Text</span>
            <span>→</span>
          </button>
        </div>

        <button class="btn-block modal-close" style="margin-top: 0.5rem;">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#menu-opt-toggle-mode').addEventListener('click', () => {
      this.app.session.setSimplifiedMode(!this.app.session.simplifiedMode);
      closeModal();
    });

    modal.querySelector('#menu-opt-new-game').addEventListener('click', () => {
      closeModal();
      this.showNewGameModal();
    });

    modal.querySelector('#menu-opt-share').addEventListener('click', () => {
      closeModal();
      this.showShareModal();
    });

    modal.querySelector('#menu-opt-rules').addEventListener('click', () => {
      closeModal();
      this.showRulesModal();
    });

    modal.querySelector('#menu-opt-stats').addEventListener('click', () => {
      closeModal();
      this.showStatsModal();
    });

    modal.querySelector('#menu-opt-export').addEventListener('click', () => {
      closeModal();
      this.showExportModal();
    });
  }

  showShareModal() {
    const sync = this.app.syncManager;
    const shareUrl = sync ? sync.getShareUrl() : window.location.href;
    const roomId = sync ? sync.roomId : 'Local';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">Share Game Session</h3>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Real-time live multi-device sync</div>
          </div>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="text-align: center; margin: 0.5rem 0 1rem;">
          <div style="background: white; padding: 10px; border-radius: var(--radius-md); display: inline-block;">
            <img src="${qrUrl}" alt="Game QR Code" width="150" height="150" style="display: block;" />
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.4rem;">
            Scan QR code with phone camera to join
          </div>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">
            Direct Shareable URL
          </label>
          <div style="display: flex; gap: 0.4rem;">
            <input type="text" class="input-field" id="txt-share-url" value="${shareUrl}" readonly style="margin-bottom: 0; font-family: monospace; font-size: 0.78rem;" />
            <button class="btn-pill btn-share" id="btn-copy-url" style="height: 42px; padding: 0 12px;">Copy</button>
          </div>
        </div>

        <div style="display: flex; gap: 0.4rem; margin-top: 1rem;">
          ${navigator.share ? `
            <button class="btn-block" id="btn-native-share" style="flex: 1; background: #2563eb;">
              Share (Mobile)
            </button>
          ` : ''}
          <button class="btn-outline modal-close" style="flex: 1;">Close</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-copy-url').addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrl);
      const btn = modal.querySelector('#btn-copy-url');
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    });

    const btnNative = modal.querySelector('#btn-native-share');
    if (btnNative) {
      btnNative.addEventListener('click', () => {
        navigator.share({
          title: 'Israeli Whist Scorekeeper',
          text: `Join my live Israeli Whist session (Room: ${roomId})`,
          url: shareUrl
        }).catch(() => {});
      });
    }
  }

  showNewGameModal() {
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">New Game Session</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          Starting a new game will reset current scores.
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          Player Names
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 0.85rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${p.color};"></span>
              <input type="text" class="input-field player-name-input" data-p-idx="${idx}" value="${p.name}" style="margin-bottom:0;" />
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 0.85rem; padding: 0.65rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-new-game-simplified" ${session.simplifiedMode ? 'checked' : ''} style="width: 18px; height: 18px;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">⚡ Simplified Mode</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">Direct Bids & Tricks (Skip trump & suit selection)</div>
            </div>
          </label>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Scoring Rules Preset
        </div>
        <select class="select-field" id="new-game-rule-select">
          ${Object.values(RULE_PRESETS).map(r => `
            <option value="${r.id}" ${session.rules.id === r.id ? 'selected' : ''}>
              ${r.nameEn}
            </option>
          `).join('')}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Game Limit
        </div>
        <select class="select-field" id="new-game-target-select">
          <option value="UNLIMITED">Free Play (Unlimited Deals)</option>
          <option value="13_ROUNDS">13 Deals</option>
          <option value="16_ROUNDS">16 Deals (4 Deals per Player)</option>
          <option value="TARGET_500">First to 500 Points</option>
          <option value="TARGET_1000">First to 1000 Points</option>
        </select>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">Cancel</button>
          <button class="btn-block" id="btn-start-new-game" style="flex: 1;">Start Game</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-start-new-game').addEventListener('click', () => {
      const nameInputs = modal.querySelectorAll('.player-name-input');
      const isSimplified = modal.querySelector('#chk-new-game-simplified').checked;
      const ruleKey = modal.querySelector('#new-game-rule-select').value;
      const targetVal = modal.querySelector('#new-game-target-select').value;

      const newPlayers = session.players.map((p, idx) => ({
        ...p,
        name: nameInputs[idx].value.trim() || p.name
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
        targetPoints,
        simplifiedMode: isSimplified
      });

      this.app.setSession(newSession);
      closeModal();
    });
  }

  showRulesModal() {
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">Rules & Configuration</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem;">
          ${Object.values(RULE_PRESETS).map(preset => `
            <div style="background: rgba(0,0,0,0.25); padding: 0.65rem; border-radius: var(--radius-md); border: 1px solid ${session.rules.id === preset.id ? 'var(--accent-primary)' : 'var(--border-subtle)'};">
              <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.2rem;">
                ${preset.nameEn}
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 0.4rem;">
                ${preset.descriptionEn}
              </div>
              <button class="btn-pill btn-apply-rule" data-rule-id="${preset.id}" style="${session.rules.id === preset.id ? 'background: var(--accent-primary); color: white;' : ''}">
                ${session.rules.id === preset.id ? '✓ Active' : 'Select Preset'}
              </button>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 1rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-enforce-hook" ${session.rules.enforceHookRule ? 'checked' : ''} style="width: 16px; height: 16px;">
            <span style="font-size: 0.82rem; font-weight: 600;">Enforce Dealer Hook Rule (Total Bets ≠ 13)</span>
          </label>
        </div>

        <button class="btn-block modal-close">
          Done
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
    const session = this.app.session;
    const stats = calculateGameStatistics(session);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">Game Statistics</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; margin-bottom: 0.85rem;">
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">Deals</div>
            <div style="font-size: 1.15rem; font-weight: 800;">${stats.numRounds}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">Over</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #a5b4fc;">${stats.overRoundsCount}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">Under</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #6ee7b7;">${stats.underRoundsCount}</div>
          </div>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          Player Accuracy
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${stats.playerStats.map(ps => `
            <div style="background: rgba(0,0,0,0.2); padding: 0.6rem 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.2rem;">
                <span style="font-weight: 700; font-size: 0.82rem;">
                  <span class="player-dot" style="background: ${ps.player.color};"></span>
                  ${ps.player.name}
                </span>
                <span style="font-weight: 800; font-size: 0.82rem; color: ${ps.hitRate >= 50 ? 'var(--success)' : 'var(--warning)'};">${ps.hitRate}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted);">
                <span>Made: ${ps.madeBidsCount}/${ps.totalBidsCount}</span>
                <span>Avg Tricks: ${ps.avgTricksPerRound}</span>
                <span>Pass: ${ps.passSuccess}/${ps.passAttempts}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn-block modal-close">
          Done
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
    const rankings = session.getRankings();

    let shareText = `Israeli Whist Match Results\n`;
    shareText += `Rounds: ${session.completedRounds.length}\n\n`;
    rankings.forEach((r, idx) => {
      shareText += `#${idx + 1} ${r.player.name}: ${r.score >= 0 ? '+' : ''}${r.score} pts\n`;
    });

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">Export / Share</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">Text Summary</label>
          <textarea class="input-field" id="txt-share-summary" rows="5" readonly style="font-family: monospace; font-size: 0.78rem; resize: none;">${shareText}</textarea>
          <button class="btn-outline" id="btn-copy-share">Copy Summary</button>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">JSON Data</label>
          <textarea class="input-field" id="txt-json-export" rows="3" readonly style="font-family: monospace; font-size: 0.72rem; resize: none;">${jsonStr}</textarea>
          <button class="btn-outline" id="btn-copy-json">Copy JSON</button>
        </div>

        <button class="btn-block modal-close">
          Done
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-copy-share').addEventListener('click', () => {
      navigator.clipboard.writeText(shareText);
      alert('Summary copied to clipboard.');
    });

    modal.querySelector('#btn-copy-json').addEventListener('click', () => {
      navigator.clipboard.writeText(jsonStr);
      alert('JSON copied to clipboard.');
    });
  }
}
