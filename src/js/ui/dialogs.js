/**
 * Modals & Dialogs (Menu, Reorganize Seating, Saved Games Archive, Edit Settings/Names, Share, New Game, Rules, Stats, Export) with i18n
 */
import { RULE_PRESETS, calculatePlayerScore } from '../engine/whist-rules.js';
import { calculateGameStatistics } from '../engine/statistics.js';
import { GameSession } from '../engine/game-state.js';
import { ArchiveManager } from '../engine/archive-manager.js';

export class Dialogs {
  constructor(app) {
    this.app = app;
  }

  showMenuModal() {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const isSimplified = this.app.session.simplifiedMode;
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">${t.menuTitle}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div class="menu-list">
          <button class="menu-item-btn" id="menu-opt-toggle-lang" style="background: rgba(251, 191, 36, 0.12); border-color: rgba(251, 191, 36, 0.35);">
            <div>
              <div style="font-weight: 700; color: #fde68a;">🌐 ${isHe ? 'שפה: עברית (English)' : 'Language: English (עברית)'}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${isHe ? 'לחץ כאן כדי להחליף לאנגלית' : 'Tap to switch to Hebrew'}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">${t.switchLang} ⇄</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-home-lobby">
            <span>${t.returnToLobby}</span>
            <span>→</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-baseline" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.35);">
            <div>
              <div style="font-weight: 700; color: #fde68a;">🎯 ${t.baselineScores}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${t.baselineDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">Set →</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-saved-games" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.35);">
            <div>
              <div style="font-weight: 700; color: #a7f3d0;">${t.savedGames} (${recentGames.length}/10)</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${t.savedGamesDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--success);">Open →</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-edit-players" style="background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.35);">
            <div>
              <div style="font-weight: 700;">${t.editPlayersSettings}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${t.editPlayersDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Edit →</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-toggle-mode">
            <div>
              <div style="font-weight: 700;">${t.modeToggleTitle}: ${isSimplified ? t.simplified : t.fullTrump}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${isSimplified ? (isHe ? 'הכרזות ולקיחות ישירות' : 'Direct Bids & Tricks') : (isHe ? 'כולל קביעת שליט וסדרות' : 'Includes Trump & Suits')}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">Switch ⇄</span>
          </button>

          <button class="menu-item-btn" id="menu-opt-share">
            <span>📲 ${t.shareTitle}</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-stats">
            <span>${t.statsAccuracy}</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-export">
            <span>${t.exportShare}</span>
            <span>→</span>
          </button>
          <button class="menu-item-btn" id="menu-opt-new-game" style="border-color: rgba(239, 68, 68, 0.3); color: #fca5a5;">
            <span>${t.startNewGameMenu}</span>
            <span>→</span>
          </button>
        </div>

        <button class="btn-block modal-close" style="margin-top: 0.5rem;">
          ${t.close}
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#menu-opt-toggle-lang').addEventListener('click', () => {
      closeModal();
      this.app.setLanguage(isHe ? 'en' : 'he');
    });

    modal.querySelector('#menu-opt-home-lobby').addEventListener('click', () => {
      closeModal();
      this.app.showLandingView();
    });

    modal.querySelector('#menu-opt-baseline').addEventListener('click', () => {
      closeModal();
      this.showBaselineModal();
    });

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

