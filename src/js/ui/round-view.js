/**
 * Interactive Round Wizard & Betting Pad Component
 */
import { SUITS, calculatePlayerScore, validateBetsHook, validateTricksSum } from '../engine/whist-rules.js';

export class RoundView {
  constructor(session, container, i18n, onRoundComplete) {
    this.session = session;
    this.container = container;
    this.i18n = i18n;
    this.onRoundComplete = onRoundComplete;
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

  render() {
    if (!this.container) return;
    const round = this.session.activeRound;
    const stage = round.stage;

    let html = `
      <div class="glass-card">
        <div class="stage-stepper">
          <div class="stage-badge">
            ${stage === 'TRUMP' ? this.i18n.stageTrump : 
              stage === 'BETS' ? this.i18n.stageBets : 
              stage === 'TRICKS' ? this.i18n.stageTricks : this.i18n.stageSummary}
          </div>
          <div class="round-indicator">
            ${this.i18n.round} #${this.session.roundNumber}
          </div>
        </div>
    `;

    if (stage === 'TRUMP') {
      html += this.renderTrumpStage(round);
    } else if (stage === 'BETS') {
      html += this.renderBetsStage(round);
    } else if (stage === 'TRICKS') {
      html += this.renderTricksStage(round);
    }

    html += `</div>`;
    this.container.innerHTML = html;
    this.bindEvents(stage);
  }

  renderTrumpStage(round) {
    const dealer = this.session.players[round.dealerIndex];
    const leadBidder = this.session.players[round.leadBidderIndex];

    return `
      <div style="margin-bottom: 1rem;">
        <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
          🎴 ${this.i18n.dealer}: <strong>${dealer.name}</strong> | 🎯 Leads Bidding: <strong>${leadBidder.name}</strong>
        </div>
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">
          ${this.i18n.whoWonTrump}
        </h3>

        <!-- Player select -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 1.25rem;">
          ${this.session.players.map((p, idx) => `
            <button class="btn-secondary trump-player-btn ${round.trump.winnerIndex === idx ? 'active' : ''}" 
                    data-player-idx="${idx}"
                    style="${round.trump.winnerIndex === idx ? 'border-color: var(--accent-primary); background: var(--accent-primary); color: white;' : ''}">
              <span style="font-size: 1.2rem;">${p.avatar}</span>
              <span>${p.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Suit Select -->
        <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
          ${this.i18n.selectSuit}
        </h4>
        <div class="suit-grid">
          ${SUITS.map(s => `
            <button class="suit-btn ${round.trump.suitId === s.id && !round.trump.isPasRound ? 'active' : ''}" data-suit-id="${s.id}">
              <span class="suit-symbol" style="color: ${round.trump.suitId === s.id ? '#ffffff' : s.color}">${s.symbol}</span>
              <span style="font-size: 0.7rem; font-weight: 600;">${this.i18n === 'he' ? s.nameHe : s.nameEn}</span>
            </button>
          `).join('')}
        </div>

        <!-- Bid Amount Stepper (5-13) -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin: 1.25rem 0; padding: 0.75rem; background: rgba(15, 23, 42, 0.4); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
          <span style="font-weight: 600; font-size: 0.95rem;">${this.i18n.winningBid}</span>
          <div class="stepper-control">
            <button class="stepper-btn" id="btn-trump-bid-dec" ${round.trump.bidAmount <= 5 ? 'disabled' : ''}>-</button>
            <span class="stepper-value" id="trump-bid-val">${round.trump.bidAmount}</span>
            <button class="stepper-btn" id="btn-trump-bid-inc" ${round.trump.bidAmount >= 13 ? 'disabled' : ''}>+</button>
          </div>
        </div>

        <!-- Pas Option -->
        <div style="margin: 1rem 0; padding: 0.75rem; background: rgba(239, 68, 68, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.3);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-pas-round" ${round.trump.isPasRound ? 'checked' : ''} style="width: 18px; height: 18px;">
            <span style="font-weight: 700; color: #fca5a5;">${this.i18n.allPassed}</span>
          </label>
        </div>

        <button class="btn-primary" id="btn-confirm-trump" ${round.trump.winnerIndex === null && !round.trump.isPasRound ? 'disabled' : ''}>
          <span>${this.i18n.saveTrumpProceed}</span>
          <span>➔</span>
        </button>
      </div>
    `;
  }

  renderBetsStage(round) {
    const forbidden = this.session.getDealerForbiddenNumber();
    const hook = validateBetsHook(round.bets);
    const sum = round.bets.reduce((a, b) => a + (typeof b === 'number' && !isNaN(b) ? b : 0), 0);
    const trumpSuit = SUITS.find(s => s.id === round.trump.suitId) || SUITS[0];
    const trumpWinner = round.trump.winnerIndex !== null ? this.session.players[round.trump.winnerIndex] : null;

    return `
      <div>
        <!-- Trump Reminder Banner -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-md); padding: 0.6rem 0.85rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.3rem; color: ${trumpSuit.color};">${round.trump.isPasRound ? '🚫' : trumpSuit.symbol}</span>
            <span style="font-size: 0.85rem; font-weight: 600;">
              ${round.trump.isPasRound ? 'Pas Round (פאס)' : `${trumpWinner ? trumpWinner.name : ''} (${round.trump.bidAmount} ${trumpSuit.symbol})`}
            </span>
          </div>
          <button class="btn-secondary" id="btn-back-to-trump" style="padding: 3px 8px; font-size: 0.75rem; width: auto;">
            ✏️ Edit Trump
          </button>
        </div>

        <!-- Hook Status Banner -->
        <div class="hook-status-bar ${hook.status}">
          <div>
            <span>${this.i18n.currentSum} <strong>${sum}</strong></span>
            <span style="margin-inline-start: 0.5rem; font-size: 0.85rem;">
              (${hook.status === 'OVER' ? this.i18n.overContract : 
                hook.status === 'UNDER' ? this.i18n.underContract : this.i18n.balancedViolation})
            </span>
          </div>
          ${forbidden !== null ? `
            <div style="font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: var(--radius-full);">
              ${this.i18n.dealerForbidden} <strong>${forbidden}</strong>
            </div>
          ` : ''}
        </div>

        <!-- 4 Players Betting Cards -->
        <div class="players-input-list">
          ${this.session.players.map((p, idx) => {
            const isDealer = (idx === round.dealerIndex);
            const isTrump = (idx === round.trump.winnerIndex);
            const currentBet = round.bets[idx];
            const isForbiddenForThisPlayer = isDealer && (forbidden !== null);

            return `
              <div class="player-input-row ${isDealer ? 'highlight-dealer' : ''}">
                <div class="player-info-meta">
                  <span style="font-size: 1.4rem;">${p.avatar}</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 4px;">
                      ${p.name}
                      ${isDealer ? `<span class="dealer-tag" style="position:static;">${this.i18n.dealer}</span>` : ''}
                      ${isTrump ? `<span style="font-size: 0.7rem; background:#fbbf24; color:#000; font-weight:800; padding:1px 5px; border-radius:4px;">👑 ${round.trump.bidAmount}+</span>` : ''}
                    </div>
                    <div class="quick-chip-grid">
                      ${[0, 1, 2, 3, 4, 5, 6, 7].map(n => `
                        <button class="chip-btn ${currentBet === n ? 'active' : ''} ${isDealer && forbidden === n ? 'forbidden' : ''}" 
                                data-player-idx="${idx}" data-amount="${n}">
                          ${n === 0 ? 'Pass (0)' : n}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="stepper-control">
                  <button class="stepper-btn btn-bet-dec" data-player-idx="${idx}" ${currentBet === null || currentBet <= 0 ? 'disabled' : ''}>-</button>
                  <span class="stepper-value">${currentBet !== null ? currentBet : '-'}</span>
                  <button class="stepper-btn btn-bet-inc" data-player-idx="${idx}" ${currentBet >= 13 ? 'disabled' : ''}>+</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn-primary" id="btn-proceed-to-tricks" ${!hook.isValid || round.bets.some(b => b === null) ? 'disabled' : ''}>
          <span>${this.i18n.proceedToPlay}</span>
          <span>➔</span>
        </button>
      </div>
    `;
  }

  renderTricksStage(round) {
    const tricks = round.tricks;
    const sumTricks = tricks.reduce((a, b) => a + (typeof b === 'number' && !isNaN(b) ? b : 0), 0);
    const isValidSum = (sumTricks === 13 && tricks.every(t => typeof t === 'number' && !isNaN(t)));
    const remaining = 13 - sumTricks;

    return `
      <div>
        <!-- Tricks Remaining Status Banner -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: ${isValidSum ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; border: 1px solid ${isValidSum ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}; border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1rem;">
          <div>
            <span style="font-weight: 700; font-size: 0.95rem; color: ${isValidSum ? '#6ee7b7' : '#fcd34d'};">
              ${isValidSum ? `✓ ${this.i18n.tricksSumValid}` : `${this.i18n.tricksRemaining} ${remaining}`}
            </span>
          </div>
          <button class="btn-secondary" id="btn-auto-fill-tricks" style="padding: 4px 10px; font-size: 0.8rem; width: auto;">
            ⚡ ${this.i18n.autoFillLast}
          </button>
        </div>

        <!-- 4 Players Tricks Input Cards -->
        <div class="players-input-list">
          ${this.session.players.map((p, idx) => {
            const bet = round.bets[idx];
            const actual = tricks[idx];
            const isMatch = (actual !== null && bet !== null && actual === bet);

            return `
              <div class="player-input-row" style="${isMatch ? 'border-color: rgba(16, 185, 129, 0.5); background: rgba(16, 185, 129, 0.05);' : ''}">
                <div class="player-info-meta">
                  <span style="font-size: 1.4rem;">${p.avatar}</span>
                  <div>
                    <div style="font-weight: 700; font-size: 0.95rem;">
                      ${p.name}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                      ${this.i18n.bid}: <strong>${round.trump.isPasRound ? 'Pas' : (bet !== null ? bet : '-')}</strong>
                      ${isMatch ? '<span style="color: #10b981; margin-inline-start: 4px; font-weight:700;">✓ Exact</span>' : ''}
                    </div>
                    <div class="quick-chip-grid">
                      ${[0, 1, 2, 3, 4, 5, 6, 7].map(n => `
                        <button class="chip-btn ${actual === n ? 'active' : ''}" 
                                data-trick-player-idx="${idx}" data-amount="${n}">
                          ${n}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <div class="stepper-control">
                  <button class="stepper-btn btn-trick-dec" data-player-idx="${idx}" ${actual === null || actual <= 0 ? 'disabled' : ''}>-</button>
                  <span class="stepper-value">${actual !== null ? actual : '-'}</span>
                  <button class="stepper-btn btn-trick-inc" data-player-idx="${idx}" ${actual >= 13 ? 'disabled' : ''}>+</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Live Score Calculation Preview if 13 tricks entered -->
        ${isValidSum ? this.renderScorePreview(round) : ''}

        <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
          <button class="btn-secondary" id="btn-back-to-bets" style="flex: 1;">
            ⬅️ Edit Bets
          </button>
          <button class="btn-primary" id="btn-commit-round" style="flex: 2;" ${!isValidSum ? 'disabled' : ''}>
            <span>${this.i18n.calculateAndCommit}</span>
            <span>✓</span>
          </button>
        </div>
      </div>
    `;
  }

  renderScorePreview(round) {
    const totalBets = round.bets.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    const isPas = round.trump.isPasRound;

    return `
      <div class="score-breakdown-card" style="margin-top: 1rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.6rem;">
          📊 ${this.i18n.stageSummary}
        </h4>
        ${this.session.players.map((p, idx) => {
          const calc = calculatePlayerScore(
            isPas ? 0 : round.bets[idx],
            round.tricks[idx],
            idx === round.trump.winnerIndex,
            isPas,
            this.session.rules,
            totalBets
          );

          return `
            <div class="breakdown-row">
              <div>
                <span class="breakdown-player">${p.name}</span>
                <div class="breakdown-detail">${this.i18n === 'he' ? calc.explanationHe : calc.explanation}</div>
              </div>
              <span class="score-delta-badge ${calc.score >= 0 ? 'positive' : 'negative'}">
                ${calc.score >= 0 ? `+${calc.score}` : calc.score}
              </span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  bindEvents(stage) {
    if (stage === 'TRUMP') {
      // Trump player buttons
      this.container.querySelectorAll('.trump-player-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.playerIdx, 10);
          this.session.activeRound.trump.winnerIndex = idx;
          this.session.activeRound.trump.isPasRound = false;
          this.render();
        });
      });

      // Suit buttons
      this.container.querySelectorAll('.suit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const suitId = btn.dataset.suitId;
          this.session.activeRound.trump.suitId = suitId;
          this.session.activeRound.trump.isPasRound = false;
          this.render();
        });
      });

      // Trump bid stepper
      const btnDec = this.container.querySelector('#btn-trump-bid-dec');
      const btnInc = this.container.querySelector('#btn-trump-bid-inc');
      if (btnDec) {
        btnDec.addEventListener('click', () => {
          if (this.session.activeRound.trump.bidAmount > 5) {
            this.session.activeRound.trump.bidAmount--;
            this.render();
          }
        });
      }
      if (btnInc) {
        btnInc.addEventListener('click', () => {
          if (this.session.activeRound.trump.bidAmount < 13) {
            this.session.activeRound.trump.bidAmount++;
            this.render();
          }
        });
      }

      // Pas round checkbox
      const chkPas = this.container.querySelector('#chk-pas-round');
      if (chkPas) {
        chkPas.addEventListener('change', (e) => {
          this.session.activeRound.trump.isPasRound = e.target.checked;
          if (e.target.checked) {
            this.session.activeRound.trump.winnerIndex = null;
          }
          this.render();
        });
      }

      // Confirm Trump
      const btnConfirm = this.container.querySelector('#btn-confirm-trump');
      if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
          const t = this.session.activeRound.trump;
          this.session.setTrump(t.winnerIndex, t.suitId, t.bidAmount, t.isPasRound);
          this.render();
        });
      }
    } else if (stage === 'BETS') {
      // Quick chips
      this.container.querySelectorAll('.chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const amount = parseInt(btn.dataset.amount, 10);
          this.session.setBet(pIdx, amount);
          this.render();
        });
      });

      // Stepper inc/dec
      this.container.querySelectorAll('.btn-bet-dec').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.bets[pIdx] || 0;
          if (cur > 0) {
            this.session.setBet(pIdx, cur - 1);
            this.render();
          }
        });
      });

      this.container.querySelectorAll('.btn-bet-inc').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.bets[pIdx] ?? -1;
          if (cur < 13) {
            this.session.setBet(pIdx, cur + 1);
            this.render();
          }
        });
      });

      // Back to Trump
      const btnBack = this.container.querySelector('#btn-back-to-trump');
      if (btnBack) {
        btnBack.addEventListener('click', () => {
          this.session.activeRound.stage = 'TRUMP';
          this.render();
        });
      }

      // Proceed to Tricks
      const btnProceed = this.container.querySelector('#btn-proceed-to-tricks');
      if (btnProceed) {
        btnProceed.addEventListener('click', () => {
          try {
            this.session.proceedToTricks();
            this.render();
          } catch (e) {
            alert(e.message);
          }
        });
      }
    } else if (stage === 'TRICKS') {
      // Quick trick chips
      this.container.querySelectorAll('.chip-btn[data-trick-player-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.trickPlayerIdx, 10);
          const amount = parseInt(btn.dataset.amount, 10);
          this.session.setTricks(pIdx, amount);
          this.render();
        });
      });

      // Trick steppers
      this.container.querySelectorAll('.btn-trick-dec').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.tricks[pIdx] || 0;
          if (cur > 0) {
            this.session.setTricks(pIdx, cur - 1);
            this.render();
          }
        });
      });

      this.container.querySelectorAll('.btn-trick-inc').forEach(btn => {
        btn.addEventListener('click', () => {
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.tricks[pIdx] ?? -1;
          if (cur < 13) {
            this.session.setTricks(pIdx, cur + 1);
            this.render();
          }
        });
      });

      // Auto-fill remainder
      const btnAuto = this.container.querySelector('#btn-auto-fill-tricks');
      if (btnAuto) {
        btnAuto.addEventListener('click', () => {
          const success = this.session.autoFillLastPlayerTricks();
          if (success) this.render();
          else alert('Please enter tricks for at least 3 players first.');
        });
      }

      // Back to Bets
      const btnBackBets = this.container.querySelector('#btn-back-to-bets');
      if (btnBackBets) {
        btnBackBets.addEventListener('click', () => {
          this.session.activeRound.stage = 'BETS';
          this.render();
        });
      }

      // Commit Round
      const btnCommit = this.container.querySelector('#btn-commit-round');
      if (btnCommit) {
        btnCommit.addEventListener('click', () => {
          try {
            this.session.commitRound();
            if (this.onRoundComplete) {
              this.onRoundComplete();
            }
            this.render();
          } catch (e) {
            alert(e.message);
          }
        });
      }
    }
  }
}
