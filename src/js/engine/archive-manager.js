/**
 * Israeli Whist - Saved Games Archive Manager (Persistent Server + Local Storage)
 */

const RECENT_GAMES_KEY = 'israeli_whist_recent_games_v1';
const MAX_SAVED_GAMES = 10;
let inMemoryRecentGames = [];

export class ArchiveManager {
  static getRecentGames() {
    if (inMemoryRecentGames && inMemoryRecentGames.length > 0) {
      return inMemoryRecentGames;
    }
    if (typeof localStorage === 'undefined') return [];
    try {
      const data = localStorage.getItem(RECENT_GAMES_KEY);
      if (data) {
        inMemoryRecentGames = JSON.parse(data);
        return inMemoryRecentGames;
      }
    } catch (e) {
      console.warn('Failed to read recent games archive:', e);
    }
    return [];
  }

  static getBasePath() {
    if (typeof window === 'undefined') return '';
    const loc = window.location;
    if (loc.pathname.startsWith('/whist-dev')) return '/whist-dev';
    if (loc.pathname.startsWith('/whist')) return '/whist';
    return '';
  }

  static async syncWithServer(onUpdate = null) {
    try {
      const apiUrl = `${this.getBasePath()}/api/recent-games`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.games)) {
          const serverGames = json.games;
          const localGames = this.getRecentGames();

          // Merge server and local games by roomId
          const map = new Map();
          // Add local games first
          localGames.forEach(g => {
            if (g && g.roomId) map.set(g.roomId, g);
          });
          // Overwrite/add server games
          serverGames.forEach(g => {
            if (g && g.roomId) map.set(g.roomId, g);
          });

          const merged = Array.from(map.values())
            .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
            .slice(0, MAX_SAVED_GAMES);

          inMemoryRecentGames = merged;
          if (typeof localStorage !== 'undefined') {
            try {
              localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(merged));
            } catch (e) {}
          }

          if (onUpdate) onUpdate(merged);
          return merged;
        }
      }
    } catch (e) {
      console.warn('Error syncing recent games with server:', e);
    }

    const local = this.getRecentGames();
    if (onUpdate) onUpdate(local);
    return local;
  }

  static saveGameToArchive(session, roomId) {
    if (!session) return;

    // GUARD: Never archive or post a completely unplayed blank template!
    const completedCount = session.completedRounds ? session.completedRounds.length : 0;
    const isDefault = (name, idx) => !name || name === `Player ${idx + 1}` || name === `שחקן ${idx + 1}`;
    const hasCustomNames = (session.players || []).some((p, i) => !isDefault(p.name, i));
    const hasInitialScores = session.initialScores && session.initialScores.some(s => s !== 0);
    const hasActiveRoundData = session.activeRound && (
      (session.activeRound.bets && session.activeRound.bets.some(b => b !== null)) ||
      (session.activeRound.tricks && session.activeRound.tricks.some(t => t !== null))
    );

    if (completedCount === 0 && !hasCustomNames && !hasActiveRoundData && !hasInitialScores) {
      return;
    }

    try {
      const existing = this.getRecentGames();
      const scores = session.getCumulativeScores();
      const rankings = session.getRankings();
      const leader = rankings.length > 0 ? rankings[0] : null;

      const summary = {
        roomId: roomId || session.id || 'W-LOCAL',
        id: session.id,
        createdAt: session.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        roundNumber: session.roundNumber,
        completedRoundsCount: session.completedRounds ? session.completedRounds.length : 0,
        status: session.status || 'IN_PROGRESS',
        simplifiedMode: session.simplifiedMode,
        players: session.players.map((p, idx) => ({
          name: p.name,
          color: p.color,
          score: scores[idx] || 0
        })),
        leaderName: leader ? leader.player.name : session.players[0].name,
        leaderScore: leader ? leader.score : 0,
        fullState: {
          id: session.id,
          createdAt: session.createdAt,
          rules: session.rules,
          targetPoints: session.targetPoints,
          maxRounds: session.maxRounds,
          simplifiedMode: session.simplifiedMode,
          players: session.players,
          currentDealerIndex: session.currentDealerIndex,
          roundNumber: session.roundNumber,
          completedRounds: session.completedRounds,
          initialScores: session.initialScores,
          activeRound: session.activeRound,
          status: session.status
        }
      };

      const filtered = existing.filter(g => g.roomId !== summary.roomId && g.id !== summary.id);
      const updated = [summary, ...filtered].slice(0, MAX_SAVED_GAMES);
      inMemoryRecentGames = updated;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated));
      }

      // Also persist to server via REST API
      const postUrl = `${this.getBasePath()}/api/session/${summary.roomId}`;

      fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary.fullState)
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.rejected && data.session && typeof window !== 'undefined' && window.__ISRAELI_WHIST_APP__) {
          console.warn('[Sync] Server had an authoritative session; restoring state locally.');
          window.__ISRAELI_WHIST_APP__.applyRemoteState(data.session);
        }
      })
      .catch(() => {});

    } catch (e) {
      console.warn('Failed to save game to archive:', e);
    }
  }

  static deleteGame(roomId) {
    try {
      const existing = this.getRecentGames();
      const updated = existing.filter(g => g.roomId !== roomId && g.id !== roomId);
      inMemoryRecentGames = updated;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated));
      }

      // Also delete from server
      const delUrl = `${this.getBasePath()}/api/delete-session/${roomId}`;
      fetch(delUrl).catch(() => {});
    } catch (e) {
      console.warn('Failed to delete game from archive:', e);
    }
  }

  static formatTimestamp(isoString) {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (isToday) {
        return `Today at ${timeStr}`;
      }
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} • ${timeStr}`;
    } catch (e) {
      return isoString;
    }
  }
}
