/**
 * Israeli Whist - Player Profile & Roster Manager
 * Handles persistent saved player profiles, career statistics, avatars, and quick picking.
 */

const STORAGE_KEY = 'israeli_whist_profiles_v1';
const LAST_LINEUP_KEY = 'israeli_whist_last_lineup_v1';

export const AVATAR_OPTIONS = [
  '🦊', '🦁', '🐯', '🐼', '🐨', '🦅', '🦉', '🐺',
  '👑', '🃏', '🚀', '⭐', '🔥', '⚡', '💎', '🎯',
  '🎩', '🦄', '🐲', '🐱', '🐶', '🍕', '🎮', '🏆'
];

export const COLOR_OPTIONS = [
  '#6366f1', // Indigo
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
  '#ef4444', // Red
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#3b82f6'  // Blue
];

const DEFAULT_PROFILES = [
  { id: 'prof_default_1', name: 'עומר', avatar: '🦊', color: '#6366f1', gamesPlayed: 5, wins: 2, totalScore: 320, zeroBids: 4, zeroHits: 3, lastPlayed: '2026-09-03T10:00:00Z' },
  { id: 'prof_default_2', name: 'דניאל', avatar: '🦁', color: '#ec4899', gamesPlayed: 5, wins: 1, totalScore: 210, zeroBids: 3, zeroHits: 2, lastPlayed: '2026-09-03T10:00:00Z' },
  { id: 'prof_default_3', name: 'טל', avatar: '👑', color: '#10b981', gamesPlayed: 5, wins: 1, totalScore: 195, zeroBids: 2, zeroHits: 2, lastPlayed: '2026-09-03T10:00:00Z' },
  { id: 'prof_default_4', name: 'מיה', avatar: '⭐', color: '#f59e0b', gamesPlayed: 5, wins: 1, totalScore: 180, zeroBids: 1, zeroHits: 1, lastPlayed: '2026-09-03T10:00:00Z' }
];

let inMemoryProfiles = null;

