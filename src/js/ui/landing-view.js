/**
 * Israeli Whist - Mobile-First Landing Page / Lobby with i18n
 */
import { ArchiveManager } from '../engine/archive-manager.js';

export class LandingView {
  constructor(app, container) {
    this.app = app;
    this.container = container;
  }

  render() {
    if (!this.container) return;
    const t = this.app.i18n;
    const isHe = t.lang === 'he';
    const recentGames = ArchiveManager.getRecentGames();

    let html = `
      <div class="landing-hero">
        <div class="landing-badge">♠️ ♥️ ♣️ ♦️ ${isHe ? 'וויסט ישראלי' : 'ISRAELI WHIST'}</div>
        <h1 class="landing-title">${isHe ? 'מחשבון ניקוד' : 'Scorekeeper'}</h1>
        <p class="landing-subtitle">
          ${t.landingSubtitle}
        </p>

        <div class="landing-actions">
          <button class="btn-block btn-hero-start" id="landing-btn-new-game">
            ${t.startNewMatch}
          </button>
          
          <div class="join-box">
            <input type="text" class="input-field join-input" id="landing-txt-room" placeholder="${t.roomCodePlaceholder}" maxlength="12" />
            <button class="btn-pill btn-share" id="landing-btn-join" style="height: 42px; padding: 0 16px; font-size: 0.85rem;">
              ${t.joinRoom}
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Saved Games Section -->
      ${recentGames.length > 0 ? `
        <div class="card" style="margin-top: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <h2 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
              📂 ${t.recentMatches} (${recentGames.length})
            </h2>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem;">
            ${recentGames.slice(0, 5).map((g, idx) => {
              const timeDisplay = ArchiveManager.formatTimestamp(g.updatedAt || g.createdAt);
              return `
                <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="room-pill" style="font-size: 0.7rem;">${g.roomId}</span>
                      <span style="font-size: 0.72rem; color: var(--text-secondary);">${timeDisplay}</span>
                    </div>
                    <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted);">
                      ${g.completedRoundsCount} ${t.deals}
                    </span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem;">
                    ${g.players.map(p => `
                      <span style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.75rem; display: inline-flex; align-items: center; gap: 3px;">
                        <span class="player-dot" style="background: ${p.color};"></span>
                        <span>${p.name}:</span>
                        <strong style="color: ${p.score >= 0 ? 'var(--success)' : 'var(--danger)'};">${p.score >= 0 ? '+' : ''}${p.score}</strong>
                      </span>
                    `).join('')}
                  </div>

                  <div style="display: flex; justify-content: flex-end;">
                    <button class="btn-pill btn-share btn-landing-resume" data-game-idx="${idx}" style="font-size: 0.75rem; padding: 0 12px; height: 30px;">
                      ${t.resumeMatch}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Rules Quick Guide -->
      <div class="card" style="margin-top: 1rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;" id="landing-rules-toggle">
          <h3 style="font-size: 0.9rem; font-weight: 700;">${t.quickRulesTitle}</h3>
          <span style="font-size: 0.85rem; color: var(--text-muted);" id="landing-rules-arrow">▼</span>
        </div>

        <div id="landing-rules-body" style="display: none; margin-top: 0.85rem; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
          ${isHe ? `
            <p style="margin-bottom: 0.5rem;"><strong>1. חישוב הניקוד הרגיל:</strong></p>
            <ul style="padding-right: 1.2rem; margin-bottom: 0.75rem;">
              <li>עמידה בחוזה (מעל 0): <strong>10 + הכרזה²</strong> נקודות (לדוגמה: הכרזה 4 שעמדה = +26).</li>
              <li>פאס מוצלח (הכרזה 0): <strong>+50</strong> נקודות.</li>
              <li>נפילה מחוזה: <strong>10- נקודות</strong> על כל לקיחה של פספוס.</li>
              <li>נפילה מפאס (לקח $T > 0$): <strong>-50 - 10 × (T - 1)</strong> נקודות.</li>
            </ul>

            <p style="margin-bottom: 0.5rem;"><strong>2. חוק ההוק (חוק המחלק):</strong></p>
            <p style="margin-bottom: 0.75rem;">
              סך כל 4 ההכרזות <em>אינו יכול</em> להיות 13 (מספר הלקיחות בסיבוב). על המכריז האחרון אסור להכריז את המספר שישלים את הסכום ל-13.
            </p>

            <p style="margin-bottom: 0.5rem;"><strong>3. מצב פשוט (Simplified):</strong></p>
            <p>
              מדלג על שלב מכרז השליט. השחקנים מזינים ישירות את ההכרזות ואת הלקיחות בפועל.
            </p>
          ` : `
            <p style="margin-bottom: 0.5rem;"><strong>1. Standard Scoring:</strong></p>
            <ul style="padding-left: 1.2rem; margin-bottom: 0.75rem;">
              <li>Exact Bid ($B > 0$): <strong>+10 + B²</strong> points (e.g. Bid 4 made = +26).</li>
              <li>Exact Pass ($B = 0$): <strong>+50</strong> points.</li>
              <li>Missed Bid: <strong>-10 × |Actual - Bid|</strong> points.</li>
              <li>Failed Pass ($B = 0$, took $T > 0$): <strong>-50 - 10 × (T - 1)</strong> points.</li>
            </ul>

            <p style="margin-bottom: 0.5rem;"><strong>2. The Hook Rule:</strong></p>
            <p style="margin-bottom: 0.75rem;">
              The sum of all 4 bids can <em>never</em> equal 13 (the number of tricks in a deal). The last bidder is prohibited from bidding the exact number that would make the total equal 13.
            </p>

            <p style="margin-bottom: 0.5rem;"><strong>3. Simplified Mode:</strong></p>
            <p>
              Skips the Trump Auction phase entirely. Players simply input bids and actual tricks taken.
            </p>
          `}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindEvents(recentGames);
  }

  bindEvents(recentGames) {
    const btnNew = this.container.querySelector('#landing-btn-new-game');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        this.app.dialogs.showNewGameModal();
      });
    }

    const btnJoin = this.container.querySelector('#landing-btn-join');
    const txtRoom = this.container.querySelector('#landing-txt-room');
    if (btnJoin && txtRoom) {
      const handleJoin = () => {
        let code = txtRoom.value.trim().toUpperCase();
        if (!code) {
          alert('Please enter a valid room code or link');
          return;
        }
        if (code.includes('game=')) {
          const match = code.match(/game=([A-Za-z0-9_-]+)/);
          if (match) code = match[1];
        }
        if (!code.startsWith('W-') && code.length === 4) {
          code = `W-${code}`;
        }
        this.app.joinRoomByCode(code);
      };

      btnJoin.addEventListener('click', handleJoin);
      txtRoom.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleJoin();
      });
    }

    this.container.querySelectorAll('.btn-landing-resume').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.gameIdx, 10);
        const game = recentGames[idx];
        if (game) {
          this.app.resumeGameFromArchive(game);
        }
      });
    });

    const rulesToggle = this.container.querySelector('#landing-rules-toggle');
    const rulesBody = this.container.querySelector('#landing-rules-body');
    const rulesArrow = this.container.querySelector('#landing-rules-arrow');
    if (rulesToggle && rulesBody) {
      rulesToggle.addEventListener('click', () => {
        const isHidden = rulesBody.style.display === 'none';
        rulesBody.style.display = isHidden ? 'block' : 'none';
        if (rulesArrow) rulesArrow.textContent = isHidden ? '▲' : '▼';
      });
    }
  }
}
