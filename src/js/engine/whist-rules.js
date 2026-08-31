/**
 * Israeli Whist Rules & Scoring Engine
 */

export const RULE_PRESETS = {
  STANDARD: {
    id: 'STANDARD',
    nameEn: 'Standard Israeli Whist (Quadratic)',
    nameHe: 'Standard Israeli Whist',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -10 × diff | Pass (0): +50 / -50 | Hook Rule: On',
    descriptionHe: 'Exact Made: +10 + Bid² | Miss: -10 × diff | Pass (0): +50 / -50 | Hook Rule: On',
    bidMadeFormula: 'QUADRATIC',
    missPenaltyRate: 10,
    useProgressivePenalty: false,
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissAdditionalPerTrick: 0,
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  },
  PROGRESSIVE: {
    id: 'PROGRESSIVE',
    nameEn: 'Progressive Penalty (Tournament)',
    nameHe: 'Progressive Penalty (Tournament)',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -5/-10/-15/-20 per trick by bid | Pass: +50/-50',
    descriptionHe: 'Exact Made: +10 + Bid² | Miss: -5/-10/-15/-20 per trick by bid | Pass: +50/-50',
    bidMadeFormula: 'QUADRATIC',
    missPenaltyRate: 10,
    useProgressivePenalty: true,
    progressiveRates: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 10, 6: 15, 7: 20 },
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissAdditionalPerTrick: 0,
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  },
  CLASSIC_LINEAR: {
    id: 'CLASSIC_LINEAR',
    nameEn: 'Classic Linear (10 + 10xBid)',
    nameHe: 'Classic Linear (10 + 10xBid)',
    descriptionEn: 'Exact Made: +10 + (Bid × 10) | Miss: -10 × diff | Pass: +50 / -50',
    descriptionHe: 'Exact Made: +10 + (Bid × 10) | Miss: -10 × diff | Pass: +50 / -50',
    bidMadeFormula: 'LINEAR_10',
    missPenaltyRate: 10,
    useProgressivePenalty: false,
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissAdditionalPerTrick: 0,
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  }
};

export const SUITS = [
  { id: 'NT', symbol: 'NT', nameEn: 'No Trump', color: '#6366f1', rank: 5 },
  { id: 'SPADES', symbol: '♠', nameEn: 'Spades', color: '#94a3b8', rank: 4 },
  { id: 'HEARTS', symbol: '♥', nameEn: 'Hearts', color: '#f43f5e', rank: 3 },
  { id: 'DIAMONDS', symbol: '♦', nameEn: 'Diamonds', color: '#fbbf24', rank: 2 },
  { id: 'CLUBS', symbol: '♣', nameEn: 'Clubs', color: '#34d399', rank: 1 }
];

export function calculatePlayerScore(bid, tricks, isTrumpMaker = false, isPasRound = false, rules = RULE_PRESETS.STANDARD, totalRoundBets = 13) {
  if (isPasRound) {
    if (tricks === 0) {
      const bonus = rules.pasRoundZeroBonus || 50;
      return {
        score: bonus,
        made: true,
        delta: 0,
        explanation: `0 tricks taken: +${bonus} bonus`
      };
    } else {
      const penalty = -(tricks * (rules.pasRoundTrickPenalty || 10));
      return {
        score: penalty,
        made: false,
        delta: tricks,
        explanation: `${tricks} tricks taken × -${rules.pasRoundTrickPenalty || 10} = ${penalty}`
      };
    }
  }

  // Exact Made
  if (bid === tricks) {
    if (bid === 0) {
      let points = rules.passMadeScore;
      if (rules.passOverUnderDifference && totalRoundBets > 13) {
        points = rules.passMadeScoreOver || 25;
      }
      return {
        score: points,
        made: true,
        delta: 0,
        explanation: `Pass (0) made: +${points} pts`
      };
    } else {
      let points = 0;
      if (rules.bidMadeFormula === 'QUADRATIC') {
        points = 10 + (bid * bid);
      } else if (rules.bidMadeFormula === 'LINEAR_10') {
        points = 10 + (bid * 10);
      } else {
        points = 10 + (bid * bid);
      }

      return {
        score: points,
        made: true,
        delta: 0,
        explanation: `Bid ${bid} made: 10 + (${bid}²) = +${points} pts`
      };
    }
  }

  // Failed / Missed Contract
  const diff = Math.abs(tricks - bid);

  if (bid === 0) {
    let penalty = -rules.passMissPenalty;
    if (rules.passMissAdditionalPerTrick > 0 && tricks > 1) {
      penalty -= (tricks - 1) * rules.passMissAdditionalPerTrick;
    }
    return {
      score: penalty,
      made: false,
      delta: diff,
      explanation: `Pass (0) missed (${tricks} tricks taken): ${penalty} pts`
    };
  }

  let penaltyRate = rules.missPenaltyRate || 10;
  if (rules.useProgressivePenalty && rules.progressiveRates) {
    const cappedBid = Math.min(Math.max(bid, 1), 7);
    penaltyRate = rules.progressiveRates[cappedBid] || 10;
  }

  let penalty = -(diff * penaltyRate);

  if (isTrumpMaker && rules.trumpMakerMissDoublePenalty) {
    penalty *= 2;
  }

  return {
    score: penalty,
    made: false,
    delta: diff,
    explanation: `Bid ${bid}, took ${tricks} (${diff} diff × -${penaltyRate}): ${penalty} pts`
  };
}

export function validateBetsHook(bets) {
  const sum = bets.reduce((acc, b) => acc + (typeof b === 'number' && !isNaN(b) ? b : 0), 0);
  if (bets.length === 4 && bets.every(b => typeof b === 'number' && !isNaN(b))) {
    if (sum === 13) {
      return { isValid: false, sum, status: 'HOOK_VIOLATION' };
    }
    return {
      isValid: true,
      sum,
      status: sum > 13 ? 'OVER' : 'UNDER'
    };
  }
  return { isValid: true, sum, status: sum > 13 ? 'OVER' : 'UNDER' };
}

export function getDealerForbiddenBet(previousBets) {
  if (previousBets.length !== 3 || !previousBets.every(b => typeof b === 'number' && !isNaN(b))) {
    return null;
  }
  const sum = previousBets.reduce((a, b) => a + b, 0);
  const forbidden = 13 - sum;
  if (forbidden >= 0 && forbidden <= 13) {
    return forbidden;
  }
  return null;
}

export function validateTricksSum(tricks) {
  if (tricks.length !== 4) return false;
  const sum = tricks.reduce((acc, t) => acc + (typeof t === 'number' && !isNaN(t) ? t : 0), 0);
  return sum === 13;
}
