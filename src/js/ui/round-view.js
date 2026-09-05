/**
 * Mobile-First Sleek Round Wizard (Simplified & Full Modes) with i18n
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
    const t = this.i18n;
    const round = this.session.activeRound;
    const stage = round.stage;
    const isSimplified = this.session.simplifiedMode;

    let stageLabel = '';
    if (isSimplified) {
      stageLabel = stage === 'BETS' ? t.stageBets : t.stageTricks;
    } else {
      stageLabel = stage === 'TRUMP' ? t.stageTrump : 
                   stage === 'BETS' ? t.stageBetsFull : t.stageTricksFull;
    }

    let html = `
      <div class="card">
        <div class="stage-header">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <div class="stage-title">${stageLabel}</div>
            <button class="btn-pill" id="btn-toggle-simplified" title="Toggle Mode" style="font-size: 0.72rem; height: 26px; padding: 0 8px; background: ${isSimplified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)'}; border-color: ${isSimplified ? 'rgba(16, 185, 129, 0.4)' : 'rgba(99, 102, 241, 0.4)'}; color: ${isSimplified ? '#a7f3d0' : '#c7d2fe'};">
              ${isSimplified ? t.simplified : t.fullTrump}
            </button>
          </div>
          <div class="round-pill">
            ${t.deal} #${this.session.roundNumber}
          </div>
        </div>
    `;

    if (stage === 'TRUMP' && !isSimplified) {
      html += this.renderTrumpStage(round);
    } else if (stage === 'BETS') {
      html += this.renderBetsStage(round, isSimplified);
    } else if (stage === 'TRICKS') {
      html += this.renderTricksStage(round, isSimplified);
    }

    html += `</div>`;
    this.container.innerHTML = html;
    this.bindEvents(stage, isSimplified);
  }

  renderTrumpStage(round) {
    const t = this.i18n;
    const isHe = t.lang === 'he';
    const dealer = this.session.players[round.dealerIndex];
    const leadBidder = this.session.players[round.leadBidderIndex];

    return `
      <div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.85rem; display: flex; justify-content: space-between;">
          <span>${t.dealer}: <strong>${dealer.name}</strong></span>
          <span>${t.lead}: <strong>${leadBidder.name}</strong></span>
        </div>

        <div class="trump-stage-layout">
          <div class="trump-stage-col">
            <div class="stage-section-title">${t.auctionWinner}</div>
            <div class="trump-grid-2x2">
              ${this.session.players.map((p, idx) => `
                <button class="btn-outline trump-player-btn ${round.trump.winnerIndex === idx ? 'active' : ''}" 
                        data-player-idx="${idx}"
                        style="${round.trump.winnerIndex === idx ? 'border-color: var(--accent-primary); background: var(--accent-primary); color: white;' : ''}">
                  ${p.avatar ? `<span class="player-avatar-mini" style="border-color: ${p.color}; background: ${p.color}22;">${p.avatar}</span>` : `<span class="player-dot" style="background: ${p.color};"></span>`}
                  <span>${p.name}</span>
                </button>
              `).join('')}
            </div>

            <div class="pas-round-box" style="margin-bottom: 0.85rem; padding: 0.6rem 0.75rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <label style="display: flex; align-items: center; gap: 0.6rem; cursor: pointer;">
                <input type="checkbox" id="chk-pas-round" ${round.trump.isPasRound ? 'checked' : ''} style="width: 18px; height: 18px;">
                <span style="font-size: 0.85rem; font-weight: 600;">${t.pasRound}</span>
              </label>
            </div>
          </div>

          <div class="trump-stage-col">
            <div class="stage-section-title">${t.denomination}</div>
            <div class="suits-row">
              ${SUITS.map(s => `
                <div class="suit-option ${round.trump.suitId === s.id && !round.trump.isPasRound ? 'active' : ''}" data-suit-id="${s.id}">
                  <span class="suit-symbol" style="color: ${round.trump.suitId === s.id ? '#ffffff' : s.color}">${s.symbol}</span>
                  <span class="suit-label">${isHe ? s.nameHe : s.nameEn}</span>
                </div>
              `).join('')}
            </div>

            <div class="stage-section-title">${t.winningTarget}</div>
            <div class="trump-targets-grid">
              ${[5, 6, 7, 8, 9, 10, 11, 12, 13].map(n => `
                <button class="chip ${round.trump.bidAmount === n && !round.trump.isPasRound ? 'active' : ''} trump-target-chip" data-amount="${n}">
                  ${n}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <button class="btn-block" id="btn-confirm-trump" ${round.trump.winnerIndex === null && !round.trump.isPasRound ? 'disabled' : ''}>
          ${t.confirmTrump}
        </button>
      </div>
    `;
  }

  renderBetsStage(round, isSimplified) {
    const t = this.i18n;
    const lastBidderIdx = this.session.getLastBidderIndex();
    const lastBidderPlayer = lastBidderIdx !== null ? this.session.players[lastBidderIdx] : null;
    const forbidden = this.session.getForbiddenBetForLastBidder();
    const hook = validateBetsHook(round.bets);
    const sum = round.bets.reduce((a, b) => a + (typeof b === 'number' && !isNaN(b) ? b : 0), 0);
    const allFilled = round.bets.every(b => typeof b === 'number' && !isNaN(b));
    const dealer = this.session.players[round.dealerIndex];
    const trumpWinner = round.trump.winnerIndex !== null ? this.session.players[round.trump.winnerIndex] : null;

    let hookMessage = '';
    if (isSimplified) {
      if (allFilled && sum === 13) {
        hookMessage = t.hookViolation;
      } else {
        hookMessage = `${t.totalBids}: <strong>${sum}</strong> (${sum > 13 ? t.over : sum < 13 ? t.under : '13'})`;
      }
    } else {
      if (forbidden !== null && lastBidderPlayer) {
        hookMessage = `${t.totalBids}: <strong>${sum}</strong> • ${t.lastBidder} (${lastBidderPlayer.name}) ${t.lastBidderCannotBid} <strong>${forbidden}</strong>`;
      } else {
        hookMessage = `${t.totalBids}: <strong>${sum}</strong> (${hook.status === 'OVER' ? t.over : hook.status === 'UNDER' ? t.under : '13'})`;
      }
    }

    return `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; color: var(--text-secondary);">
            ${isSimplified ? `${t.dealer}: <strong>${dealer.name}</strong>` : 
              `${t.trumpMaker}: <strong>${trumpWinner ? trumpWinner.name : '—'}</strong> (${t.lastBidder}: <strong>${lastBidderPlayer ? lastBidderPlayer.name : ''}</strong>)`}
          </div>
          ${!isSimplified ? `
            <button class="btn-nav" id="btn-back-to-trump" style="font-size: 0.75rem; min-height: 26px; padding: 2px 8px;">${t.editTrump}</button>
          ` : ''}
        </div>

        <!-- Hook Banner -->
        <div class="hook-banner ${hook.status}">
          <div>
            <span>${hookMessage}</span>
          </div>
        </div>

        <!-- Player Input Cards -->
        <div class="round-inputs-grid">
          ${this.session.players.map((p, idx) => {
            const isDealer = (idx === round.dealerIndex);
            const isLastBidder = (!isSimplified && idx === lastBidderIdx);
            const isTrumpMaker = (!isSimplified && idx === round.trump.winnerIndex);
            const currentBet = round.bets[idx];
            const isForbiddenChip = (!isSimplified && isLastBidder && forbidden !== null);

            return `
              <div class="input-row ${isDealer ? 'dealer-row' : ''}" data-player-idx="${idx}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    ${p.avatar ? `<span class="player-avatar-mini" style="border-color: ${p.color}; background: ${p.color}22;">${p.avatar}</span>` : `<span class="player-dot" style="background: ${p.color};"></span>`}
                    <span>${p.name}</span>
                    ${isTrumpMaker ? `<span style="font-size: 0.62rem; background: #fbbf24; color: black; padding: 1px 5px; border-radius: 4px; font-weight: 800;">${t.trumpMaker.toUpperCase()}</span>` : ''}
                    ${isLastBidder ? `<span class="tag-dealer" style="position:static; background: #e11d48;">${t.lastBidder.toUpperCase()}</span>` : ''}
                    ${isDealer && !isTrumpMaker && !isLastBidder ? `<span class="tag-dealer" style="position:static;">${t.dealer.toUpperCase()}</span>` : ''}
                  </div>
                  
                  <div class="stepper">
                    <button class="stepper-btn btn-bet-dec" data-player-idx="${idx}" ${currentBet === null || currentBet <= 0 ? 'disabled' : ''}>−</button>
                    <span class="stepper-val">${currentBet !== null ? currentBet : '—'}</span>
                    <button class="stepper-btn btn-bet-inc" data-player-idx="${idx}" ${currentBet >= 13 ? 'disabled' : ''}>+</button>
                  </div>
                </div>

                <div class="chips-row">
                  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => `
                    <button class="chip ${currentBet === n ? 'active' : ''} ${isForbiddenChip && forbidden === n ? 'forbidden' : ''}" 
                            data-player-idx="${idx}" data-amount="${n}">
                      ${n === 0 ? '0' : n}
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn-block" id="btn-proceed-to-tricks" ${!hook.isValid || !allFilled ? 'disabled' : ''} style="margin-top: 0.5rem;">
          ${t.enterTricksBtn}
        </button>
      </div>
    `;
  }

  renderTricksStage(round, isSimplified) {
    const t = this.i18n;
    const tricks = round.tricks;
    const sumTricks = tricks.reduce((a, b) => a + (typeof b === 'number' && !isNaN(b) ? b : 0), 0);
    const isValidSum = (sumTricks === 13 && tricks.every(t => typeof t === 'number' && !isNaN(t)));
    const remaining = 13 - sumTricks;

    return `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: ${isValidSum ? 'var(--success)' : 'var(--warning)'};">
            ${isValidSum ? t.tricksValid : `${t.remainingToAssign}: ${remaining}`}
          </div>
          <button class="btn-pill" id="btn-auto-fill-tricks" style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.2); border-color: rgba(99, 102, 241, 0.4); color: #c7d2fe;">
            ${t.autoFillBids}
          </button>
        </div>

        <div class="round-inputs-grid">
          ${this.session.players.map((p, idx) => {
            const bet = round.bets[idx];
            const actual = tricks[idx];
            const isMatch = (actual !== null && bet !== null && actual === bet);

            return `
              <div class="input-row" data-player-idx="${idx}" style="${isMatch ? 'border-color: rgba(16, 185, 129, 0.4);' : ''}">
                <div class="input-row-header">
                  <div class="input-row-name">
                    ${p.avatar ? `<span class="player-avatar-mini" style="border-color: ${p.color}; background: ${p.color}22;">${p.avatar}</span>` : `<span class="player-dot" style="background: ${p.color};"></span>`}
                    <span>${p.name}</span>
                    <span class="input-row-sub">
                      (${t.bid || 'Bid'}: <strong>${bet !== null ? bet : '—'}</strong>)
                    </span>
                    ${isMatch ? `<span style="color: var(--success); font-size: 0.72rem; font-weight: 700; margin-left: 2px;">${t.exact}</span>` : ''}
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
        </div>

        ${isValidSum ? this.renderScorePreview(round) : ''}

        <div style="display: flex; gap: 0.4rem; margin-top: 0.85rem;">
          <button class="btn-outline" id="btn-back-to-bets" style="flex: 1;">
            ${t.editBids}
          </button>
          <button class="btn-block" id="btn-commit-round" style="flex: 2;" ${!isValidSum ? 'disabled' : ''}>
            ${t.calculateNextDeal}
          </button>
        </div>
      </div>
    `;
  }

  renderScorePreview(round) {
    const t = this.i18n;
    const totalBets = round.bets.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
    const isPas = round.trump ? round.trump.isPasRound : false;

    return `
      <div class="breakdown-box">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.35rem;">
          ${t.roundScoreCalc}
        </div>
        <div class="breakdown-items-grid">
          ${this.session.players.map((p, idx) => {
            const calc = calculatePlayerScore(
              round.bets[idx] || 0,
              round.tricks[idx] || 0,
              idx === (round.trump ? round.trump.winnerIndex : null),
              isPas,
              this.session.rules,
              totalBets
            );

            return `
              <div class="breakdown-item">
                <div>
                  <div style="font-size: 0.82rem; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                    ${p.avatar ? `<span class="player-avatar-mini" style="width: 18px; height: 18px; min-width: 18px; font-size: 0.72rem; border-color: ${p.color}; background: ${p.color}22;">${p.avatar}</span>` : `<span class="player-dot" style="background: ${p.color};"></span>`}
                    <span>${p.name}</span>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary);">${calc.explanation}</div>
                </div>
                <span class="score-badge signed-score ${calc.score >= 0 ? 'plus' : 'minus'}" dir="ltr" style="direction: ltr; unicode-bidi: isolate;">
                  ${calc.score >= 0 ? `+${calc.score}` : calc.score}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  bindEvents(stage, isSimplified) {
    const btnToggle = this.container.querySelector('#btn-toggle-simplified');
    if (btnToggle) {
      btnToggle.addEventListener('click', () => {
        triggerHaptic();
        this.session.setSimplifiedMode(!this.session.simplifiedMode);
        this.render();
      });
    }

    if (stage === 'TRUMP' && !isSimplified) {
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
          this.session.autoFillTricksFromBids();
          this.render();
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
