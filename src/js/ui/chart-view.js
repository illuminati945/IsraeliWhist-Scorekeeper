/**
 * Score Progression Chart Component (SVG based, zero dependencies)
 */

export class ChartView {
  constructor(session, container, i18n) {
    this.session = session;
    this.container = container;
    this.i18n = i18n;
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
    const rounds = this.session.completedRounds;
    if (rounds.length === 0) {
      this.container.innerHTML = ``;
      return;
    }

    const players = this.session.players;
    const roundLabels = ['Start', ...rounds.map(r => `R${r.roundNumber}`)];
    const numPoints = roundLabels.length;

    // Collect score series for each player
    const series = players.map((p, pIdx) => {
      let cum = 0;
      const pts = [0];
      rounds.forEach(r => {
        const res = r.results.find(res => res.playerIndex === pIdx);
        cum += res ? res.score : 0;
        pts.push(cum);
      });
      return { player: p, points: pts };
    });

    let minScore = 0;
    let maxScore = 0;
    series.forEach(s => {
      s.points.forEach(pt => {
        if (pt < minScore) minScore = pt;
        if (pt > maxScore) maxScore = pt;
      });
    });

    // Add margin to min/max
    const paddingVal = 20;
    minScore = Math.floor((minScore - paddingVal) / 20) * 20;
    maxScore = Math.ceil((maxScore + paddingVal) / 20) * 20;
    if (minScore === maxScore) maxScore += 50;

    const width = 600;
    const height = 260;
    const padLeft = 45;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;

    const chartW = width - padLeft - padRight;
    const chartH = height - padTop - padBottom;

    const getX = (idx) => padLeft + (idx / (numPoints - 1 || 1)) * chartW;
    const getY = (val) => padTop + chartH - ((val - minScore) / (maxScore - minScore)) * chartH;
    const zeroY = getY(0);

    let svg = `
      <div class="glass-card" style="margin-top: 1.25rem;">
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;">
          📈 ${this.i18n.scoreTrend}
        </h3>
        <div style="overflow-x: auto;">
          <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;">
            <!-- Grid Lines -->
            <line x1="${padLeft}" y1="${zeroY}" x2="${width - padRight}" y2="${zeroY}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-dasharray="4 2" />
            <text x="${padLeft - 8}" y="${zeroY + 4}" fill="var(--text-secondary)" font-size="10" text-anchor="end">0</text>
            <text x="${padLeft - 8}" y="${padTop + 8}" fill="var(--text-secondary)" font-size="10" text-anchor="end">${maxScore}</text>
            <text x="${padLeft - 8}" y="${height - padBottom}" fill="var(--text-secondary)" font-size="10" text-anchor="end">${minScore}</text>

            <!-- Round X Axis Labels -->
            ${roundLabels.map((lbl, idx) => `
              <text x="${getX(idx)}" y="${height - 10}" fill="var(--text-secondary)" font-size="9" text-anchor="middle">${lbl}</text>
            `).join('')}

            <!-- Player Lines -->
            ${series.map(s => {
              const polylinePts = s.points.map((pt, idx) => `${getX(idx)},${getY(pt)}`).join(' ');
              return `
                <polyline fill="none" stroke="${s.player.color}" stroke-width="2.5" points="${polylinePts}" />
                ${s.points.map((pt, idx) => `
                  <circle cx="${getX(idx)}" cy="${getY(pt)}" r="4" fill="${s.player.color}" stroke="#ffffff" stroke-width="1.5">
                    <title>${s.player.name} (${roundLabels[idx]}): ${pt}</title>
                  </circle>
                `).join('')}
              `;
            }).join('')}
          </svg>
        </div>

        <!-- Legend -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap;">
          ${players.map(p => `
            <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
              <span>${p.avatar} ${p.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = svg;
  }
}
