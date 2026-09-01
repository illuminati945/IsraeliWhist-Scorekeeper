/**
 * Sleek Leaderboard & Score History Table with Hardware-Accelerated iOS Springboard Reordering
 * (Robust single-pointer lock, no premature drops, and tap-outside dismissal)
 */
import { SUITS } from '../engine/whist-rules.js';

export class Scoreboard {
  constructor(session, leaderboardContainer, historyContainer, i18n, onUndo, onReorganizeSeating) {
    this.session = session;
    this.leaderboardContainer = leaderboardContainer;
    this.historyContainer = historyContainer;
    this.i18n = i18n;
    this.onUndo = onUndo;
    this.onReorganizeSeating = onReorganizeSeating;
    this.isJiggleMode = false;
    this.isDragging = false;

    // Global listener to dismiss jiggle mode on tapping outside (on pointerup to prevent drag conflicts)
    document.addEventListener('pointerup', (e) => {
      if (this.isJiggleMode && !this.isDragging) {
        if (!e.target.closest('.player-card')) {
          this.setJiggleMode(false);
        }
      }
    });

    this.render();
  }

  updateSession(session) {
    this.session = session;
    this.render();
  }

  updateI18n(i18n) {
    this.i18n = i18n;
    this.render();
  }

  setJiggleMode(active) {
    this.isJiggleMode = active;
    if (this.leaderboardContainer) {
      const grid = this.leaderboardContainer.querySelector('.leaderboard-grid');
      if (grid) {
        grid.classList.toggle('is-jiggling', active);
      }
    }
  }

  render() {
    this.renderLeaderboard();
    this.renderHistoryTable();
  }

  renderLeaderboard() {
    if (!this.leaderboardContainer) return;
    const t = this.i18n;
    const rankings = this.session.getRankings();
    const scores = this.session.getCumulativeScores();
    const topScore = rankings.length > 0 ? rankings[0].score : 0;
    const currentDealer = this.session.currentDealerIndex;

    let html = `
      <div class="leaderboard-grid ${this.isJiggleMode ? 'is-jiggling' : ''}">
        ${this.session.players.map((p, idx) => {
          const score = scores[idx];
          const rankIndex = rankings.findIndex(r => r.index === idx);
          const isLeader = (score === topScore && this.session.completedRounds.length > 0);
          const isDealer = (idx === currentDealer);

          return `
            <div class="player-card ${isLeader ? 'is-leader' : ''} ${isDealer ? 'is-dealer' : ''}" 
                 data-player-idx="${idx}" 
                 title="Long-press to lift and reorder seating">
              <div class="player-card-inner">
                ${isDealer ? `<span class="tag-dealer">${t.dealer.toUpperCase()}</span>` : ''}
                <div class="player-title">
                  <span class="player-dot" style="background: ${p.color};"></span>
                  <span>${p.name}</span>
                </div>
                <div class="player-score" style="color: ${score >= 0 ? 'var(--success)' : 'var(--danger)'};">
                  ${score >= 0 ? `+${score}` : score}
                </div>
                <div class="player-meta">
                  ${t.rank} #${rankIndex + 1}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.leaderboardContainer.innerHTML = html;
    this.bindLeaderboardEvents();
  }

  bindLeaderboardEvents() {
    if (!this.leaderboardContainer) return;

    const cards = Array.from(this.leaderboardContainer.querySelectorAll('.player-card'));

    cards.forEach(card => {
      let pressTimer = null;
      let startX = 0;
      let startY = 0;
      let currentX = 0;
      let currentY = 0;
      let lastX = 0;
      let currentTilt = 0;
      let targetTilt = 0;
      let isCardDragging = false;
      let fromSlotIndex = null;
      let currentTargetSlotIndex = null;
      let initialSlotRects = [];
      let activePointerId = null;
      let rafId = null;

      const triggerHaptic = (pattern = 25) => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(pattern); } catch (e) {}
        }
      };

