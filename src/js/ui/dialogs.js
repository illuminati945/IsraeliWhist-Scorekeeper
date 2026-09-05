/**
 * Modals & Dialogs (Menu, Reorganize Seating, Saved Games Archive, Edit Settings/Names, Share, New Game, Rules, Stats, Export) with i18n
 */
import { RULE_PRESETS, calculatePlayerScore } from '../engine/whist-rules.js';
import { calculateGameStatistics } from '../engine/statistics.js';
import { GameSession } from '../engine/game-state.js';
import { ArchiveManager } from '../engine/archive-manager.js';
import { ProfileManager, AVATAR_OPTIONS, COLOR_OPTIONS } from '../engine/profile-manager.js';

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

          <button class="menu-item-btn" id="menu-opt-profiles" style="background: rgba(139, 92, 246, 0.15); border-color: rgba(139, 92, 246, 0.35);">
            <div>
              <div style="font-weight: 700; color: #c4b5fd;">${t.manageProfilesMenu}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">
                ${t.manageProfilesDesc}
              </div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #a78bfa;">Open →</span>
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

    modal.querySelector('#menu-opt-profiles').addEventListener('click', () => {
      closeModal();
      this.showProfilesModal();
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

  /**
   * Helper: Attaches smooth physics-driven drag-and-drop to circular table seating cards
   */
  attachSeatingDragDrop({ grid, getCards, onSwap, onTap }) {
    if (!grid) return;
    let isAnyDragging = false;

    const triggerHaptic = (pattern = 25) => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (e) {}
      }
    };

    const cards = getCards();
    cards.forEach((card) => {
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;
      let lastX = 0;
      let currentTilt = 0;
      let targetTilt = 0;
      let isThisDragging = false;
      let fromSlotIndex = null;
      let currentHoverSlot = null;
      let initialSlotRects = [];
      let rafId = null;
      let activePointerId = null;

      const computeSlotPositions = () => {
        const all = getCards();
        return all.map(c => {
          const r = c.getBoundingClientRect();
          return {
            left: r.left,
            top: r.top,
            width: r.width,
            height: r.height,
            centerX: r.left + r.width / 2,
            centerY: r.top + r.height / 2
          };
        });
      };

      const applyLiveSlotShifts = (hoveredSlot) => {
        const all = getCards();
        all.forEach((c, sIdx) => {
          if (sIdx === fromSlotIndex) return;

          if (hoveredSlot !== null && sIdx === hoveredSlot && hoveredSlot !== fromSlotIndex) {
            const fromRect = initialSlotRects[fromSlotIndex];
            const targetRect = initialSlotRects[hoveredSlot];
            if (fromRect && targetRect) {
              const dx = fromRect.left - targetRect.left;
              const dy = fromRect.top - targetRect.top;
              c.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
              c.classList.add('is-hovered-target');
            }
          } else {
            c.style.transform = '';
            c.classList.remove('is-hovered-target');
          }
        });
      };

      const resetCardShifts = () => {
        const all = getCards();
        all.forEach(c => {
          c.style.transform = '';
          c.style.zIndex = '';
          c.classList.remove('is-hovered-target');
        });
      };

      const updateDragLoop = () => {
        if (!isThisDragging) return;

        const dx = currentX - startX;
        const dy = currentY - startY;

        // Damped physics tilt
        currentTilt += (targetTilt - currentTilt) * 0.2;
        card.style.transform = `translate3d(${dx}px, ${dy - 8}px, 0) scale(1.12) rotate(${currentTilt.toFixed(2)}deg)`;

        // Center coordinates of the dragged card
        const originRect = initialSlotRects[fromSlotIndex];
        const cardCenterX = originRect.centerX + dx;
        const cardCenterY = originRect.centerY + dy;

        let bestSlot = currentHoverSlot;
        let minScore = Infinity;

        initialSlotRects.forEach((rect, sIdx) => {
          const dist = Math.hypot(cardCenterX - rect.centerX, cardCenterY - rect.centerY);
          const bias = (sIdx === currentHoverSlot) ? 0.75 : 1.0;
          const score = dist * bias;
          if (score < minScore) {
            minScore = score;
            bestSlot = sIdx;
          }
        });

        if (bestSlot !== currentHoverSlot) {
          currentHoverSlot = bestSlot;
          triggerHaptic(18);
          applyLiveSlotShifts(currentHoverSlot);
        }

        rafId = requestAnimationFrame(updateDragLoop);
      };

      const onPointerMove = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;

        if (!isThisDragging) {
          const dist = Math.hypot(clientX - startX, clientY - startY);
          if (dist > 5) {
            if (isAnyDragging) return;
            isAnyDragging = true;
            isThisDragging = true;
            fromSlotIndex = parseInt(card.dataset.seatIdx, 10);
            currentHoverSlot = fromSlotIndex;
            initialSlotRects = computeSlotPositions();

            card.classList.add('is-lifted');
            card.style.zIndex = '500';
            triggerHaptic([30, 40]);

            currentX = clientX;
            currentY = clientY;
            lastX = clientX;
            currentTilt = 0;
            targetTilt = 0;

            rafId = requestAnimationFrame(updateDragLoop);
          }
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        currentX = clientX;
        currentY = clientY;

        const vx = clientX - lastX;
        lastX = clientX;
        targetTilt = Math.max(-10, Math.min(10, vx * 0.45));
      };

      const onPointerUp = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        activePointerId = null;

        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        if (isThisDragging) {
          isThisDragging = false;
          isAnyDragging = false;

          const targetSlot = currentHoverSlot;
          const originRect = initialSlotRects[fromSlotIndex];
          const targetRect = initialSlotRects[targetSlot];

          if (originRect && targetRect && fromSlotIndex !== targetSlot) {
            const dropDx = targetRect.left - originRect.left;
            const dropDy = targetRect.top - originRect.top;

            card.classList.add('is-dropping');
            card.style.transform = `translate3d(${dropDx}px, ${dropDy}px, 0) scale(1.0) rotate(0deg)`;
            triggerHaptic(35);

            setTimeout(() => {
              card.classList.remove('is-lifted', 'is-dropping');
              resetCardShifts();
              onSwap(fromSlotIndex, targetSlot);
            }, 240);
          } else {
            // Snap back
            card.classList.add('is-dropping');
            card.style.transform = `translate3d(0, 0, 0) scale(1.0) rotate(0deg)`;
            setTimeout(() => {
              card.classList.remove('is-lifted', 'is-dropping');
              resetCardShifts();
            }, 220);
          }
        } else {
          if (onTap) {
            onTap(parseInt(card.dataset.seatIdx, 10), e);
          }
        }
      };

      const onPointerDown = (e) => {
        if (e.target.closest('.btn-clear-seat')) return;
        if (isAnyDragging) return;

        activePointerId = e.pointerId;
        startX = e.clientX;
        startY = e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;
        lastX = e.clientX;

        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      };

      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('contextmenu', (e) => e.preventDefault());
    });
  }

  /**
   * Helper: Attaches drag-and-drop from unassigned roster chips onto table seats
   */
  attachRosterChipDragDrop({ rosterContainer, getSeatCards, onAssignToSeat }) {
    if (!rosterContainer) return;

    const triggerHaptic = (pattern = 25) => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (e) {}
      }
    };

    const chips = rosterContainer.querySelectorAll('.profile-chip');
    chips.forEach(chip => {
      let startX = 0;
      let startY = 0;
      let isChipDragging = false;
      let ghost = null;
      let activePointerId = null;
      let hoveredSeatIdx = null;

      const getSeatPositions = () => {
        const seatCards = getSeatCards();
        return seatCards.map(c => {
          const r = c.getBoundingClientRect();
          return {
            idx: parseInt(c.dataset.seatIdx, 10),
            left: r.left,
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            card: c
          };
        });
      };

      let seatRects = [];

      const onPointerMove = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;

        if (!isChipDragging) {
          const dist = Math.hypot(clientX - startX, clientY - startY);
          if (dist > 8) {
            isChipDragging = true;
            seatRects = getSeatPositions();
            triggerHaptic([25, 35]);

            ghost = chip.cloneNode(true);
            ghost.className = 'profile-chip ghost-chip-drag';
            ghost.style.position = 'fixed';
            ghost.style.left = `${clientX}px`;
            ghost.style.top = `${clientY}px`;
            ghost.style.zIndex = '1000';
            ghost.style.pointerEvents = 'none';
            document.body.appendChild(ghost);
            chip.style.opacity = '0.35';
          }
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (ghost) {
          ghost.style.left = `${clientX}px`;
          ghost.style.top = `${clientY}px`;
        }

        let matchedSeat = null;
        for (const s of seatRects) {
          if (clientX >= s.left && clientX <= s.right && clientY >= s.top && clientY <= s.bottom) {
            matchedSeat = s.idx;
            break;
          }
        }

        if (matchedSeat !== hoveredSeatIdx) {
          hoveredSeatIdx = matchedSeat;
          seatRects.forEach(s => {
            if (s.idx === hoveredSeatIdx) {
              s.card.classList.add('is-hovered-target');
              triggerHaptic(15);
            } else {
              s.card.classList.remove('is-hovered-target');
            }
          });
        }
      };

      const onPointerUp = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        activePointerId = null;

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        seatRects.forEach(s => s.card.classList.remove('is-hovered-target'));

        if (isChipDragging) {
          isChipDragging = false;
          chip.style.opacity = '';
          if (ghost) {
            ghost.remove();
            ghost = null;
          }

          if (hoveredSeatIdx !== null) {
            triggerHaptic(35);
            const profId = chip.dataset.profId;
            onAssignToSeat(profId, hoveredSeatIdx);
          }
        }
      };

      const onPointerDown = (e) => {
        activePointerId = e.pointerId;
        startX = e.clientX;
        startY = e.clientY;

        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      };

      chip.addEventListener('pointerdown', onPointerDown);
    });
  }

  showReorganizeSeatingModal(initialSelectedPlayerIdx = null) {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const session = this.app.session;

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
          <div class="table-seating-container">
            <div class="table-center-emblem">
              ♠ ♥<br>♦ ♣
            </div>

            <div class="leaderboard-grid seating-modal-grid" style="margin-bottom: 0;">
              ${session.players.map((p, idx) => {
                const isDeal = isDealer(idx);

                return `
                  <div class="player-card seat-swap-card ${isDeal ? 'is-dealer' : ''}" 
                       data-seat-idx="${idx}" 
                       title="${t.dragToReorder}">
                    ${isDeal ? `<span class="tag-dealer">${t.dealer.toUpperCase()}</span>` : ''}
                    <div class="seat-top-row">
                      <span>${t.seatNumber} #${idx + 1}</span>
                    </div>
                    <div style="margin: 2px 0;">
                      <div class="seat-avatar-bubble" style="border-color: ${p.color}; background: ${p.color}24;">
                        ${p.avatar || '👤'}
                      </div>
                    </div>
                    <div class="seat-player-name">
                      ${p.name}
                    </div>
                    <div class="seat-action-hint" style="color: var(--accent-primary);">
                      ${isHe ? 'גרור להחלפה' : 'Drag to swap'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Swap Hint Banner -->
          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.75rem; text-align: center; color: #c7d2fe; margin-bottom: 0.85rem;">
            ✋ ${isHe ? 'גרור כרטיס שחקן לכיסא אחר כדי להחליף מקום' : 'Drag any player card onto another seat to swap'}
          </div>

          <button class="btn-block modal-close">
            ${t.doneSeating}
          </button>
        </div>
      `;

      modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => modal.remove()));

      this.attachSeatingDragDrop({
        grid: modal.querySelector('.seating-modal-grid'),
        getCards: () => Array.from(modal.querySelectorAll('.seat-swap-card')),
        onSwap: (fromIdx, toIdx) => {
          session.swapPlayers(fromIdx, toIdx);
          renderContent();
        }
      });
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
        <div class="modal-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
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

        <div class="share-modal-layout">
          <div class="share-qr-col" style="text-align: center; margin: 0.5rem 0 1rem;">
            <div style="background: white; padding: 10px; border-radius: var(--radius-md); display: inline-block;">
              <img src="${qrUrl}" alt="Game QR Code" width="150" height="150" style="display: block;" />
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.4rem;">
              ${t.scanQr}
            </div>
          </div>

          <div class="share-info-col" style="flex: 1;">
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

    // Load saved profiles
    let profiles = ProfileManager.getProfiles();
    const lastLineup = ProfileManager.getLastLineup();

    // Start with 4 placeholder seats (null) if no players were chosen yet!
    let seatPlayers = [null, null, null, null];

    let activeTargetSeatIdx = 0; // Where next chosen player lands

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const renderModalContent = () => {
      profiles = ProfileManager.getProfiles();
      const filledCount = seatPlayers.filter(s => s && s.name).length;

      modal.innerHTML = `
        <div class="modal-box modal-new-game">
          <div class="modal-head">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em;">🎲 ${t.newGameTitle}</h3>
            </div>
            <button class="btn-pill modal-close">✕</button>
          </div>

          <!-- Circular Seating Table 2x2 Grid with Drag & Drop Physics -->
          <div class="table-seating-container">
            <div class="table-center-emblem">
              ♠ ♥<br>♦ ♣
            </div>

            <div class="leaderboard-grid seating-modal-grid" style="margin-bottom: 0;">
              ${[0, 1, 2, 3].map(idx => {
                const player = seatPlayers[idx];
                const isFilled = !!(player && player.name);
                const isDealer = (idx === 0);
                const isActiveTarget = (activeTargetSeatIdx === idx);

                let cardClass = 'player-card seat-card-interactive';
                if (!isFilled) cardClass += ' is-placeholder';
                else cardClass += ' is-filled';
                if (isActiveTarget) cardClass += ' is-active-target';

                return `
                  <div class="${cardClass}" data-player-idx="${idx}" data-seat-idx="${idx}" title="${isFilled ? t.dragToSwapSeats : (isHe ? 'לחץ לבחירת שחקן' : 'Tap to assign player')}">
                    <div class="seat-top-row">
                      <span>${t.seatNumber} #${idx + 1}</span>
                      ${isDealer ? `<span class="tag-dealer" style="position: static;">${t.dealer.toUpperCase()}</span>` : ''}
                      ${isFilled ? `<button type="button" class="btn-clear-seat" data-seat-idx="${idx}" title="${t.clearSeat}">✕</button>` : ''}
                    </div>

                    <div style="margin: 2px 0;">
                      ${isFilled ? `
                        <div class="seat-avatar-bubble" style="border-color: ${player.color}; background: ${player.color}24;">
                          ${player.avatar}
                        </div>
                      ` : `
                        <div class="seat-avatar-placeholder">
                          +
                        </div>
                      `}
                    </div>

                    <div class="seat-player-name">
                      ${isFilled ? player.name : t.emptySeatPlaceholder}
                    </div>

                    <div class="seat-action-hint" style="color: ${isFilled ? 'var(--accent-primary)' : 'var(--text-muted)'};">
                      ${isFilled ? (isHe ? 'גרור להחלפה' : 'Drag to swap') :
                        isActiveTarget ? (isHe ? 'יעד לבחירה' : 'Target seat') :
                        (isHe ? 'לחץ לבחירה' : 'Tap to pick')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Quick Picker Roster Section (Wrapped, fits mobile perfectly) -->
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.65rem 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.4rem;">
              <span style="font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">
                👥 ${t.quickPick}
              </span>
              <div style="display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap;">
                ${lastLineup ? `
                  <button type="button" class="btn-pill btn-quick-action" id="btn-use-last-lineup" title="${t.useLastLineup}">
                    ${t.useLastLineup}
                  </button>
                ` : ''}
                <button type="button" class="btn-pill btn-quick-action" id="btn-add-profile-from-new" title="${t.addProfile}">
                  ${t.addProfile}
                </button>
                <button type="button" class="btn-pill btn-quick-action" id="btn-clear-all-seats" title="${t.clearAllSeats}">
                  🗑️ ${t.clearAllSeats}
                </button>
                <button type="button" class="btn-pill btn-quick-action" id="btn-manage-profiles-from-new" title="${t.playerProfiles}">
                  ⚙️
                </button>
              </div>
            </div>

            <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.4rem;">
              ${t.quickPickSub}
            </div>

            <!-- Wrapped Roster Chips (NO horizontal scrolling overflow) -->
            <div class="roster-chips-wrap" id="roster-chips-container">
              ${profiles.map(prof => {
                const assignedSeatIdx = seatPlayers.findIndex(s => s && s.name && s.name.trim().toLowerCase() === prof.name.trim().toLowerCase());
                const isAssigned = assignedSeatIdx >= 0;

                return `
                  <button type="button" class="profile-chip ${isAssigned ? 'is-assigned' : ''}" data-prof-id="${prof.id}">
                    <span class="chip-avatar" style="border-color: ${prof.color}; background: ${prof.color}22;">${prof.avatar}</span>
                    <span class="chip-name">${prof.name}</span>
                    ${isAssigned ? `<span class="chip-seat-badge">S${assignedSeatIdx + 1}</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Mode & Match Options -->
          <div class="new-game-options-box" style="margin-bottom: 0.65rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer;">
              <input type="checkbox" id="chk-new-game-simplified" ${session.simplifiedMode ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-primary);">
              <div>
                <div style="font-size: 0.82rem; font-weight: 700; color: white;">${t.simplified}</div>
                <div style="font-size: 0.7rem; color: var(--text-secondary);">${isHe ? 'הכרזות ולקיחות ישירות (ללא מכרז שליט)' : 'Direct Bids & Tricks (Skip trump & suit auction)'}</div>
              </div>
            </label>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.85rem;">
            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.2rem;">
                ${t.scoringRules}
              </label>
              <select class="select-field" id="new-game-rule-select" style="margin-bottom: 0; padding: 5px 8px; font-size: 0.78rem; min-height: 36px;">
                ${Object.values(RULE_PRESETS).map(r => `
                  <option value="${r.id}">${isHe ? r.nameHe : r.nameEn}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.2rem;">
                ${t.gameLimit}
              </label>
              <select class="select-field" id="new-game-target-select" style="margin-bottom: 0; padding: 5px 8px; font-size: 0.78rem; min-height: 36px;">
                <option value="UNLIMITED">${t.freePlay}</option>
                <option value="13_ROUNDS">${t.deals13}</option>
                <option value="16_ROUNDS">${t.deals16}</option>
                <option value="TARGET_500">${t.target500}</option>
                <option value="TARGET_1000">${t.target1000}</option>
              </select>
            </div>
          </div>

          <!-- Dialog Actions -->
          <div style="display: flex; gap: 0.45rem;">
            <button type="button" class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
            <button type="button" class="btn-block btn-hero-start" id="btn-start-new-game" style="flex: 2; font-size: 0.95rem; ${filledCount < 4 ? 'opacity: 0.6;' : ''}">
              ${t.startGame} (${filledCount}/4) →
            </button>
          </div>

          ${recentGames.length > 0 ? `
            <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px solid var(--border-subtle); text-align: center;">
              <button type="button" class="btn-outline" id="btn-open-recent-from-new" style="font-size: 0.75rem; border-color: rgba(16, 185, 129, 0.4); color: #a7f3d0; padding: 3px 10px;">
                ${t.orResume} (${recentGames.length}) →
              </button>
            </div>
          ` : ''}
        </div>
      `;

      bindNewGameEvents();
    };

    const bindNewGameEvents = () => {
      const closeModal = () => modal.remove();
      modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

      // Attach Drag & Drop Physics across Seating Table
      this.attachSeatingDragDrop({
        grid: modal.querySelector('.seating-modal-grid'),
        getCards: () => Array.from(modal.querySelectorAll('.seat-card-interactive')),
        onSwap: (fromIdx, toIdx) => {
          const temp = seatPlayers[fromIdx];
          seatPlayers[fromIdx] = seatPlayers[toIdx];
          seatPlayers[toIdx] = temp;
          activeTargetSeatIdx = toIdx;
          renderModalContent();
        },
        onTap: (seatIdx) => {
          activeTargetSeatIdx = seatIdx;
          renderModalContent();
        }
      });

      // Clear single seat
      modal.querySelectorAll('.btn-clear-seat').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.seatIdx, 10);
          seatPlayers[idx] = null;
          activeTargetSeatIdx = idx;
          renderModalContent();
        });
      });

      // Attach Drag & Drop from Roster Chips onto Table Seats!
      this.attachRosterChipDragDrop({
        rosterContainer: modal.querySelector('#roster-chips-container'),
        getSeatCards: () => Array.from(modal.querySelectorAll('.seat-card-interactive')),
        onAssignToSeat: (profId, targetSeatIdx) => {
          const prof = ProfileManager.getProfile(profId);
          if (!prof) return;

          // Remove if assigned in another seat
          const prevSeat = seatPlayers.findIndex(s => s && s.name && s.name.trim().toLowerCase() === prof.name.trim().toLowerCase());
          if (prevSeat >= 0 && prevSeat !== targetSeatIdx) {
            seatPlayers[prevSeat] = null;
          }

          seatPlayers[targetSeatIdx] = {
            name: prof.name,
            color: prof.color,
            avatar: prof.avatar,
            baselineScore: 0
          };

          const nextEmpty = seatPlayers.findIndex((s, i) => !s || !s.name);
          if (nextEmpty >= 0) {
            activeTargetSeatIdx = nextEmpty;
          } else {
            activeTargetSeatIdx = (targetSeatIdx + 1) % 4;
          }
          renderModalContent();
        }
      });

      // Profile chips click: Assign to activeTargetSeatIdx and auto-advance
      modal.querySelectorAll('.profile-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const profId = chip.dataset.profId;
          const prof = ProfileManager.getProfile(profId);
          if (!prof) return;

          // Check if already assigned
          const alreadySeatIdx = seatPlayers.findIndex(s => s && s.name && s.name.trim().toLowerCase() === prof.name.trim().toLowerCase());
          if (alreadySeatIdx >= 0) {
            activeTargetSeatIdx = alreadySeatIdx;
            renderModalContent();
            return;
          }

          // Target seat index
          let targetIdx = activeTargetSeatIdx;
          if (seatPlayers[targetIdx] && seatPlayers[targetIdx].name) {
            const firstEmpty = seatPlayers.findIndex(s => !s || !s.name);
            if (firstEmpty >= 0) targetIdx = firstEmpty;
          }

          seatPlayers[targetIdx] = {
            name: prof.name,
            color: prof.color,
            avatar: prof.avatar,
            baselineScore: 0
          };

          // Auto-advance activeTargetSeatIdx to next empty seat
          const nextEmpty = seatPlayers.findIndex((s, i) => !s || !s.name);
          if (nextEmpty >= 0) {
            activeTargetSeatIdx = nextEmpty;
          } else {
            activeTargetSeatIdx = (targetIdx + 1) % 4;
          }

          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(12); } catch (e) {}
          }
          renderModalContent();
        });
      });

      // Clear all seats
      const btnClearAll = modal.querySelector('#btn-clear-all-seats');
      if (btnClearAll) {
        btnClearAll.addEventListener('click', () => {
          seatPlayers = [null, null, null, null];
          activeTargetSeatIdx = 0;
          renderModalContent();
        });
      }

      // Use Last Lineup button
      const btnLastLineup = modal.querySelector('#btn-use-last-lineup');
      if (btnLastLineup) {
        btnLastLineup.addEventListener('click', () => {
          const lu = ProfileManager.getLastLineup();
          if (lu && Array.isArray(lu) && lu.length === 4) {
            seatPlayers = lu.map((p, idx) => ({
              name: p.name,
              avatar: p.avatar || AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length],
              color: p.color || COLOR_OPTIONS[idx % COLOR_OPTIONS.length],
              baselineScore: 0
            }));
            renderModalContent();
          }
        });
      }

      // Add profile shortcut
      const btnAddProf = modal.querySelector('#btn-add-profile-from-new');
      if (btnAddProf) {
        btnAddProf.addEventListener('click', () => {
          this.showCreateEditProfileModal(null, (newProf) => {
            if (newProf) {
              let targetIdx = activeTargetSeatIdx;
              if (seatPlayers[targetIdx] && seatPlayers[targetIdx].name) {
                const firstEmpty = seatPlayers.findIndex(s => !s || !s.name);
                if (firstEmpty >= 0) targetIdx = firstEmpty;
              }
              seatPlayers[targetIdx] = {
                name: newProf.name,
                color: newProf.color,
                avatar: newProf.avatar,
                baselineScore: 0
              };
              const nextEmpty = seatPlayers.findIndex((s, i) => !s || !s.name);
              if (nextEmpty >= 0) activeTargetSeatIdx = nextEmpty;
              else activeTargetSeatIdx = (targetIdx + 1) % 4;
              renderModalContent();
            }
          });
        });
      }

      // Manage profiles shortcut
      const btnManageProf = modal.querySelector('#btn-manage-profiles-from-new');
      if (btnManageProf) {
        btnManageProf.addEventListener('click', () => {
          this.showProfilesModal(() => {
            renderModalContent();
          });
        });
      }

      // Resume from recent games button
      const btnRecent = modal.querySelector('#btn-open-recent-from-new');
      if (btnRecent) {
        btnRecent.addEventListener('click', () => {
          closeModal();
          this.showSavedGamesModal();
        });
      }

      // Start Game submission
      modal.querySelector('#btn-start-new-game').addEventListener('click', () => {
        const filledCount = seatPlayers.filter(s => s && s.name).length;
        if (filledCount < 4) {
          const firstEmpty = seatPlayers.findIndex(s => !s || !s.name);
          if (firstEmpty >= 0) {
            activeTargetSeatIdx = firstEmpty;
            renderModalContent();
          }
          alert(t.mustChoose4Players);
          return;
        }

        const isSimplified = modal.querySelector('#chk-new-game-simplified').checked;
        const ruleKey = modal.querySelector('#new-game-rule-select').value;
        const targetVal = modal.querySelector('#new-game-target-select').value;

        const newPlayers = seatPlayers.map((s, idx) => ({
          id: `p${idx}`,
          name: s.name.trim(),
          color: s.color || COLOR_OPTIONS[idx % COLOR_OPTIONS.length],
          avatar: s.avatar || AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length]
        }));

        const initialScores = seatPlayers.map(s => parseInt(s.baselineScore, 10) || 0);

        // Auto-register/update player profiles in ProfileManager
        newPlayers.forEach(p => {
          ProfileManager.saveProfile({
            name: p.name,
            color: p.color,
            avatar: p.avatar
          });
        });
        ProfileManager.saveLastLineup(newPlayers);

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
    };

    renderModalContent();
    document.body.appendChild(modal);
  }

  /**
   * Dedicated Player Profiles & Career Roster Manager Modal
   */
  showProfilesModal(onCloseCallback = null) {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const render = () => {
      const profiles = ProfileManager.getProfiles();

      modal.innerHTML = `
        <div class="modal-box" style="max-width: 500px;">
          <div class="modal-head">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.15rem; font-weight: 800;">👥 ${t.playerProfiles}</h3>
            </div>
            <button class="btn-pill modal-close">✕</button>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
            <span style="font-size: 0.78rem; color: var(--text-secondary);">
              ${profiles.length} ${t.savedProfiles}
            </span>
            <button type="button" class="btn-pill btn-share" id="btn-add-profile-main" style="height: 32px; font-size: 0.8rem; padding: 0 12px;">
              ${t.addProfile}
            </button>
          </div>

          <div class="profiles-list-container" style="display: flex; flex-direction: column; gap: 0.55rem; max-height: 52vh; overflow-y: auto; padding-right: 2px;">
            ${profiles.map(prof => {
              const winRate = prof.gamesPlayed > 0 ? Math.round((prof.wins / prof.gamesPlayed) * 100) : 0;
              const zeroRate = prof.zeroBids > 0 ? Math.round((prof.zeroHits / prof.zeroBids) * 100) : 0;
              const avgScore = prof.gamesPlayed > 0 ? Math.round(prof.totalScore / prof.gamesPlayed) : 0;

              return `
                <div class="profile-card-row" data-prof-id="${prof.id}">
                  <div style="display: flex; align-items: center; gap: 0.65rem; flex: 1; min-width: 0;">
                    <div class="profile-avatar-circle" style="border-color: ${prof.color}; background: ${prof.color}22;">
                      ${prof.avatar}
                    </div>
                    <div style="min-width: 0; flex: 1;">
                      <div style="font-weight: 800; font-size: 0.92rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${prof.name}
                      </div>
                      <div class="profile-stats-badges">
                        <span class="stat-badge" title="${t.matchesPlayed}">${prof.gamesPlayed || 0} ${t.matchesPlayed}</span>
                        <span class="stat-badge highlight" title="${t.winRatio}">🏆 ${winRate}%</span>
                        ${prof.zeroBids > 0 ? `
                          <span class="stat-badge" title="${t.zeroHitsStats}">0️⃣ ${zeroRate}%</span>
                        ` : ''}
                        <span class="stat-badge" title="${t.totalPoints}">⭐ ${prof.totalScore || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
                    <button type="button" class="btn-pill btn-edit-prof" data-prof-id="${prof.id}" title="${t.editTitle}" style="height: 28px; padding: 0 8px; font-size: 0.72rem;">
                      ✏️
                    </button>
                    <button type="button" class="btn-pill btn-delete-prof" data-prof-id="${prof.id}" title="${t.deleteProfileBtn}" style="height: 28px; padding: 0 8px; font-size: 0.72rem; color: var(--danger); border-color: rgba(239, 68, 68, 0.3);">
                      🗑️
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <button type="button" class="btn-block modal-close" style="margin-top: 1rem;">
            ${t.close}
          </button>
        </div>
      `;

      bindEvents();
    };

    const bindEvents = () => {
      const closeModal = () => {
        modal.remove();
        if (onCloseCallback) onCloseCallback();
      };
      modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

      // Add profile
      const btnAdd = modal.querySelector('#btn-add-profile-main');
      if (btnAdd) {
        btnAdd.addEventListener('click', () => {
          this.showCreateEditProfileModal(null, () => render());
        });
      }

      // Edit profile
      modal.querySelectorAll('.btn-edit-prof').forEach(btn => {
        btn.addEventListener('click', () => {
          const prof = ProfileManager.getProfile(btn.dataset.profId);
          if (prof) {
            this.showCreateEditProfileModal(prof, () => render());
          }
        });
      });

      // Delete profile
      modal.querySelectorAll('.btn-delete-prof').forEach(btn => {
        btn.addEventListener('click', () => {
          const prof = ProfileManager.getProfile(btn.dataset.profId);
          if (prof && confirm(t.deleteProfileConfirm.replace('{name}', prof.name))) {
            ProfileManager.deleteProfile(prof.id);
            render();
          }
        });
      });
    };

    render();
    document.body.appendChild(modal);
  }

  /**
   * Modal to Create or Edit a Player Profile
   */
  showCreateEditProfileModal(profileToEdit = null, onSaved = null) {
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const isEdit = !!profileToEdit;

    let selectedAvatar = profileToEdit ? profileToEdit.avatar : AVATAR_OPTIONS[Math.floor(Math.random() * AVATAR_OPTIONS.length)];
    let selectedColor = profileToEdit ? profileToEdit.color : COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)];

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.zIndex = '300'; // Higher than parents if called from new game

    const render = () => {
      modal.innerHTML = `
        <div class="modal-box" style="max-width: 420px;">
          <div class="modal-head">
            <h3 style="font-size: 1.05rem; font-weight: 800;">
              ${isEdit ? t.editProfileTitle : t.createProfileTitle}
            </h3>
            <button class="btn-pill modal-close">✕</button>
          </div>

          <!-- Avatar Preview with selected color -->
          <div style="display: flex; justify-content: center; margin: 0.85rem 0;">
            <div class="profile-avatar-preview" style="border-color: ${selectedColor}; background: ${selectedColor}22;">
              ${selectedAvatar}
            </div>
          </div>

          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.playerName}
            </label>
            <input type="text" class="input-field" id="prof-modal-name" value="${profileToEdit ? profileToEdit.name : ''}" placeholder="${t.playerNamePlaceholder}" maxlength="24" autofocus style="margin-bottom: 0;" />
          </div>

          <!-- Avatar Grid -->
          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.chooseAvatar}
            </label>
            <div class="emoji-picker-grid">
              ${AVATAR_OPTIONS.map(em => `
                <button type="button" class="emoji-option-btn ${em === selectedAvatar ? 'is-selected' : ''}" data-avatar="${em}">
                  ${em}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Color Swatches -->
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.74rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
              ${t.chooseColor}
            </label>
            <div class="color-picker-swatches">
              ${COLOR_OPTIONS.map(c => `
                <button type="button" class="color-swatch-btn ${c === selectedColor ? 'is-selected' : ''}" data-color="${c}" style="background: ${c};"></button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 0.4rem; margin-top: 1rem;">
            <button type="button" class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
            <button type="button" class="btn-block" id="btn-save-prof-confirm" style="flex: 2;">${t.saveProfileBtn}</button>
          </div>
        </div>
      `;

      bind();
    };

    const bind = () => {
      const closeModal = () => modal.remove();
      modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

      // Avatar selection
      modal.querySelectorAll('.emoji-option-btn').forEach(b => {
        b.addEventListener('click', () => {
          selectedAvatar = b.dataset.avatar;
          render();
        });
      });

      // Color selection
      modal.querySelectorAll('.color-swatch-btn').forEach(b => {
        b.addEventListener('click', () => {
          selectedColor = b.dataset.color;
          render();
        });
      });

      // Save
      modal.querySelector('#btn-save-prof-confirm').addEventListener('click', () => {
        const nameVal = modal.querySelector('#prof-modal-name').value.trim();
        if (!nameVal) {
          modal.querySelector('#prof-modal-name').focus();
          return;
        }

        const saved = ProfileManager.saveProfile({
          id: profileToEdit?.id,
          name: nameVal,
          avatar: selectedAvatar,
          color: selectedColor
        });

        closeModal();
        if (onSaved) onSaved(saved);
      });
    };

    render();
    document.body.appendChild(modal);
  }

  /**
   * Quick Avatar & Color Picker popover for seat cards
   */
  showAvatarPickerModal(onChosen, currentAvatar = '🦊', currentColor = '#6366f1') {
    const t = this.app.i18n;
    let selAvatar = currentAvatar;
    let selColor = currentColor;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.zIndex = '350';

    modal.innerHTML = `
      <div class="modal-box" style="max-width: 380px;">
        <div class="modal-head">
          <h3 style="font-size: 1rem; font-weight: 800;">${t.chooseAvatar} & ${t.chooseColor}</h3>
          <button class="btn-pill modal-close">✕</button>
        </div>

        <div style="display: flex; justify-content: center; margin: 0.75rem 0;">
          <div id="quick-avatar-preview" class="profile-avatar-preview" style="border-color: ${selColor}; background: ${selColor}22;">
            ${selAvatar}
          </div>
        </div>

        <div class="emoji-picker-grid" style="margin-bottom: 0.85rem;">
          ${AVATAR_OPTIONS.map(em => `
            <button type="button" class="emoji-option-btn ${em === selAvatar ? 'is-selected' : ''}" data-avatar="${em}">
              ${em}
            </button>
          `).join('')}
        </div>

        <div class="color-picker-swatches" style="margin-bottom: 1rem;">
          ${COLOR_OPTIONS.map(c => `
            <button type="button" class="color-swatch-btn ${c === selColor ? 'is-selected' : ''}" data-color="${c}" style="background: ${c};"></button>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="btn-outline modal-close" style="flex: 1;">${t.cancel}</button>
          <button type="button" class="btn-block" id="btn-quick-avatar-apply" style="flex: 2;">${t.done}</button>
        </div>
      </div>
    `;

    const closeModal = () => modal.remove();
    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeModal));

    modal.querySelectorAll('.emoji-option-btn').forEach(b => {
      b.addEventListener('click', () => {
        selAvatar = b.dataset.avatar;
        modal.querySelectorAll('.emoji-option-btn').forEach(x => x.classList.toggle('is-selected', x === b));
        const prev = modal.querySelector('#quick-avatar-preview');
        if (prev) prev.textContent = selAvatar;
      });
    });

    modal.querySelectorAll('.color-swatch-btn').forEach(b => {
      b.addEventListener('click', () => {
        selColor = b.dataset.color;
        modal.querySelectorAll('.color-swatch-btn').forEach(x => x.classList.toggle('is-selected', x === b));
        const prev = modal.querySelector('#quick-avatar-preview');
        if (prev) {
          prev.style.borderColor = selColor;
          prev.style.background = `${selColor}22`;
        }
      });
    });

    modal.querySelector('#btn-quick-avatar-apply').addEventListener('click', () => {
      closeModal();
      if (onChosen) onChosen(selAvatar, selColor);
    });

    document.body.appendChild(modal);
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

        <div class="stats-players-grid" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem;">
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

        <div class="baseline-inputs-grid" style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
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
      <div class="modal-box modal-box-wide">
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

        <div class="edit-deal-players-grid" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
          ${session.players.map((p, idx) => `
            <div class="edit-deal-player-row" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
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
