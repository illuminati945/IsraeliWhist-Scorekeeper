/**
 * Sleek Leaderboard & Score History Table with iOS Springboard-Style Dynamic Slot-Shifting Reorder
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
    this.dragState = null;
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
    this.renderLeaderboard();
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

    let html = '';

    // iOS Jiggle Mode Action Bar
    if (this.isJiggleMode) {
      html += `
        <div class="jiggle-done-bar">
          <div style="font-size: 0.78rem; font-weight: 700; color: #fde68a; display: flex; align-items: center; gap: 5px;">
            <span>🪑</span>
            <span>${t.dragToReorder || 'Drag player cards to reorganize seats'}</span>
          </div>
          <button class="btn-pill btn-done-jiggle" style="height: 26px; font-size: 0.72rem; background: var(--accent-primary); border-color: var(--accent-primary); color: white; padding: 0 10px;">
            ${t.doneReordering || 'Done ✓'}
          </button>
        </div>
      `;
    }

    html += `
      <div class="leaderboard-grid ${this.isJiggleMode ? 'is-jiggling' : ''}">
        ${this.session.players.map((p, idx) => {
          const score = scores[idx];
          const rankIndex = rankings.findIndex(r => r.index === idx);
          const isLeader = (score === topScore && this.session.completedRounds.length > 0);
          const isDealer = (idx === currentDealer);

          return `
            <div class="player-card ${isLeader ? 'is-leader' : ''} ${isDealer ? 'is-dealer' : ''}" 
                 data-player-idx="${idx}" 
                 title="Long-press or drag to reorganize seating">
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
          `;
        }).join('')}
      </div>
    `;

    this.leaderboardContainer.innerHTML = html;
    this.bindLeaderboardEvents();
  }

  bindLeaderboardEvents() {
    if (!this.leaderboardContainer) return;

    const grid = this.leaderboardContainer.querySelector('.leaderboard-grid');
    const btnDone = this.leaderboardContainer.querySelector('.btn-done-jiggle');

    if (btnDone) {
      btnDone.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setJiggleMode(false);
      });
    }

    const cards = Array.from(this.leaderboardContainer.querySelectorAll('.player-card'));

    cards.forEach(card => {
      let pressTimer = null;
      let startX = 0;
      let startY = 0;
      let isDragging = false;
      let dragClone = null;
      let fromSlotIndex = null;
      let currentTargetSlotIndex = null;
      let initialSlotRects = [];

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
        
        // Build new order array
        const order = [0, 1, 2, 3];
        const [moved] = order.splice(fromSlotIndex, 1);
        order.splice(hoveredSlot, 0, moved);

        cards.forEach((c, originalSlot) => {
          c.classList.add('is-shifting');
          const targetSlot = order.indexOf(originalSlot);
          if (originalSlot === fromSlotIndex) {
            c.style.transform = 'scale(0.92)';
          } else {
            const originRect = initialSlotRects[originalSlot];
            const targetRect = initialSlotRects[targetSlot];
            if (originRect && targetRect) {
              const dx = targetRect.left - originRect.left;
              const dy = targetRect.top - originRect.top;
              c.style.transform = `translate(${dx}px, ${dy}px)`;
            }
          }
        });
      };

      const resetCardShifts = () => {
        cards.forEach(c => {
          c.classList.remove('is-shifting');
          c.style.transform = '';
        });
      };

      const startDragOperation = (clientX, clientY) => {
        isDragging = true;
        fromSlotIndex = parseInt(card.dataset.playerIdx, 10);
        currentTargetSlotIndex = fromSlotIndex;
        initialSlotRects = computeSlotPositions();

        if (grid) grid.classList.add('is-actively-dragging');
        card.classList.add('is-dragging');
        triggerHaptic([30, 50, 30]);

        const rect = card.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        // Create floating clone
        dragClone = card.cloneNode(true);
        dragClone.className = 'player-card drag-floating-clone';
        dragClone.style.width = `${rect.width}px`;
        dragClone.style.height = `${rect.height}px`;
        dragClone.style.left = `${clientX - offsetX}px`;
        dragClone.style.top = `${clientY - offsetY}px`;
        document.body.appendChild(dragClone);

        this.dragState = {
          offsetX,
          offsetY,
          dragClone,
          fromSlotIndex
        };
      };

      const onPointerMove = (e) => {
        if (!isDragging) {
          if (Math.abs(e.clientX - startX) > 8 || Math.abs(e.clientY - startY) > 8) {
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

        const clientX = e.clientX;
        const clientY = e.clientY;

        // Update floating clone position
        if (dragClone && this.dragState) {
          dragClone.style.left = `${clientX - this.dragState.offsetX}px`;
          dragClone.style.top = `${clientY - this.dragState.offsetY}px`;
        }

        // Find closest slot
        let closestSlot = fromSlotIndex;
        let minDistance = Infinity;

        initialSlotRects.forEach((rect, idx) => {
          const dist = Math.hypot(clientX - rect.centerX, clientY - rect.centerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestSlot = idx;
          }
        });

        if (closestSlot !== currentTargetSlotIndex) {
          currentTargetSlotIndex = closestSlot;
          triggerHaptic(15);
          applyLiveSlotShifts(currentTargetSlotIndex);
        }
      };

      const onPointerUp = (e) => {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        card.classList.remove('card-pressing');

        if (isDragging) {
          isDragging = false;
          if (grid) grid.classList.remove('is-actively-dragging');
          card.classList.remove('is-dragging');

          if (dragClone) {
            dragClone.remove();
            dragClone = null;
          }
          this.dragState = null;

          const targetSlot = currentTargetSlotIndex;
          resetCardShifts();

          if (fromSlotIndex !== null && targetSlot !== null && fromSlotIndex !== targetSlot) {
            triggerHaptic(30);
            const order = [0, 1, 2, 3];
            const [moved] = order.splice(fromSlotIndex, 1);
            order.splice(targetSlot, 0, moved);

            this.session.reorderPlayers(order);
            this.setJiggleMode(true);
            return;
          }

          this.renderLeaderboard();
        }

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
      };

      const onPointerDown = (e) => {
        if (this.dragState) return;

        startX = e.clientX;
        startY = e.clientY;
        card.classList.add('card-pressing');

        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        if (this.isJiggleMode) {
          e.preventDefault();
          startDragOperation(e.clientX, e.clientY);
        } else {
          pressTimer = setTimeout(() => {
            card.classList.remove('card-pressing');
            this.isJiggleMode = true;
            this.renderLeaderboard();
            startDragOperation(startX, startY);
          }, 380);
        }
      };

      card.addEventListener('pointerdown', onPointerDown);
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
