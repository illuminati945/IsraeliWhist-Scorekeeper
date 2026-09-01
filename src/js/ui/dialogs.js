/**
 * Modals & Dialogs (Menu, Saved Games Archive, Edit Settings/Names, Share, New Game, Rules, Stats, Export)
 */
import { RULE_PRESETS } from '../engine/whist-rules.js';
import { calculateGameStatistics } from '../engine/statistics.js';
import { GameSession } from '../engine/game-state.js';
import { ArchiveManager } from '../engine/archive-manager.js';

export class Dialogs {
  constructor(app) {
    this.app = app;
  }

  showMenuModal() {
    const isSimplified = this.app.session.simplifiedMode;
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">Menu & Settings</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div class="menu-list">
          <button class="menu-item-btn" id="menu-opt-saved-games" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.35);">
            <div>
              <div style="font-weight: 700; color: #a7f3d0;">📂 Saved Games (${recentGames.length}/10)</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                Resume previous matches with date & scores
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--success);">Open →</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-edit-players" style="background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.35);">
            <div>
              <div style="font-weight: 700;">✏️ Edit Players & Settings</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                Rename players, change dealer, or adjust rules
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Edit →</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-toggle-mode">
            <div>
              <div style="font-weight: 700;">Mode: ${isSimplified ? '⚡ Simplified (Quick)' : '🎴 Full Trump Auction'}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${isSimplified ? 'Direct Bids & Tricks (Tap to switch to Full)' : 'Includes Trump winner & suits (Tap to switch)'}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Switch ⇄</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-share">
            <span>📲 Share Link & QR Code</span>
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
          <button class="menu-item-btn" id="menu-opt-new-game" style="border-color: rgba(239, 68, 68, 0.3); color: #fca5a5;">
            <span>🎲 Start New Game</span>
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

    modal.querySelector('#menu-opt-saved-games').addEventListener('click', () => {
      closeModal();
      this.showSavedGamesModal();
    });

    modal.querySelector('#menu-opt-edit-players').addEventListener('click', () => {
      closeModal();
      this.showEditSettingsModal();
    });

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

    modal.querySelector('#menu-opt-stats').addEventListener('click', () => {
      closeModal();
      this.showStatsModal();
    });

    modal.querySelector('#menu-opt-export').addEventListener('click', () => {
      closeModal();
      this.showExportModal();
    });
  }

  showSavedGamesModal() {
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 480px;">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700;">Saved Games (Recent 10)</h3>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Quickly resume any previous match</div>
          </div>
          <button class="btn-pill modal-close">✕</button>
        </div>

        ${recentGames.length === 0 ? `
          <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
            <div style="font-size: 1.1rem; margin-bottom: 0.25rem;">No Saved Games Yet</div>
            <div style="font-size: 0.8rem;">Completed and active games will automatically appear here.</div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem; max-height: 55vh; overflow-y: auto;">
            ${recentGames.map((g, idx) => {
              const timeDisplay = ArchiveManager.formatTimestamp(g.updatedAt || g.createdAt);
              const isCurrent = (this.app.syncManager && this.app.syncManager.roomId === g.roomId);

              return `
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${g.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${timeDisplay}</span>
                      ${isCurrent ? `<span style="font-size: 0.65rem; background: var(--accent-primary); color: white; padding: 1px 5px; border-radius: 4px; font-weight: 800;">ACTIVE</span>` : ''}
                    </div>
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">
                      ${g.completedRoundsCount} Deals
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${g.players.map(p => `
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${p.color};"></span>
                        <span>${p.name}:</span>
                        <strong style="color: ${p.score >= 0 ? 'var(--success)' : 'var(--danger)'};">${p.score >= 0 ? '+' : ''}${p.score}</strong>
                      </span>
                    `).join('')}
                  </div>

                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="btn-pill btn-delete-game" data-room-id="${g.roomId}" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3); font-size: 0.72rem;">
                      Delete
                    </button>
                    <button class="btn-pill btn-resume-game ${isCurrent ? '' : 'btn-share'}" data-game-idx="${idx}" style="font-size: 0.75rem; padding: 0 10px;">
                      ${isCurrent ? 'Current Game' : 'Resume Deal →'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <button class="btn-block modal-close">
          Done
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelectorAll('.btn-resume-game').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.gameIdx, 10);
        const game = recentGames[idx];
        if (game) {
          this.app.resumeGameFromArchive(game);
          closeModal();
        }
      });
    });

    modal.querySelectorAll('.btn-delete-game').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomId = btn.dataset.roomId;
        if (confirm(`Remove room ${roomId} from saved games?`)) {
          ArchiveManager.deleteGame(roomId);
          closeModal();
          this.showSavedGamesModal();
        }
      });
    });
  }

  showEditSettingsModal(focusPlayerIndex = null) {
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">Edit Players & Settings</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          Player Names
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${p.color};"></span>
              <input type="text" class="input-field edit-player-name-input" data-p-idx="${idx}" value="${p.name}" placeholder="Player ${idx + 1}" style="margin-bottom:0;" />
            </div>
          `).join('')}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Current Dealer
        </div>
        <select class="select-field" id="edit-dealer-select" style="margin-bottom: 0.85rem;">
          ${session.players.map((p, idx) => `
            <option value="${idx}" ${session.currentDealerIndex === idx ? 'selected' : ''}>
              ${p.name} (Player ${idx + 1})
            </option>
          `).join('')}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Game Mode
        </div>
        <select class="select-field" id="edit-mode-select" style="margin-bottom: 0.85rem;">
          <option value="SIMPLIFIED" ${session.simplifiedMode ? 'selected' : ''}>⚡ Simplified (Direct Bids & Tricks)</option>
          <option value="FULL" ${!session.simplifiedMode ? 'selected' : ''}>🎴 Full (With Trump Auction & Suits)</option>
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Scoring Rules Preset
        </div>
        <select class="select-field" id="edit-rule-select" style="margin-bottom: 0.85rem;">
          ${Object.values(RULE_PRESETS).map(r => `
            <option value="${r.id}" ${session.rules.id === r.id ? 'selected' : ''}>
              ${r.nameEn}
            </option>
          `).join('')}
        </select>

        <div style="margin-bottom: 1rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-edit-hook" ${session.rules.enforceHookRule ? 'checked' : ''} style="width: 16px; height: 16px;">
            <span style="font-size: 0.82rem; font-weight: 600;">Enforce Hook Rule (Total Bets ≠ 13)</span>
          </label>
        </div>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">Cancel</button>
          <button class="btn-block" id="btn-save-settings" style="flex: 2;">Save Changes ✓</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    if (focusPlayerIndex !== null) {
      const targetInput = modal.querySelector(`.edit-player-name-input[data-p-idx="${focusPlayerIndex}"]`);
      if (targetInput) {
        setTimeout(() => {
          targetInput.focus();
          targetInput.select();
        }, 100);
      }
    }

    modal.querySelector('#btn-save-settings').addEventListener('click', () => {
      const nameInputs = modal.querySelectorAll('.edit-player-name-input');
      const dealerIdx = parseInt(modal.querySelector('#edit-dealer-select').value, 10);
      const isSimplified = (modal.querySelector('#edit-mode-select').value === 'SIMPLIFIED');
      const ruleKey = modal.querySelector('#edit-rule-select').value;
      const enforceHook = modal.querySelector('#chk-edit-hook').checked;

      session.players.forEach((p, idx) => {
        const val = nameInputs[idx].value.trim();
        if (val) p.name = val;
      });

      session.currentDealerIndex = dealerIdx;
      if (session.activeRound) {
        session.activeRound.dealerIndex = dealerIdx;
        session.activeRound.leadBidderIndex = (dealerIdx + 1) % 4;
      }

      session.rules = {
        ...RULE_PRESETS[ruleKey],
        enforceHookRule: enforceHook
      };

      session.setSimplifiedMode(isSimplified);
      session.notify();
      closeModal();
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
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">New Game Session</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          Starting a new game will create a fresh shareable link.
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

        ${recentGames.length > 0 ? `
          <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); text-align: center;">
            <button class="btn-outline" id="btn-open-recent-from-new" style="font-size: 0.8rem; border-color: rgba(16, 185, 129, 0.4); color: #a7f3d0;">
              📂 Or Resume from Saved Games (${recentGames.length}) →
            </button>
          </div>
        ` : ''}
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    const btnRecent = modal.querySelector('#btn-open-recent-from-new');
    if (btnRecent) {
      btnRecent.addEventListener('click', () => {
        closeModal();
        this.showSavedGamesModal();
      });
    }

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

      this.app.startNewGame({
        players: newPlayers,
        rules: { ...RULE_PRESETS[ruleKey] },
        maxRounds,
        targetPoints,
        simplifiedMode: isSimplified
      });

      closeModal();
    });
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
