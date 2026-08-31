/**
 * Scoreboard & Historical Round Table Component
 */
import { SUITS } from '../engine/whist-rules.js';

export class Scoreboard {
  constructor(session, leaderboardContainer, historyContainer, i18n, onUndo) {
    this.session = session;
    this.leaderboardContainer = leaderboardContainer;
    this.historyContainer = historyContainer;
    this.i18n = i18n;
    this.onUndo = onUndo;
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
    this.renderLeaderboard();
    this.renderHistoryTable();
  }

  renderLeaderboard() {
    if (!this.leaderboardContainer) return;
    const rankings = this.session.getRankings();
    const scores = this.session.getCumulativeScores();
    const topScore = rankings.length > 0 ? rankings[0].score : 0;
    const currentDealer = this.session.currentDealerIndex;

    const rankIcons = ['🥇', '🥈', '🥉', '4️⃣'];

    let html = `
      <div class="leaderboard-grid">
        ${this.session.players.map((p, idx) => {
          const score = scores[idx];
          const rankIndex = rankings.findIndex(r => r.index === idx);
          const isLeader = (score === topScore && this.session.completedRounds.length > 0);
          const isDealer = (idx === currentDealer);

          return `
            <div class="player-score-card ${isLeader ? 'is-leader' : ''} ${isDealer ? 'is-dealer' : ''}">
              ${isDealer ? `<span class="dealer-tag">${this.i18n.dealer}</span>` : ''}
              <div class="player-avatar">${p.avatar}</div>
              <div class="player-name">${p.name}</div>
              <div class="player-points" style="color: ${score >= 0 ? '#10b981' : '#ef4444'};">
                ${score >= 0 ? `+${score}` : score}
              </div>
              <div class="player-hit-rate">
                <span>${rankIcons[rankIndex]} #${rankIndex + 1}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.leaderboardContainer.innerHTML = html;
  }

  renderHistoryTable() {
    if (!this.historyContainer) return;
    const rounds = this.session.completedRounds;

    if (rounds.length === 0) {
      this.historyContainer.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🃏</div>
          <div>${this.i18n.noRoundsYet}</div>
        </div>
      `;
      return;
    }

    let html = `
      <div class="glass-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700;">📜 ${this.i18n.history} (${rounds.length} ${this.i18n.round}s)</h3>
          <button class="btn-secondary" id="btn-undo-round" style="padding: 4px 10px; font-size: 0.8rem; width: auto; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
            ↩️ ${this.i18n.undoRound}
          </button>
        </div>

        <div class="table-container">
          <table class="whist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>${this.i18n.dealer}</th>
                <th>${this.i18n.trumpMaker}</th>
                ${this.session.players.map(p => `
                  <th>${p.avatar} ${p.name}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rounds.map((r, rIdx) => {
                const trumpSuit = SUITS.find(s => s.id === r.trump.suitId) || SUITS[0];
                const trumpPlayer = r.trump.winnerIndex !== null ? this.session.players[r.trump.winnerIndex] : null;

                return `
                  <tr>
                    <td style="font-weight: 700;">${r.roundNumber}</td>
                    <td>${this.session.players[r.dealerIndex].avatar}</td>
                    <td>
                      ${r.trump.isPasRound ? '🚫 Pas' : `
                        <span style="color:${trumpSuit.color}; font-weight:700;">${r.trump.bidAmount}${trumpSuit.symbol}</span>
                      `}
                    </td>
                    ${this.session.players.map((p, pIdx) => {
                      const res = r.results.find(res => res.playerIndex === pIdx);
                      if (!res) return `<td>-</td>`;
                      const scoreDelta = res.score >= 0 ? `+${res.score}` : res.score;
                      const isExact = res.made;
                      const cum = r.cumulativeScores ? r.cumulativeScores[pIdx] : '-';

                      return `
                        <td>
                          <div style="font-size: 0.8rem; color: var(--text-secondary);">
                            ${r.trump.isPasRound ? `T:${res.tricks}` : `B:${res.bid} / T:${res.tricks}`}
                          </div>
                          <div style="font-weight: 800; color: ${isExact ? '#10b981' : '#ef4444'};">
                            ${scoreDelta}
                          </div>
                          <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">
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
        if (confirm('Undo the last completed round?')) {
          if (this.onUndo) this.onUndo();
        }
      });
    }
  }
}