  showReorganizeSeatingModal(initialSelectedPlayerIdx = null) {
    const t = this.app.i18n;
    const session = this.app.session;
    let selectedIdx = initialSelectedPlayerIdx !== null ? initialSelectedPlayerIdx : null;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const renderContent = () => {
      const isDealer = (idx) => session.currentDealerIndex === idx;

      modal.innerHTML = `
        <div class="modal-box" style="max-width: 460px;">
          <div class="modal-head">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 700;">${t.reorganizeTitle}</h3>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${t.reorganizeSub}</div>
            </div>
            <button class="btn-pill modal-close">✕</button>
          </div>

          <!-- Circular Seating Table 2x2 Grid -->
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem 0.75rem; margin: 0.75rem 0; position: relative;">
            
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(99, 102, 241, 0.12); border: 1px dashed rgba(99, 102, 241, 0.35); border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: #a5b4fc; text-align: center; pointer-events: none;">
              TABLE<br>↻
            </div>

            <div class="leaderboard-grid" style="margin-bottom: 0;">
              ${session.players.map((p, idx) => {
                const isSel = selectedIdx === idx;
                const isDeal = isDealer(idx);

                return `
                  <div class="player-card seat-swap-card ${isSel ? 'seat-selected' : ''} ${isDeal ? 'is-dealer' : ''}" 
                       data-seat-idx="${idx}" 
                       style="cursor: pointer; transition: all 0.18s ease; ${isSel ? 'border: 2px solid #fbbf24; background: rgba(251, 191, 36, 0.15); transform: scale(1.04);' : ''}">
                    ${isDeal ? `<span class="tag-dealer">${t.dealer.toUpperCase()}</span>` : ''}
                    <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">
                      ${t.seatNumber} #${idx + 1}
                    </div>
                    <div class="player-title" style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">
                      <span class="player-dot" style="background: ${p.color}; width: 9px; height: 9px;"></span>
                      <span>${p.name}</span>
                    </div>
                    <div style="font-size: 0.72rem; color: ${isSel ? '#fde68a' : 'var(--accent-primary)'}; font-weight: 700; margin-top: 4px;">
                      ${isSel ? '✓ Selected' : 'Tap to Swap'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Swap Hint Banner -->
          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.75rem; text-align: center; color: #c7d2fe; margin-bottom: 0.85rem;">
            ${selectedIdx !== null ? `${t.tapToSwap} <strong>${session.players[selectedIdx].name}</strong>` : t.swapSeatsHint}
          </div>

          <!-- 1-Tap Table Rotation Controls -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; margin-bottom: 0.85rem;">
            <button class="btn-outline" id="btn-rot-ccw" style="font-size: 0.78rem; min-height: 38px;">
              ${t.rotateCounterClockwise}
            </button>
            <button class="btn-outline" id="btn-rot-cw" style="font-size: 0.78rem; min-height: 38px;">
              ${t.rotateClockwise}
            </button>
          </div>

          <button class="btn-block modal-close">
            ${t.doneSeating}
          </button>
        </div>
      `;

      modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => modal.remove()));

      modal.querySelectorAll('.seat-swap-card').forEach(card => {
        card.addEventListener('click', () => {
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(15); } catch(e) {}
          }
          const idx = parseInt(card.dataset.seatIdx, 10);
          if (selectedIdx === null) {
            selectedIdx = idx;
            renderContent();
          } else if (selectedIdx === idx) {
            selectedIdx = null;
            renderContent();
          } else {
            session.swapPlayers(selectedIdx, idx);
            selectedIdx = null;
            renderContent();
          }
        });
      });

      const btnCw = modal.querySelector('#btn-rot-cw');
      if (btnCw) {
        btnCw.addEventListener('click', () => {
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(15); } catch(e) {}
          }
          session.rotateSeatingClockwise();
          renderContent();
        });
      }

      const btnCcw = modal.querySelector('#btn-rot-ccw');
      if (btnCcw) {
        btnCcw.addEventListener('click', () => {
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(15); } catch(e) {}
          }
          session.rotateSeatingCounterClockwise();
          renderContent();
        });
      }
    };

    renderContent();
    document.body.appendChild(modal);
  }

  showSavedGamesModal() {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 480px;">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700;">${t.savedGames} (10)</h3>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${t.savedGamesDesc}</div>
          </div>
          <button class="btn-pill modal-close">✕</button>
        </div>

        ${recentGames.length === 0 ? `
          <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
            <div style="font-size: 1.1rem; margin-bottom: 0.25rem;">${t.noSavedGames}</div>
            <div style="font-size: 0.8rem;">${t.noSavedGamesSub}</div>
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
                      ${isCurrent ? `<span style="font-size: 0.65rem; background: var(--accent-primary); color: white; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${t.currentGame}</span>` : ''}
                    </div>
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">
                      ${g.completedRoundsCount} ${t.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${g.players.map(p => `
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${p.color};"></span>
                        <span>${p.name}:</span>
                        <strong class="signed-score" dir="ltr" style="color: ${p.score >= 0 ? 'var(--success)' : 'var(--danger)'}; direction: ltr; unicode-bidi: isolate;">${p.score >= 0 ? '+' : ''}${p.score}</strong>
                      </span>
                    `).join('')}
                  </div>

                  <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                    <button class="btn-pill btn-delete-game" data-room-id="${g.roomId}" style="color: var(--danger); border-color: rgba(239, 68, 68, 0.3); font-size: 0.72rem;">
                      ${t.delete}
                    </button>
                    <button class="btn-pill btn-resume-game ${isCurrent ? '' : 'btn-share'}" data-game-idx="${idx}" style="font-size: 0.75rem; padding: 0 10px;">
                      ${isCurrent ? t.currentGame : t.resumeMatch}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <button class="btn-block modal-close">
          ${t.done}
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
        if (confirm(`${t.deleteConfirm} (${roomId})`)) {
          ArchiveManager.deleteGame(roomId);
          closeModal();
          this.showSavedGamesModal();
        }
      });
    });
  }

  showEditSettingsModal(focusPlayerIndex = null) {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const session = this.app.session;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.1rem; font-weight: 700;">${t.editTitle}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${t.playerNames}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${p.color};"></span>
              <input type="text" class="input-field edit-player-name-input" data-p-idx="${idx}" value="${p.name}" placeholder="${isHe ? `שחקן ${idx + 1}` : `Player ${idx + 1}`}" style="margin-bottom:0;" />
            </div>
          `).join('')}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.currentDealer}
        </div>
        <select class="select-field" id="edit-dealer-select" style="margin-bottom: 0.85rem;">
          ${session.players.map((p, idx) => `
            <option value="${idx}" ${session.currentDealerIndex === idx ? 'selected' : ''}>
              ${p.name} (${isHe ? `שחקן ${idx + 1}` : `Player ${idx + 1}`})
            </option>
          `).join('')}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.gameMode}
        </div>
        <select class="select-field" id="edit-mode-select" style="margin-bottom: 0.85rem;">
          <option value="SIMPLIFIED" ${session.simplifiedMode ? 'selected' : ''}>${t.simplifiedOpt}</option>
          <option value="FULL" ${!session.simplifiedMode ? 'selected' : ''}>${t.fullOpt}</option>
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.scoringRules}
        </div>
        <select class="select-field" id="edit-rule-select" style="margin-bottom: 0.85rem;">
          ${Object.values(RULE_PRESETS).map(r => `
            <option value="${r.id}" ${session.rules.id === r.id ? 'selected' : ''}>
              ${isHe ? r.nameHe : r.nameEn}
            </option>
          `).join('')}
        </select>

        <div style="margin-bottom: 1rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.2); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-edit-hook" ${session.rules.enforceHookRule ? 'checked' : ''} style="width: 16px; height: 16px;">
            <span style="font-size: 0.82rem; font-weight: 600;">${t.enforceHook}</span>
          </label>
        </div>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
          <button class="btn-block" id="btn-save-settings" style="flex: 2;">${t.saveChanges}</button>
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
    const t = this.app.i18n;
    const sync = this.app.syncManager;

    // Ensure current active game state is immediately persisted to server before sharing
    if (this.app.session) {
      this.app.archiveCurrentGame();
      if (sync) {
        sync.broadcastLocalState();
      }
    }

    const shareUrl = sync ? sync.getShareUrl() : window.location.href;
    const roomId = sync ? sync.roomId : 'Local';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">${t.shareTitle}</h3>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${t.shareSub}</div>
          </div>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="text-align: center; margin: 0.5rem 0 1rem;">
          <div style="background: white; padding: 10px; border-radius: var(--radius-md); display: inline-block;">
            <img src="${qrUrl}" alt="Game QR Code" width="150" height="150" style="display: block;" />
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.4rem;">
            ${t.scanQr}
          </div>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <label style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; display: block; margin-bottom: 0.3rem;">
            ${t.shareUrlLabel}
          </label>
          <div style="display: flex; gap: 0.4rem;">
            <input type="text" class="input-field" id="txt-share-url" value="${shareUrl}" readonly style="margin-bottom: 0; font-family: monospace; font-size: 0.78rem;" />
            <button class="btn-pill btn-share" id="btn-copy-url" style="height: 42px; padding: 0 12px;">${t.copy}</button>
          </div>
        </div>

        <div style="display: flex; gap: 0.4rem; margin-top: 1rem;">
          ${navigator.share ? `
            <button class="btn-block" id="btn-native-share" style="flex: 1; background: #2563eb;">
              ${t.shareMobile}
            </button>
          ` : ''}
          <button class="btn-outline modal-close" style="flex: 1;">${t.close}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-copy-url').addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrl);
      const btn = modal.querySelector('#btn-copy-url');
      btn.textContent = t.copied;
      setTimeout(() => btn.textContent = t.copy, 2000);
    });

    const btnNative = modal.querySelector('#btn-native-share');
    if (btnNative) {
      btnNative.addEventListener('click', () => {
        navigator.share({
          title: t.appTitle,
          text: `${t.shareTitle} (${roomId})`,
          url: shareUrl
        }).catch(() => {});
      });
    }
  }

  showNewGameModal() {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const session = this.app.session;
    const recentGames = ArchiveManager.getRecentGames();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${t.newGameTitle}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          ${t.newGameSub}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${t.playerNames}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 0.85rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="player-dot" style="background: ${p.color};"></span>
              <input type="text" class="input-field player-name-input" data-p-idx="${idx}" value="${p.name}" placeholder="${isHe ? `שחקן ${idx + 1}` : `Player ${idx + 1}`}" style="margin-bottom:0;" />
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
              🎯 ${t.baselineScores}
            </div>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${isHe ? 'ניקוד פתיחה (אופציונלי)' : 'Starting scores (optional)'}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem;">
            ${session.players.map((p, idx) => `
              <div style="display: flex; align-items: center; gap: 0.3rem; background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <span class="player-dot" style="background: ${p.color};"></span>
                <span style="font-size: 0.75rem; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</span>
                <input type="number" class="input-field new-game-baseline-input" data-p-idx="${idx}" value="0" style="width: 65px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.8rem; font-family: monospace;" />
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 0.85rem; padding: 0.65rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-new-game-simplified" ${session.simplifiedMode ? 'checked' : ''} style="width: 18px; height: 18px;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">${t.simplified}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">${isHe ? 'הכרזות ולקיחות ישירות (ללא מכרז שליט)' : 'Direct Bids & Tricks (Skip trump & suit selection)'}</div>
            </div>
          </label>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.scoringRules}
        </div>
        <select class="select-field" id="new-game-rule-select">
          ${Object.values(RULE_PRESETS).map(r => `
            <option value="${r.id}" ${isHe ? r.nameHe : r.nameEn}
            </option>
          `).join('')}
        </select>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.gameLimit}
        </div>
        <select class="select-field" id="new-game-target-select">
          <option value="UNLIMITED">${t.freePlay}</option>
          <option value="13_ROUNDS">${t.deals13}</option>
          <option value="16_ROUNDS">${t.deals16}</option>
          <option value="TARGET_500">${t.target500}</option>
          <option value="TARGET_1000">${t.target1000}</option>
        </select>

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
          <button class="btn-block" id="btn-start-new-game" style="flex: 1;">${t.startGame}</button>
        </div>

        ${recentGames.length > 0 ? `
          <div style="margin-top: 1.25rem; padding-top: 0.85rem; border-top: 1px solid var(--border-subtle); text-align: center;">
            <button class="btn-outline" id="btn-open-recent-from-new" style="font-size: 0.8rem; border-color: rgba(16, 185, 129, 0.4); color: #a7f3d0;">
              ${t.orResume} (${recentGames.length}) →
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

      const baselineInputs = modal.querySelectorAll('.new-game-baseline-input');
      const initialScores = [];
      baselineInputs.forEach(inp => {
        initialScores.push(parseInt(inp.value, 10) || 0);
      });

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
        simplifiedMode: isSimplified,
        initialScores
      });

      closeModal();
    });
  }

  showStatsModal() {
    const t = this.app.i18n;
    const session = this.app.session;
    const stats = calculateGameStatistics(session);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">${t.gameStats}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; margin-bottom: 0.85rem;">
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${t.deals}</div>
            <div style="font-size: 1.15rem; font-weight: 800;">${stats.numRounds}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${t.over}</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #a5b4fc;">${stats.overRoundsCount}</div>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 0.5rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.68rem; color: var(--text-muted);">${t.under}</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #6ee7b7;">${stats.underRoundsCount}</div>
          </div>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">
          ${t.playerAccuracy}
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
                <span>${t.made}: ${ps.madeBidsCount}/${ps.totalBidsCount}</span>
                <span>${t.avgTricksPerDeal}: ${ps.avgTricksPerRound}</span>
                <span>${t.passSuccess}: ${ps.passSuccess}/${ps.passAttempts}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <button class="btn-block modal-close">
          ${t.done}
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));
  }

  showExportModal() {
    const t = this.app.i18n;
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
          <h3 style="font-size: 1.05rem; font-weight: 700;">${t.exportShare}</h3>
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
          ${t.done}
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-copy-share').addEventListener('click', () => {
      navigator.clipboard.writeText(shareText);
      alert(t.copied || 'Copied to clipboard.');
    });

    modal.querySelector('#btn-copy-json').addEventListener('click', () => {
      navigator.clipboard.writeText(jsonStr);
      alert(t.copied || 'JSON copied to clipboard.');
    });
  }

  showBaselineModal() {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const session = this.app.session;
    const init = session.initialScores || [0, 0, 0, 0];

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 400px;">
        <div class="modal-head">
          <h3 style="font-size: 1.05rem; font-weight: 700;">🎯 ${t.baselineScores}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.4;">
          ${t.baselineDesc}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="player-dot" style="background: ${p.color};"></span>
                <span style="font-weight: 700; font-size: 0.9rem;">${p.name}</span>
              </div>
              <input type="number" class="input-field baseline-score-input" data-p-idx="${idx}" value="${init[idx] || 0}" style="width: 90px; text-align: center; margin-bottom: 0; font-weight: 700; font-size: 0.95rem; font-family: monospace;" />
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.4rem;">
          <button class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
          <button class="btn-block" id="btn-save-baseline" style="flex: 1;">${t.saveBaseline}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelector('#btn-save-baseline').addEventListener('click', () => {
      const inputs = modal.querySelectorAll('.baseline-score-input');
      const scores = [];
      inputs.forEach(inp => {
        scores.push(parseInt(inp.value, 10) || 0);
      });
      session.setInitialScores(scores);
      closeModal();
    });
  }

  showEditDealModal(roundIndex) {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const session = this.app.session;
    if (roundIndex < 0 || roundIndex >= session.completedRounds.length) return;

    const round = session.completedRounds[roundIndex];
    let currentBets = [...round.bets];
    let currentTricks = [...round.tricks];
    let currentDealer = round.dealerIndex;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const getCalcSummary = () => {
      const sumTricks = currentTricks.reduce((a, b) => a + (parseInt(b, 10) || 0), 0);
      const sumBets = currentBets.reduce((a, b) => a + (parseInt(b, 10) || 0), 0);
      const isPas = round.trump && round.trump.isPasRound;
      const isTrumpMaker = (pIdx) => !round.simplified && round.trump && round.trump.winnerIndex === pIdx;

      const playerScores = [];
      for (let i = 0; i < 4; i++) {
        const bid = parseInt(currentBets[i], 10) || 0;
        const tricks = parseInt(currentTricks[i], 10) || 0;
        const res = calculatePlayerScore(bid, tricks, isTrumpMaker(i), isPas, session.rules, sumBets);
        playerScores.push(res);
      }

      return { sumTricks, sumBets, playerScores };
    };

    const updatePreview = () => {
      const { sumTricks, sumBets, playerScores } = getCalcSummary();
      const trickSumBadge = modal.querySelector('#edit-tricks-sum-badge');
      const betsSumBadge = modal.querySelector('#edit-bets-sum-badge');
      const hookWarningBox = modal.querySelector('#edit-hook-warning');
      const btnSave = modal.querySelector('#btn-save-edit-deal');

      if (trickSumBadge) {
        trickSumBadge.textContent = `${isHe ? 'סך לקיחות' : 'Tricks'}: ${sumTricks}/13`;
        if (sumTricks === 13) {
          trickSumBadge.style.background = 'rgba(16, 185, 129, 0.2)';
          trickSumBadge.style.color = '#a7f3d0';
          trickSumBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        } else {
          trickSumBadge.style.background = 'rgba(239, 68, 68, 0.2)';
          trickSumBadge.style.color = '#fca5a5';
          trickSumBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        }
      }

      if (betsSumBadge) {
        betsSumBadge.textContent = `${isHe ? 'סך הכרזות' : 'Bids'}: ${sumBets}`;
      }

      if (hookWarningBox) {
        if (sumBets === 13 && session.rules.enforceHookRule) {
          hookWarningBox.style.display = 'block';
        } else {
          hookWarningBox.style.display = 'none';
        }
      }

      playerScores.forEach((res, pIdx) => {
        const badge = modal.querySelector(`.edit-p-score-${pIdx}`);
        if (badge) {
          const scoreDelta = res.score >= 0 ? `+${res.score}` : `${res.score}`;
          badge.textContent = scoreDelta;
          badge.style.color = res.made ? 'var(--success)' : 'var(--danger)';
        }
      });

      if (btnSave) {
        const canSave = (sumTricks === 13);
        btnSave.disabled = !canSave;
        btnSave.style.opacity = canSave ? '1' : '0.4';
        btnSave.style.cursor = canSave ? 'pointer' : 'not-allowed';
      }
    };

    modal.innerHTML = `
      <div class="modal-box" style="max-width: 440px;">
        <div class="modal-head">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">
              ${t.editDealTitle.replace('{num}', round.roundNumber)}
            </h3>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
              ${t.editDealSub}
            </div>
          </div>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="margin: 0.75rem 0 0.85rem; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary);">
            🃏 ${t.currentDealer}:
          </label>
          <select id="edit-deal-dealer" class="select-field" style="width: auto; margin-bottom: 0; padding: 4px 8px; font-size: 0.82rem;">
            ${session.players.map((p, idx) => `
              <option value="${idx}" ${idx === currentDealer ? 'selected' : ''}>${p.name}</option>
            `).join('')}
          </select>
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 0.85rem;">
          <div id="edit-tricks-sum-badge" style="flex: 1; padding: 6px; text-align: center; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; border: 1px solid;"></div>
          <div id="edit-bets-sum-badge" style="flex: 1; padding: 6px; text-align: center; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 700; background: rgba(255,255,255,0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);"></div>
        </div>

        <div id="edit-hook-warning" style="display: none; margin-bottom: 0.85rem; padding: 6px 10px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: var(--radius-sm); font-size: 0.75rem; color: #fde68a;">
          ⚠️ ${t.hookWarning}
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
          ${session.players.map((p, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 6px; min-width: 85px; flex: 1;">
                <span class="player-dot" style="background: ${p.color};"></span>
                <span style="font-size: 0.85rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</span>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">B:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-bid" data-p-idx="${idx}" value="${currentBets[idx]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">T:</span>
                  <input type="number" min="0" max="13" class="input-field edit-deal-trick" data-p-idx="${idx}" value="${currentTricks[idx]}" style="width: 48px; margin-bottom: 0; padding: 4px; text-align: center; font-size: 0.85rem; font-weight: 700;" />
                </div>

                <div class="edit-p-score-${idx} signed-score" dir="ltr" style="min-width: 45px; text-align: center; font-size: 0.85rem; font-weight: 800; direction: ltr; unicode-bidi: isolate;">
                  —
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <button class="btn-pill" id="btn-delete-deal" style="color: var(--danger); font-size: 0.75rem; height: 38px; padding: 0 10px;">
            🗑️ ${t.deleteDeal}
          </button>
          <div style="display: flex; gap: 6px;">
            <button class="btn-outline modal-close" style="height: 38px; padding: 0 12px;">${t.cancel}</button>
            <button class="btn-block" id="btn-save-edit-deal" style="height: 38px; padding: 0 16px;">${t.saveDeal}</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelectorAll('.edit-deal-bid').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const pIdx = parseInt(e.target.dataset.pIdx, 10);
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > 13) val = 13;
        currentBets[pIdx] = val;
        updatePreview();
      });
    });

    modal.querySelectorAll('.edit-deal-trick').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const pIdx = parseInt(e.target.dataset.pIdx, 10);
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > 13) val = 13;
        currentTricks[pIdx] = val;
        updatePreview();
      });
    });

    const dealerSelect = modal.querySelector('#edit-deal-dealer');
    if (dealerSelect) {
      dealerSelect.addEventListener('change', (e) => {
        currentDealer = parseInt(e.target.value, 10);
      });
    }

    modal.querySelector('#btn-save-edit-deal').addEventListener('click', () => {
      const { sumTricks } = getCalcSummary();
      if (sumTricks !== 13) {
        alert(t.invalidTricksSum.replace('{sum}', sumTricks));
        return;
      }
      session.editCompletedRound(roundIndex, {
        bets: currentBets,
        tricks: currentTricks,
        dealerIndex: currentDealer
      });
      closeModal();
    });

    modal.querySelector('#btn-delete-deal').addEventListener('click', () => {
      if (confirm(t.deleteDealConfirm.replace('{num}', round.roundNumber))) {
        session.deleteCompletedRound(roundIndex);
        closeModal();
      }
    });

    updatePreview();
  }
}
