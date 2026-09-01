/**
 * Israeli Whist - Saved Games Archive Manager (Recent 10 Games)
 */

const RECENT_GAMES_KEY = 'israeli_whist_recent_games_v1';
const MAX_SAVED_GAMES = 10;

export class ArchiveManager {
  static getRecentGames() {
    if (typeof localStorage === 'undefined') return [];
    try {
      const data = localStorage.getItem(RECENT_GAMES_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read recent games archive:', e);
    }
    return [];
  }

  static saveGameToArchive(session, roomId) {
    if (!session || typeof localStorage === 'undefined') return;

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
        completedRoundsCount: session.completedRounds.length,
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
          activeRound: session.activeRound,
          status: session.status
        }
      };

      // Filter out existing game with same roomId/id
      const filtered = existing.filter(g => g.roomId !== summary.roomId && g.id !== summary.id);
      
      // Add current game at the top and cap to MAX_SAVED_GAMES
      const updated = [summary, ...filtered].slice(0, MAX_SAVED_GAMES);

      localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save game to archive:', e);
    }
  }

  static deleteGame(roomId) {
    if (typeof localStorage === 'undefined') return;
    try {
      const existing = this.getRecentGames();
      const updated = existing.filter(g => g.roomId !== roomId && g.id !== roomId);
      localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated));
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
