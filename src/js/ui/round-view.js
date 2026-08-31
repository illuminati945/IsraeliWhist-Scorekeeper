/**
 * Mobile-First Sleek Round Wizard & Quick Betting Pad
 */
import { SUITS, calculatePlayerScore, validateBetsHook, validateTricksSum } from '../engine/whist-rules.js';

function triggerHaptic() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(8); } catch (e) {}
  }
}

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
      <div class="card">
        <div class="stage-header">
          <div class="stage-title">
            ${stage === 'TRUMP' ? '1. Trump Auction' : 
              stage === 'BETS' ? '2. Player Bids' : 
              stage === 'TRICKS' ? '3. Actual Tricks' : '4. Round Summary'}
          </div>
          <div class="round-pill">
            Deal #${this.session.roundNumber}
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
      <div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.85rem; display: flex; justify-content: space-between;">
          <span>Dealer: <strong>${dealer.name}</strong></span>
          <span>Lead: <strong>${leadBidder.name}</strong></span>
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">
          1. Auction Winner
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem; margin-bottom: 0.85rem;">
          ${this.session.players.map((p, idx) => `
            <button class="btn-outline trump-player-btn ${round.trump.winnerIndex === idx ? 'active' : ''}" 
                    data-player-idx="${idx}"
                    style="${round.trump.winnerIndex === idx ? 'border-color: var(--accent-primary); background: var(--accent-primary); color: white;' : ''}">
              <span class="player-dot" style="background: ${p.color};"></span>
              <span>${p.name}</span>
            </button>
          `).join('')}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">
          2. Denomination / Suit
        </div>

        <div class="suits-row">
          ${SUITS.map(s => `
            <div class="suit-option ${round.trump.suitId === s.id && !round.trump.isPasRound ? 'active' : ''}" data-suit-id="${s.id}">
              <span class="suit-symbol" style="color: ${round.trump.suitId === s.id ? '#ffffff' : s.color}">${s.symbol}</span>
              <span class="suit-label">${s.nameEn}</span>
            </div>
          `).join('')}
        </div>

        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.35rem;">
          3. Winning Target (Tricks)
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.3rem; margin-bottom: 1rem;">
          ${[5, 6, 7, 8, 9, 10, 11, 12, 13].map(n => `
            <button class="chip ${round.trump.bidAmount === n && !round.trump.isPasRound ? 'active' : ''} trump-target-chip" data-amount="${n}">
              ${n}
            </button>
          `).join('')}
        </div>

        <div style="margin-bottom: 1rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
            <input type="checkbox" id="chk-pas-round" ${round.trump.isPasRound ? 'checked' : ''} style="width: 18px; height: 18px;">
            <span style="font-size: 0.85rem; font-weight: 600;">All 4 Passed (Pas Round)</span>
          </label>
        </div>

        <button class="btn-block" id="btn-confirm-trump" ${round.trump.winnerIndex === null && !round.trump.isPasRound ? 'disabled' : ''}>
          Confirm Trump & Enter Bids →
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
        <!-- Sticky Subheader -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; font-weight: 600;">
            ${round.trump.isPasRound ? 'Pas Round (No Trump)' : `Trump: <strong>${trumpWinner ? trumpWinner.name : ''}</strong> (${round.trump.bidAmount} ${trumpSuit.symbol})`}
          </div>
          <button class="btn-nav" id="btn-back-to-trump" style="font-size: 0.75rem; min-height: 28px; padding: 2px 8px;">Edit</button>
        </div>

        <!-- Hook Banner -->
        <div class="hook-banner ${hook.status}">
          <div>
            <span>Total: <strong>${sum}</strong></span>
            <span style="margin-left: 4px; opacity: 0.85;">
              (${hook.status === 'OVER' ? 'Over' : hook.status === 'UNDER' ? 'Under' : 'Equal 13'})
            </span>
          </div>
          ${forbidden !== null ? `
            <span style="font-size: 0.78rem; background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: var(--radius-sm);">
              Dealer cannot bid <strong>${forbidden}</strong>
            </span>
          ` : ''}
        </div>

        <!-- Player Input Cards -->
        ${this.session.players.map((p, idx) => {
          const isDealer = (idx === round.dealerIndex);
          const isTrump = (idx === round.trump.winnerIndex);
          const currentBet = round.bets[idx];

          return `
            <div class="input-row ${isDealer ? 'dealer-row' : ''}">
              <div class="input-row-header">
                <div class="input-row-name">
                  <span class="player-dot" style="background: ${p.color};"></span>
                  <span>${p.name}</span>
                  ${isDealer ? `<span class="tag-dealer" style="position:static;">DEALER</span>` : ''}
                  ${isTrump ? `<span style="font-size: 0.68rem; background: #fbbf24; color: black; padding: 1px 5px; border-radius: 4px; font-weight: 800;">Target ${round.trump.bidAmount}+</span>` : ''}
                </div>
                
                <div class="stepper">
                  <button class="stepper-btn btn-bet-dec" data-player-idx="${idx}" ${currentBet === null || currentBet <= 0 ? 'disabled' : ''}>−</button>
                  <span class="stepper-val">${currentBet !== null ? currentBet : '—'}</span>
                  <button class="stepper-btn btn-bet-inc" data-player-idx="${idx}" ${currentBet >= 13 ? 'disabled' : ''}>+</button>
                </div>
              </div>

              <div class="chips-row">
                ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => `
                  <button class="chip ${currentBet === n ? 'active' : ''} ${isDealer && forbidden === n ? 'forbidden' : ''}" 
                          data-player-idx="${idx}" data-amount="${n}">
                    ${n === 0 ? '0' : n}
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}

        <button class="btn-block" id="btn-proceed-to-tricks" ${!hook.isValid || round.bets.some(b => b === null) ? 'disabled' : ''} style="margin-top: 0.5rem;">
          Confirm Bids & Play Round →
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
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: ${isValidSum ? 'var(--success)' : 'var(--warning)'};">
            ${isValidSum ? '✓ 13 Tricks Total (Valid)' : `Remaining to Assign: ${remaining}`}
          </div>
          <button class="btn-nav" id="btn-auto-fill-tricks" style="font-size: 0.75rem; min-height: 28px; padding: 2px 8px;">
            Auto-Fill
          </button>
        </div>

        ${this.session.players.map((p, idx) => {
          const bet = round.bets[idx];
          const actual = tricks[idx];
          const isMatch = (actual !== null && bet !== null && actual === bet);

          return `
            <div class="input-row" style="${isMatch ? 'border-color: rgba(16, 185, 129, 0.4);' : ''}">
              <div class="input-row-header">
                <div class="input-row-name">
                  <span class="player-dot" style="background: ${p.color};"></span>
                  <span>${p.name}</span>
                  <span class="input-row-sub">
                    (Bid: <strong>${round.trump.isPasRound ? 'Pas' : (bet !== null ? bet : '—')}</strong>)
                  </span>
                  ${isMatch ? `<span style="color: var(--success); font-size: 0.72rem; font-weight: 700; margin-left: 2px;">✓ Exact</span>` : ''}
                </div>

                <div class="stepper">
                  <button class="stepper-btn btn-trick-dec" data-player-idx="${idx}" ${actual === null || actual <= 0 ? 'disabled' : ''}>−</button>
                  <span class="stepper-val">${actual !== null ? actual : '—'}</span>
                  <button class="stepper-btn btn-trick-inc" data-player-idx="${idx}" ${actual >= 13 ? 'disabled' : ''}>+</button>
                </div>
              </div>

              <div class="chips-row">
                ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => `
                  <button class="chip ${actual === n ? 'active' : ''}" 
                          data-trick-player-idx="${idx}" data-amount="${n}">
                    ${n}
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}

        ${isValidSum ? this.renderScorePreview(round) : ''}

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline" id="btn-back-to-bets" style="flex: 1;">
            ← Edit Bids
          </button>
          <button class="btn-block" id="btn-commit-round" style="flex: 2;" ${!isValidSum ? 'disabled' : ''}>
            Next Round ✓
          </button>
        </div>
      </div>
    `;
  }

  renderScorePreview(round) {
    const totalBets = round.bets.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    const isPas = round.trump.isPasRound;

    return `
      <div class="breakdown-box">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          Score Calculation Preview
        </div>
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
            <div class="breakdown-item">
              <div>
                <div style="font-size: 0.82rem; font-weight: 700;">${p.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-secondary);">${calc.explanation}</div>
              </div>
              <span class="score-badge ${calc.score >= 0 ? 'plus' : 'minus'}">
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
      this.container.querySelectorAll('.trump-player-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
          const idx = parseInt(btn.dataset.playerIdx, 10);
          this.session.activeRound.trump.winnerIndex = idx;
          this.session.activeRound.trump.isPasRound = false;
          this.render();
        });
      });

      this.container.querySelectorAll('.suit-option').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
          const suitId = btn.dataset.suitId;
          this.session.activeRound.trump.suitId = suitId;
          this.session.activeRound.trump.isPasRound = false;
          this.render();
        });
      });

      this.container.querySelectorAll('.trump-target-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
          this.session.activeRound.trump.bidAmount = parseInt(btn.dataset.amount, 10);
          this.session.activeRound.trump.isPasRound = false;
          this.render();
        });
      });

      const chkPas = this.container.querySelector('#chk-pas-round');
      if (chkPas) {
        chkPas.addEventListener('change', (e) => {
          triggerHaptic();
          this.session.activeRound.trump.isPasRound = e.target.checked;
          if (e.target.checked) {
            this.session.activeRound.trump.winnerIndex = null;
          }
          this.render();
        });
      }

      const btnConfirm = this.container.querySelector('#btn-confirm-trump');
      if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
          triggerHaptic();
          const t = this.session.activeRound.trump;
          this.session.setTrump(t.winnerIndex, t.suitId, t.bidAmount, t.isPasRound);
          this.render();
        });
      }
    } else if (stage === 'BETS') {
      this.container.querySelectorAll('.chip[data-player-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const amount = parseInt(btn.dataset.amount, 10);
          this.session.setBet(pIdx, amount);
          this.render();
        });
      });

      this.container.querySelectorAll('.btn-bet-dec').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
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
          triggerHaptic();
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.bets[pIdx] ?? -1;
          if (cur < 13) {
            this.session.setBet(pIdx, cur + 1);
            this.render();
          }
        });
      });

      const btnBack = this.container.querySelector('#btn-back-to-trump');
      if (btnBack) {
        btnBack.addEventListener('click', () => {
          triggerHaptic();
          this.session.activeRound.stage = 'TRUMP';
          this.render();
        });
      }

      const btnProceed = this.container.querySelector('#btn-proceed-to-tricks');
      if (btnProceed) {
        btnProceed.addEventListener('click', () => {
          triggerHaptic();
          try {
            this.session.proceedToTricks();
            this.render();
          } catch (e) {
            alert(e.message);
          }
        });
      }
    } else if (stage === 'TRICKS') {
      this.container.querySelectorAll('.chip[data-trick-player-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
          const pIdx = parseInt(btn.dataset.trickPlayerIdx, 10);
          const amount = parseInt(btn.dataset.amount, 10);
          this.session.setTricks(pIdx, amount);
          this.render();
        });
      });

      this.container.querySelectorAll('.btn-trick-dec').forEach(btn => {
        btn.addEventListener('click', () => {
          triggerHaptic();
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
          triggerHaptic();
          const pIdx = parseInt(btn.dataset.playerIdx, 10);
          const cur = this.session.activeRound.tricks[pIdx] ?? -1;
          if (cur < 13) {
            this.session.setTricks(pIdx, cur + 1);
            this.render();
          }
        });
      });

      const btnAuto = this.container.querySelector('#btn-auto-fill-tricks');
      if (btnAuto) {
        btnAuto.addEventListener('click', () => {
          triggerHaptic();
          const success = this.session.autoFillLastPlayerTricks();
          if (success) this.render();
          else alert('Please enter tricks for at least 3 players.');
        });
      }

      const btnBackBets = this.container.querySelector('#btn-back-to-bets');
      if (btnBackBets) {
        btnBackBets.addEventListener('click', () => {
          triggerHaptic();
          this.session.activeRound.stage = 'BETS';
          this.render();
        });
      }

      const btnCommit = this.container.querySelector('#btn-commit-round');
      if (btnCommit) {
        btnCommit.addEventListener('click', () => {
          triggerHaptic();
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
