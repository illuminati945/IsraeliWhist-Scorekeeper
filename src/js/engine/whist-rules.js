/**
 * Israeli Whist Rules & Scoring Engine
 */

export const RULE_PRESETS = {
  STANDARD: {
    id: 'STANDARD',
    nameEn: 'Standard Israeli Whist (Quadratic)',
    nameHe: 'Standard Israeli Whist',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -10 × diff | Pass (0): +50 down / +30 up, -50 + 10/trick | Hook Rule: On',
    descriptionHe: 'מדויק: 10 + הכרזה² | החטאה: 10- לכל הפרש | פאס: 50+ בחסר / 30+ ביתר, 50- ו-10+ לכל לקיחה נוספת | חוק ההוק',
    bidMadeFormula: 'QUADRATIC',
    missPenaltyRate: 10,
    useProgressivePenalty: false,
    passMadeScoreDown: 50,
    passMadeScoreUp: 30,
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissBonusPerTrick: 10,
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  },
  PROGRESSIVE: {
    id: 'PROGRESSIVE',
    nameEn: 'Progressive Penalty (Tournament)',
    nameHe: 'Progressive Penalty (Tournament)',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -5/-10/-15/-20 per trick by bid | Pass: +50 down / +30 up, -50 + 10/trick',
    descriptionHe: 'מדויק: 10 + הכרזה² | החטאה פרוגרסיבית לפי הכרזה | פאס: 50+ בחסר / 30+ ביתר, 50- ו-10+ לכל לקיחה נוספת',
    bidMadeFormula: 'QUADRATIC',
    missPenaltyRate: 10,
    useProgressivePenalty: true,
    progressiveRates: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 10, 6: 15, 7: 20 },
    passMadeScoreDown: 50,
    passMadeScoreUp: 30,
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissBonusPerTrick: 10,
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  },
  CLASSIC_LINEAR: {
    id: 'CLASSIC_LINEAR',
    nameEn: 'Classic Linear (10 + 10xBid)',
    nameHe: 'Classic Linear (10 + 10xBid)',
    descriptionEn: 'Exact Made: +10 + (Bid × 10) | Miss: -10 × diff | Pass: +50 down / +30 up, -50 + 10/trick',
    descriptionHe: 'מדויק: 10 + (10 × הכרזה) | החטאה: 10- לכל הפרש | פאס: 50+ בחסר / 30+ ביתר, 50- ו-10+ לכל לקיחה נוספת',
    bidMadeFormula: 'LINEAR_10',
    missPenaltyRate: 10,
    useProgressivePenalty: false,
    passMadeScoreDown: 50,
    passMadeScoreUp: 30,
    passMissPenalty: 50,
    passMissBonusPerTrick: 10,
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
      const isUp = totalRoundBets > 13;
      const scoreDown = rules.passMadeScoreDown ?? (rules.passMadeScore || 50);
      const scoreUp = rules.passMadeScoreUp ?? (rules.passMadeScoreOver || 30);
      const points = isUp ? scoreUp : scoreDown;
      const modeText = isUp ? 'Up / יתר' : 'Down / חסר';
      return {
        score: points,
        made: true,
        delta: 0,
        explanation: `Pass (0) made (${modeText}): +${points} pts`
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
    const basePenalty = rules.passMissPenalty ?? 50;
    const bonusPerTrick = rules.passMissBonusPerTrick ?? 10;
    // 1 trick: -50; each subsequent trick: +10 pts (e.g. 2 tricks = -40, 3 tricks = -30)
    const penalty = -basePenalty + (tricks - 1) * bonusPerTrick;
    const explanation = tricks === 1
      ? `Pass (0) missed (1 trick): -${basePenalty} pts`
      : `Pass (0) missed (${tricks} tricks): -${basePenalty} + ${(tricks - 1) * bonusPerTrick} = ${penalty >= 0 ? '+' : ''}${penalty} pts`;

    return {
      score: penalty,
      made: false,
      delta: diff,
      explanation
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
