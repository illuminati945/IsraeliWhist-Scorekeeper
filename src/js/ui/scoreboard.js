/**
 * Sleek Leaderboard & Score History Table
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

    let html = `
      <div class="leaderboard-grid">
        ${this.session.players.map((p, idx) => {
          const score = scores[idx];
          const rankIndex = rankings.findIndex(r => r.index === idx);
          const isLeader = (score === topScore && this.session.completedRounds.length > 0);
          const isDealer = (idx === currentDealer);

          return `
            <div class="player-card ${isLeader ? 'is-leader' : ''} ${isDealer ? 'is-dealer' : ''}">
              ${isDealer ? `<span class="tag-dealer">DEALER</span>` : ''}
              <div class="player-title">
                <span class="player-dot" style="background: ${p.color};"></span>
                ${p.name}
              </div>
              <div class="player-score" style="color: ${score >= 0 ? 'var(--success)' : 'var(--danger)'};">
                ${score >= 0 ? `+${score}` : score}
              </div>
              <div class="player-meta">
                Rank #${rankIndex + 1}
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
        <div class="card" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem;">No Deals Recorded</div>
          <div style="font-size: 0.85rem;">Start Deal 1 above to record score history.</div>
        </div>
      `;
      return;
    }

    let html = `
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
          <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">History (${rounds.length} Deals)</h3>
          <button class="btn-pill" id="btn-undo-round" style="font-size: 0.72rem; color: var(--danger); height: 28px;">
            Undo Last Deal
          </button>
        </div>

        <div class="table-wrap">
          <table class="table-custom">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Dealer</th>
                ${this.session.players.map(p => `
                  <th>${p.name}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rounds.map((r, rIdx) => {
                return `
                  <tr>
                    <td style="font-weight: 700;">#${r.roundNumber}</td>
                    <td>${this.session.players[r.dealerIndex].name.slice(0, 3)}</td>
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
        if (confirm('Undo the last completed deal?')) {
          if (this.onUndo) this.onUndo();
        }
      });
    }
  }
}
