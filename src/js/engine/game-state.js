/**
 * Israeli Whist Game State & Session Manager
 */
import { RULE_PRESETS, calculatePlayerScore, validateBetsHook, validateTricksSum } from './whist-rules.js';

const STORAGE_KEY = 'israeli_whist_current_game_v2';

export class GameSession {
  constructor(options = {}) {
    this.id = options.id || 'game_' + Date.now();
    this.createdAt = options.createdAt || new Date().toISOString();
    this.rules = options.rules || { ...RULE_PRESETS.STANDARD };
    this.targetPoints = options.targetPoints || null;
    this.maxRounds = options.maxRounds || null;
    this.simplifiedMode = options.simplifiedMode !== undefined ? options.simplifiedMode : true;
    
    this.players = options.players || [
      { id: 'p0', name: 'Player 1', color: '#6366f1', initial: '1' },
      { id: 'p1', name: 'Player 2', color: '#10b981', initial: '2' },
      { id: 'p2', name: 'Player 3', color: '#f59e0b', initial: '3' },
      { id: 'p3', name: 'Player 4', color: '#ec4899', initial: '4' }
    ];

    this.currentDealerIndex = options.currentDealerIndex ?? 0;
    this.roundNumber = options.roundNumber || 1;
    this.completedRounds = options.completedRounds || [];
    
    this.activeRound = options.activeRound || this.initDraftRound();
    this.status = options.status || 'IN_PROGRESS';
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
      stage: this.simplifiedMode ? 'BETS' : 'TRUMP',
      trump: {
        winnerIndex: null,
        suitId: 'NT',
        bidAmount: 0,
        isPasRound: false
      },
      bets: [null, null, null, null],
      tricks: [null, null, null, null],
      scores: [0, 0, 0, 0],
      roundTotalBets: 0,
      bettingMode: null,
      timestamp: new Date().toISOString()
    };
  }

  setSimplifiedMode(isSimplified) {
    this.simplifiedMode = isSimplified;
    if (this.activeRound) {
      if (isSimplified && this.activeRound.stage === 'TRUMP') {
        this.activeRound.stage = 'BETS';
      } else if (!isSimplified && this.activeRound.stage === 'BETS' && this.activeRound.bets.every(b => b === null)) {
        this.activeRound.stage = 'TRUMP';
      }
    }
    this.notify();
  }

  getFirstBidderIndex() {
    if (!this.simplifiedMode && this.activeRound.trump.winnerIndex !== null && !this.activeRound.trump.isPasRound) {
      return this.activeRound.trump.winnerIndex;
    }
    return (this.currentDealerIndex + 1) % 4;
  }

  getLastBidderIndex() {
    if (this.simplifiedMode) return null;
    const firstBidder = this.getFirstBidderIndex();
    return (firstBidder + 3) % 4;
  }

  getBiddingOrder() {
    const first = this.getFirstBidderIndex();
    return [
      first,
      (first + 1) % 4,
      (first + 2) % 4,
      (first + 3) % 4
    ];
  }

  getForbiddenBetForLastBidder() {
    if (this.simplifiedMode) return null;
    const lastBidderIdx = this.getLastBidderIndex();
    if (lastBidderIdx === null) return null;

    const otherBets = [];
    for (let i = 0; i < 4; i++) {
      if (i !== lastBidderIdx) {
        if (typeof this.activeRound.bets[i] === 'number' && !isNaN(this.activeRound.bets[i])) {
          otherBets.push(this.activeRound.bets[i]);
        }
      }
    }
    if (otherBets.length === 3) {
      const sum = otherBets.reduce((a, b) => a + b, 0);
      const forbidden = 13 - sum;
      if (forbidden >= 0 && forbidden <= 13) {
        return forbidden;
      }
    }
    return null;
  }

  setTrump(winnerIndex, suitId, bidAmount, isPasRound = false) {
    this.activeRound.trump = {
      winnerIndex: isPasRound ? null : winnerIndex,
      suitId: isPasRound ? 'NT' : suitId,
      bidAmount: isPasRound ? 0 : bidAmount,
      isPasRound
    };

    if (!isPasRound && winnerIndex !== null && typeof winnerIndex === 'number') {
      if (this.activeRound.bets[winnerIndex] === null || this.activeRound.bets[winnerIndex] < bidAmount) {
        this.activeRound.bets[winnerIndex] = bidAmount;
      }
    }

    this.activeRound.stage = 'BETS';
    this.notify();
  }

  setBet(playerIndex, amount) {
    if (playerIndex < 0 || playerIndex > 3) return;
    this.activeRound.bets[playerIndex] = amount;
    
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

  proceedToTricks() {
    const filledBets = this.activeRound.bets.filter(b => typeof b === 'number' && !isNaN(b));
    if (filledBets.length !== 4 && !this.activeRound.trump.isPasRound) {
      throw new Error('All 4 players must submit bets.');
    }

    if (this.rules.enforceHookRule && !this.activeRound.trump.isPasRound) {
      const hookCheck = validateBetsHook(this.activeRound.bets);
      if (!hookCheck.isValid) {
        throw new Error('Total bets cannot equal 13 (Hook Rule). Please adjust the bids.');
      }
    }

    this.activeRound.stage = 'TRICKS';
    this.notify();
  }

  setTricks(playerIndex, amount) {
    if (playerIndex < 0 || playerIndex > 3) return;
    this.activeRound.tricks[playerIndex] = amount;
    this.notify();
  }

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

  commitRound() {
    const tricks = this.activeRound.tricks;
    if (!validateTricksSum(tricks)) {
      throw new Error('Total tricks must equal 13.');
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
        explanation: calc.explanation
      });
    }

    const finishedRound = {
      ...this.activeRound,
      simplified: this.simplifiedMode,
      results: roundResults,
      scores: roundResults.map(r => r.score),
      cumulativeScores: this.calculateCumulativeAfterRound(roundResults.map(r => r.score)),
      completedAt: new Date().toISOString()
    };

    this.completedRounds.push(finishedRound);
    this.checkGameEnd();

    if (this.status !== 'FINISHED') {
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

  updatePlayer(index, name, color) {
    if (index >= 0 && index < 4) {
      this.players[index] = {
        ...this.players[index],
        name: name || this.players[index].name,
        color: color || this.players[index].color
      };
      this.notify();
    }
  }

  saveToStorage() {
    if (typeof localStorage === 'undefined') return;
    try {
      const serialized = JSON.stringify({
        id: this.id,
        createdAt: this.createdAt,
        rules: this.rules,
        targetPoints: this.targetPoints,
        maxRounds: this.maxRounds,
        simplifiedMode: this.simplifiedMode,
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
        simplifiedMode: this.simplifiedMode,
        players: this.players,
        completedRounds: this.completedRounds,
        scores: this.getCumulativeScores(),
        rankings: this.getRankings()
      }
    }, null, 2);
  }
}