      const computeSlotPositions = () => {
        return cards.map(c => {
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
        if (hoveredSlot === null || hoveredSlot === undefined) return;
        
        const order = [0, 1, 2, 3];
        const [moved] = order.splice(fromSlotIndex, 1);
        order.splice(hoveredSlot, 0, moved);

        cards.forEach((c, originalSlot) => {
          if (originalSlot === fromSlotIndex) return;

          const targetSlot = order.indexOf(originalSlot);
          const originRect = initialSlotRects[originalSlot];
          const targetRect = initialSlotRects[targetSlot];

          if (originRect && targetRect) {
            const dx = targetRect.left - originRect.left;
            const dy = targetRect.top - originRect.top;
            c.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
          }
        });
      };

      const resetCardShifts = () => {
        cards.forEach(c => {
          c.style.transform = '';
          c.style.zIndex = '';
        });
      };

      const updateDragLoop = () => {
        if (!isCardDragging) return;

        const dx = currentX - startX;
        const dy = currentY - startY;

        // Smooth tilt damping
        currentTilt += (targetTilt - currentTilt) * 0.18;

        card.style.transform = `translate3d(${dx}px, ${dy - 8}px, 0) scale(1.12) rotate(${currentTilt.toFixed(2)}deg)`;

        // Calculate card center
        const originSlot = initialSlotRects[fromSlotIndex];
        const cardCenterX = originSlot.centerX + dx;
        const cardCenterY = originSlot.centerY + dy;

        // Find closest slot with deliberate hysteresis threshold
        let bestSlot = currentTargetSlotIndex;
        let minScore = Infinity;

        initialSlotRects.forEach((rect, idx) => {
          const dist = Math.hypot(cardCenterX - rect.centerX, cardCenterY - rect.centerY);
          const bias = (idx === currentTargetSlotIndex) ? 0.75 : 1.0;
          const score = dist * bias;
          if (score < minScore) {
            minScore = score;
            bestSlot = idx;
          }
        });

        if (bestSlot !== currentTargetSlotIndex) {
          currentTargetSlotIndex = bestSlot;
          triggerHaptic(18);
          applyLiveSlotShifts(currentTargetSlotIndex);
        }

        rafId = requestAnimationFrame(updateDragLoop);
      };

      const liftAndStartDrag = (clientX, clientY) => {
        if (this.isDragging) return;
        this.isDragging = true;
        isCardDragging = true;
        fromSlotIndex = parseInt(card.dataset.playerIdx, 10);
        currentTargetSlotIndex = fromSlotIndex;
        initialSlotRects = computeSlotPositions();

        this.setJiggleMode(true);

        card.classList.remove('card-pressing');
        card.classList.add('is-lifted');
        card.style.zIndex = '500';
        triggerHaptic([40, 60, 40]);

        currentX = clientX;
        currentY = clientY;
        lastX = clientX;
        currentTilt = 0;
        targetTilt = 0;

        card.style.transform = `translate3d(${clientX - startX}px, ${clientY - startY - 8}px, 0) scale(1.12)`;

        rafId = requestAnimationFrame(updateDragLoop);
      };

      const onPointerMove = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;

        const clientX = e.clientX;
        const clientY = e.clientY;

        if (!isCardDragging) {
          if (Math.abs(clientX - startX) > 10 || Math.abs(clientY - startY) > 10) {
            if (pressTimer) {
              clearTimeout(pressTimer);
              pressTimer = null;
            }
            card.classList.remove('card-pressing');
          }
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        currentX = clientX;
        currentY = clientY;

        const vx = clientX - lastX;
        lastX = clientX;
        targetTilt = Math.max(-7, Math.min(7, vx * 0.4));
      };

      const onPointerUp = (e) => {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;

        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        card.classList.remove('card-pressing');
        activePointerId = null;

        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }

        if (isCardDragging) {
          isCardDragging = false;
          this.isDragging = false;

          const targetSlot = currentTargetSlotIndex;
          const originRect = initialSlotRects[fromSlotIndex];
          const targetRect = initialSlotRects[targetSlot];

          if (originRect && targetRect) {
            const finalDx = targetRect.left - originRect.left;
            const finalDy = targetRect.top - originRect.top;

            card.classList.add('is-dropping');
            card.style.transform = `translate3d(${finalDx}px, ${finalDy}px, 0) scale(1.0) rotate(0deg)`;

            setTimeout(() => {
              card.classList.remove('is-lifted', 'is-dropping');
              card.style.transform = '';
              resetCardShifts();

              if (fromSlotIndex !== null && targetSlot !== null && fromSlotIndex !== targetSlot) {
                triggerHaptic(30);
                const order = [0, 1, 2, 3];
                const [moved] = order.splice(fromSlotIndex, 1);
                order.splice(targetSlot, 0, moved);

                this.session.reorderPlayers(order);
                this.renderLeaderboard();
              } else {
                this.renderLeaderboard();
              }
            }, 340);
          } else {
            card.classList.remove('is-lifted');
            resetCardShifts();
            this.renderLeaderboard();
          }
        }

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
      };

      const onPointerDown = (e) => {
        if (this.isDragging) return;

        activePointerId = e.pointerId;
        startX = e.clientX;
        startY = e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;
        lastX = e.clientX;
        card.classList.add('card-pressing');

        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        if (this.isJiggleMode) {
          liftAndStartDrag(startX, startY);
        } else {
          // Automatic lift-off on hold (~260ms)
          pressTimer = setTimeout(() => {
            liftAndStartDrag(startX, startY);
          }, 260);
        }
      };

      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('contextmenu', (e) => e.preventDefault());
    });
  }

  renderHistoryTable() {
    if (!this.historyContainer) return;
    const t = this.i18n;
    const rounds = this.session.completedRounds;

    if (rounds.length === 0) {
      this.historyContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem;">${t.noDeals}</div>
          <div style="font-size: 0.85rem;">${t.noDealsSub}</div>
        </div>
      `;
      return;
    }

    let html = `
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${t.historyTitle} (${rounds.length} ${t.deals})</h3>
          <button class="btn-pill" id="btn-undo-round" style="font-size: 0.72rem; color: var(--danger); height: 28px;">
            ${t.undoLastDeal}
          </button>
        </div>

        <div class="table-wrap">
          <table class="table-custom">
            <thead>
              <tr>
                <th style="min-width: 60px;">${t.deal}</th>
                <th style="min-width: 95px;">${t.dealer}</th>
                ${this.session.players.map(p => `
                  <th style="min-width: 85px;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 3px;">
                      <span class="player-dot" style="background: ${p.color};"></span>
                      <span>${p.name}</span>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rounds.map((r, rIdx) => {
                const dealer = this.session.players[r.dealerIndex];
                return `
                  <tr>
                    <td style="font-weight: 700;">#${r.roundNumber}</td>
                    <td>
                      <div style="display: flex; align-items: center; justify-content: center; gap: 4px; white-space: nowrap;">
                        <span class="player-dot" style="background: ${dealer.color};"></span>
                        <span style="font-weight: 600;">${dealer.name}</span>
                      </div>
                    </td>
                    ${this.session.players.map((p, pIdx) => {
                      const res = r.results.find(res => res.playerIndex === pIdx);
                      if (!res) return `<td>—</td>`;
                      const scoreDelta = res.score >= 0 ? `+${res.score}` : res.score;
                      const isExact = res.made;
                      const cum = r.cumulativeScores ? r.cumulativeScores[pIdx] : '—';

                      return `
                        <td>
                          <div style="font-size: 0.72rem; color: var(--text-muted);">
                            B:${res.bid} / T:${res.tricks}
                          </div>
                          <div style="font-weight: 800; color: ${isExact ? 'var(--success)' : 'var(--danger)'};">
                            ${scoreDelta}
                          </div>
                          <div style="font-size: 0.68rem; color: var(--text-secondary);">
                            (${cum})
                          </div>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `;
              }).reverse().join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.historyContainer.innerHTML = html;

    const btnUndo = this.historyContainer.querySelector('#btn-undo-round');
    if (btnUndo) {
      btnUndo.addEventListener('click', () => {
        if (confirm(t.undoConfirm)) {
          if (this.onUndo) this.onUndo();
        }
      });
    }
  }
}
