/**
 * Israeli Whist Game State & Session Manager
 */
import { RULE_PRESETS, calculatePlayerScore, validateBetsHook, validateTricksSum, getDealerForbiddenBet } from './whist-rules.js';

const STORAGE_KEY = 'israeli_whist_current_game_v1';
const HISTORY_KEY = 'israeli_whist_game_history_v1';

export class GameSession {
  constructor(options = {}) {
    this.id = options.id || 'game_' + Date.now();
    this.createdAt = options.createdAt || new Date().toISOString();
    this.rules = options.rules || { ...RULE_PRESETS.STANDARD };
    this.targetPoints = options.targetPoints || null; // e.g. 500 or null (unlimited)
    this.maxRounds = options.maxRounds || null;       // e.g. 13 or null (unlimited)
    
    // Players (Default 4 players)
    this.players = options.players || [
      { id: 'p0', name: 'Player 1 (שחקן 1)', color: '#3b82f6', avatar: '🦁' },
      { id: 'p1', name: 'Player 2 (שחקן 2)', color: '#10b981', avatar: '🦅' },
      { id: 'p2', name: 'Player 3 (שחקן 3)', color: '#f59e0b', avatar: '🦊' },
      { id: 'p3', name: 'Player 4 (שחקן 4)', color: '#ec4899', avatar: '🐺' }
    ];

    this.currentDealerIndex = options.currentDealerIndex ?? 0; // 0..3
    this.roundNumber = options.roundNumber || 1;
    this.completedRounds = options.completedRounds || []; // Array of finished round objects
    
    // Active Round draft state
    this.activeRound = options.activeRound || this.initDraftRound();
    this.status = options.status || 'IN_PROGRESS'; // 'IN_PROGRESS', 'FINISHED'
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveToStorage();
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  initDraftRound() {
    const dealerIdx = this.currentDealerIndex;
    const leadBidderIdx = (dealerIdx + 1) % 4;
    return {
      roundNumber: this.roundNumber,
      dealerIndex: dealerIdx,
      leadBidderIndex: leadBidderIdx,
      stage: 'TRUMP', // 'TRUMP', 'BETS', 'TRICKS', 'REVIEW'
      trump: {
        winnerIndex: null, // index 0..3 or null
        suitId: 'NT',      // 'NT', 'SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'
        bidAmount: 5,      // 5..13
        isPasRound: false  // true if everyone passed
      },
      bets: [null, null, null, null],
      tricks: [null, null, null, null],
      scores: [0, 0, 0, 0],
      roundTotalBets: 0,
      bettingMode: null, // 'OVER', 'UNDER', 'HOOK_VIOLATION'
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Set Trump Auction details
   */
  setTrump(winnerIndex, suitId, bidAmount, isPasRound = false) {
    this.activeRound.trump = {
      winnerIndex: isPasRound ? null : winnerIndex,
      suitId: isPasRound ? 'NT' : suitId,
      bidAmount: isPasRound ? 0 : bidAmount,
      isPasRound
    };

    // If trump maker was set, auto-prefill trump maker's minimum bet in bets
    if (!isPasRound && winnerIndex !== null && typeof winnerIndex === 'number') {
      // Player can increase their bet later, but minimum is winning auction bid
      if (this.activeRound.bets[winnerIndex] === null || this.activeRound.bets[winnerIndex] < bidAmount) {
        this.activeRound.bets[winnerIndex] = bidAmount;
      }
    }

    this.activeRound.stage = 'BETS';
    this.notify();
  }

  /**
   * Set player's exact bet
   */
  setBet(playerIndex, amount) {
    if (playerIndex < 0 || playerIndex > 3) return;
    this.activeRound.bets[playerIndex] = amount;
    
    // Update total bets and status
    const filledBets = this.activeRound.bets.filter(b => typeof b === 'number' && !isNaN(b));
    const sum = filledBets.reduce((a, b) => a + b, 0);
    this.activeRound.roundTotalBets = sum;

    if (filledBets.length === 4) {
      const hookCheck = validateBetsHook(this.activeRound.bets);
      this.activeRound.bettingMode = hookCheck.status;
    } else {
      this.activeRound.bettingMode = sum > 13 ? 'OVER' : 'UNDER';
    }

    this.notify();
  }

  /**
   * Check if dealer's chosen bet violates the Hook Rule
   */
  getDealerForbiddenNumber() {
    const dealerIdx = this.activeRound.dealerIndex;
    const otherBets = [];
    for (let i = 0; i < 4; i++) {
      if (i !== dealerIdx) {
        if (typeof this.activeRound.bets[i] === 'number') {
          otherBets.push(this.activeRound.bets[i]);
        }
      }
    }
    if (otherBets.length === 3) {
      return getDealerForbiddenBet(otherBets);
    }
    return null;
  }

  /**
   * Advance to trick input stage
   */
  proceedToTricks() {
    const filledBets = this.activeRound.bets.filter(b => typeof b === 'number' && !isNaN(b));
    if (filledBets.length !== 4 && !this.activeRound.trump.isPasRound) {
      throw new Error('All 4 players must submit bets before proceeding to tricks.');
    }

    if (this.rules.enforceHookRule && !this.activeRound.trump.isPasRound) {
      const hookCheck = validateBetsHook(this.activeRound.bets);
      if (!hookCheck.isValid) {
        throw new Error('Total bets cannot equal 13 (The Hook Rule violation). Dealer must change their bet.');
      }
    }

    this.activeRound.stage = 'TRICKS';
    this.notify();
  }

  /**
   * Set player's actual tricks taken
   */
  setTricks(playerIndex, amount) {
    if (playerIndex < 0 || playerIndex > 3) return;
    this.activeRound.tricks[playerIndex] = amount;
    this.notify();
  }

  /**
   * Auto-calculate 4th player's tricks if 3 are filled
   */
  autoFillLastPlayerTricks() {
    const filled = [];
    let missingIdx = -1;
    for (let i = 0; i < 4; i++) {
      if (typeof this.activeRound.tricks[i] === 'number' && !isNaN(this.activeRound.tricks[i])) {
        filled.push(this.activeRound.tricks[i]);
      } else {
        missingIdx = i;
      }
    }

    if (filled.length === 3 && missingIdx !== -1) {
      const remainder = 13 - filled.reduce((a, b) => a + b, 0);
      if (remainder >= 0 && remainder <= 13) {
        this.activeRound.tricks[missingIdx] = remainder;
        this.notify();
        return true;
      }
    }
    return false;
  }

  /**
   * Commit and complete the current active round
   */
  commitRound() {
    const tricks = this.activeRound.tricks;
    if (!validateTricksSum(tricks)) {
      throw new Error('Total tricks taken across all players must equal 13.');
    }

    const roundResults = [];
    const isPas = this.activeRound.trump.isPasRound;
    const totalBets = this.activeRound.bets.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);

    for (let i = 0; i < 4; i++) {
      const bid = isPas ? 0 : this.activeRound.bets[i];
      const actualTricks = tricks[i];
      const isTrumpWinner = (i === this.activeRound.trump.winnerIndex);
      
      const calc = calculatePlayerScore(
        bid,
        actualTricks,
        isTrumpWinner,
        isPas,
        this.rules,
        totalBets
      );

      roundResults.push({
        playerIndex: i,
        bid,
        tricks: actualTricks,
        score: calc.score,
        made: calc.made,
        delta: calc.delta,
        explanation: calc.explanation,
        explanationHe: calc.explanationHe
      });
    }

    const finishedRound = {
      ...this.activeRound,
      results: roundResults,
      scores: roundResults.map(r => r.score),
      cumulativeScores: this.calculateCumulativeAfterRound(roundResults.map(r => r.score)),
      completedAt: new Date().toISOString()
    };

    this.completedRounds.push(finishedRound);

    // Check game termination conditions
    this.checkGameEnd();

    if (this.status !== 'FINISHED') {
      // Advance dealer and round
      this.currentDealerIndex = (this.currentDealerIndex + 1) % 4;
      this.roundNumber += 1;
      this.activeRound = this.initDraftRound();
    }

    this.notify();
    return finishedRound;
  }

  calculateCumulativeAfterRound(newScores) {
    const currentTotals = this.getCumulativeScores();
    return currentTotals.map((tot, i) => tot + newScores[i]);
  }

  getCumulativeScores() {
    const totals = [0, 0, 0, 0];
    for (const round of this.completedRounds) {
      for (let i = 0; i < 4; i++) {
        totals[i] += round.scores[i] || 0;
      }
    }
    return totals;
  }

  getRankings() {
    const cumulative = this.getCumulativeScores();
    return this.players.map((p, index) => ({
      index,
      player: p,
      score: cumulative[index]
    })).sort((a, b) => b.score - a.score);
  }

  checkGameEnd() {
    if (this.maxRounds && this.completedRounds.length >= this.maxRounds) {
      this.status = 'FINISHED';
      return;
    }

    if (this.targetPoints) {
      const scores = this.getCumulativeScores();
      if (scores.some(s => s >= this.targetPoints)) {
        this.status = 'FINISHED';
      }
    }
  }

  /**
   * Undo the most recent completed round
   */
  undoLastRound() {
    if (this.completedRounds.length === 0) return false;
    const lastRound = this.completedRounds.pop();
    this.roundNumber = lastRound.roundNumber;
    this.currentDealerIndex = lastRound.dealerIndex;
    this.activeRound = {
      roundNumber: lastRound.roundNumber,
      dealerIndex: lastRound.dealerIndex,
      leadBidderIndex: lastRound.leadBidderIndex,
      stage: 'TRICKS',
      trump: { ...lastRound.trump },
      bets: [...lastRound.bets],
      tricks: [...lastRound.tricks],
      scores: [0, 0, 0, 0],
      roundTotalBets: lastRound.roundTotalBets,
      bettingMode: lastRound.bettingMode,
      timestamp: lastRound.timestamp
    };
    this.status = 'IN_PROGRESS';
    this.notify();
    return true;
  }

  /**
   * Update Player Details
   */
  updatePlayer(index, name, color, avatar) {
    if (index >= 0 && index < 4) {
      this.players[index] = {
        ...this.players[index],
        name: name || this.players[index].name,
        color: color || this.players[index].color,
        avatar: avatar || this.players[index].avatar
      };
      this.notify();
    }
  }

  /**
   * LocalStorage persistence
   */
  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      const serialized = JSON.stringify({
        id: this.id,
        createdAt: this.createdAt,
        rules: this.rules,
        targetPoints: this.targetPoints,
        maxRounds: this.maxRounds,
        players: this.players,
        currentDealerIndex: this.currentDealerIndex,
        roundNumber: this.roundNumber,
        completedRounds: this.completedRounds,
        activeRound: this.activeRound,
        status: this.status
      });
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  static loadFromStorage() {
    if (typeof localStorage === 'undefined') return new GameSession();
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return new GameSession(parsed);
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    }
    return new GameSession();
  }

  static clearStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('LocalStorage clear failed:', e);
    }
  }

  exportJson() {
    return JSON.stringify({
      app: 'Israeli Whist Scorekeeper',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      session: {
        id: this.id,
        createdAt: this.createdAt,
        rules: this.rules,
        targetPoints: this.targetPoints,
        maxRounds: this.maxRounds,
        players: this.players,
        completedRounds: this.completedRounds,
        scores: this.getCumulativeScores(),
        rankings: this.getRankings()
      }
    }, null, 2);
  }
}