export class ProfileManager {
  /**
   * Get all saved player profiles, sorted by most recently active
   */
  static getProfiles() {
    if (inMemoryProfiles) return inMemoryProfiles;

    let profiles = [];
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            profiles = parsed;
          }
        }
      } catch (e) {
        console.warn('Failed to parse saved profiles from localStorage:', e);
      }
    }

    // If no profiles saved yet, try populating from recent games
    if (!profiles || profiles.length === 0) {
      const seen = new Set();
      try {
        const recent = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('israeli_whist_recent_games_v1') || '[]') : [];
        if (Array.isArray(recent)) {
          recent.forEach(g => {
            if (g && Array.isArray(g.players)) {
              g.players.forEach(p => {
                if (p && p.name && !seen.has(p.name.trim().toLowerCase())) {
                  seen.add(p.name.trim().toLowerCase());
                  profiles.push({
                    id: `prof_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                    name: p.name.trim(),
                    avatar: p.avatar || AVATAR_OPTIONS[profiles.length % AVATAR_OPTIONS.length],
                    color: p.color || COLOR_OPTIONS[profiles.length % COLOR_OPTIONS.length],
                    gamesPlayed: 1,
                    wins: 0,
                    totalScore: p.score || 0,
                    zeroBids: 0,
                    zeroHits: 0,
                    lastPlayed: g.updatedAt || new Date().toISOString()
                  });
                }
              });
            }
          });
        }
      } catch (e) {}

      // Fallback if still empty
      if (profiles.length === 0) {
        profiles = [...DEFAULT_PROFILES];
      }
      this.saveToStorage(profiles);
    }

    inMemoryProfiles = profiles;
    return inMemoryProfiles;
  }

  static getProfile(id) {
    const profiles = this.getProfiles();
    return profiles.find(p => p.id === id) || null;
  }

  static getProfileByName(name) {
    if (!name) return null;
    const clean = name.trim().toLowerCase();
    const profiles = this.getProfiles();
    return profiles.find(p => p.name.trim().toLowerCase() === clean) || null;
  }

  /**
   * Save, create or update a profile
   */
  static saveProfile(data) {
    const profiles = this.getProfiles();
    const now = new Date().toISOString();

    let existingIndex = -1;
    if (data.id) {
      existingIndex = profiles.findIndex(p => p.id === data.id);
    } else if (data.name) {
      existingIndex = profiles.findIndex(p => p.name.trim().toLowerCase() === data.name.trim().toLowerCase());
    }

    let savedProfile = null;

    if (existingIndex >= 0) {
      // Update existing
      profiles[existingIndex] = {
        ...profiles[existingIndex],
        ...data,
        name: data.name.trim(),
        avatar: data.avatar || profiles[existingIndex].avatar || '🦊',
        color: data.color || profiles[existingIndex].color || COLOR_OPTIONS[existingIndex % COLOR_OPTIONS.length],
        lastPlayed: now
      };
      savedProfile = profiles[existingIndex];
    } else {
      // Create new profile
      const id = data.id || `prof_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const newProf = {
        id,
        name: data.name.trim(),
        avatar: data.avatar || AVATAR_OPTIONS[profiles.length % AVATAR_OPTIONS.length],
        color: data.color || COLOR_OPTIONS[profiles.length % COLOR_OPTIONS.length],
        gamesPlayed: data.gamesPlayed || 0,
        wins: data.wins || 0,
        totalScore: data.totalScore || 0,
        zeroBids: data.zeroBids || 0,
        zeroHits: data.zeroHits || 0,
        lastPlayed: now
      };
      profiles.unshift(newProf);
      savedProfile = newProf;
    }

    this.saveToStorage(profiles);
    return savedProfile;
  }

  static deleteProfile(id) {
    let profiles = this.getProfiles();
    profiles = profiles.filter(p => p.id !== id);
    this.saveToStorage(profiles);
  }

  /**
   * Record completion of a match and update career stats
   */
  static recordGameCompletion(session) {
    if (!session || !session.players || !session.completedRounds || session.completedRounds.length === 0) {
      return;
    }

    const lastRound = session.completedRounds[session.completedRounds.length - 1];
    const finalScores = lastRound.cumulativeScores || [0, 0, 0, 0];

    // Determine winner (highest score)
    let maxScore = -Infinity;
    let winningIdx = 0;
    finalScores.forEach((s, idx) => {
      if (s > maxScore) {
        maxScore = s;
        winningIdx = idx;
      }
    });

    // Save this lineup as the last played lineup
    const lineup = session.players.map((p, idx) => ({
      name: p.name,
      color: p.color,
      avatar: p.avatar || this.getProfileByName(p.name)?.avatar || AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length]
    }));
    this.saveLastLineup(lineup);

    // Update each player profile
    session.players.forEach((p, idx) => {
      let prof = this.getProfileByName(p.name);
      if (!prof) {
        prof = this.saveProfile({
          name: p.name,
          color: p.color,
          avatar: p.avatar || AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length]
        });
      }

      // Count zero bids in this game for player
      let zeroBids = 0;
      let zeroHits = 0;
      session.completedRounds.forEach(r => {
        const roundBets = r.bets || r.bids || [];
        if (roundBets[idx] === 0) {
          zeroBids++;
          if (r.tricks && r.tricks[idx] === 0) {
            zeroHits++;
          }
        }
      });

      prof.gamesPlayed = (prof.gamesPlayed || 0) + 1;
      if (idx === winningIdx) {
        prof.wins = (prof.wins || 0) + 1;
      }
      prof.totalScore = (prof.totalScore || 0) + finalScores[idx];
      prof.zeroBids = (prof.zeroBids || 0) + zeroBids;
      prof.zeroHits = (prof.zeroHits || 0) + zeroHits;
      prof.lastPlayed = new Date().toISOString();
    });

    this.saveToStorage(inMemoryProfiles);
  }

  static getLastLineup() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem(LAST_LINEUP_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to get last lineup:', e);
    }
    return null;
  }

  static saveLastLineup(lineup) {
    if (typeof localStorage === 'undefined' || !Array.isArray(lineup)) return;
    try {
      localStorage.setItem(LAST_LINEUP_KEY, JSON.stringify(lineup));
    } catch (e) {}
  }

  static saveToStorage(profiles) {
    inMemoryProfiles = profiles;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      } catch (e) {
        console.warn('Failed to save profiles to localStorage:', e);
      }
    }
  }
}
