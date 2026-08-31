/**
 * Israeli Whist (וויסט ישראלי) Rules & Scoring Engine
 */

export const RULE_PRESETS = {
  STANDARD: {
    id: 'STANDARD',
    nameEn: 'Standard Israeli Whist',
    nameHe: 'וויסט ישראלי סטנדרטי (ריבועי)',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -10 × diff | Pass (0): +50 / -50 | Hook Rule active',
    descriptionHe: 'עמידה בחוזה: 10+ריבוע | נפילה: -10 לכל סטייה | פאס (0): +50 / -50 | חוק ההוק פעיל',
    bidMadeFormula: 'QUADRATIC', // 10 + bid^2
    missPenaltyRate: 10,
    useProgressivePenalty: false,
    passMadeScore: 50,
    passMissPenalty: 50,
    passMissAdditionalPerTrick: 0, // e.g. 0 or 10
    pasRoundTrickPenalty: 10,
    pasRoundZeroBonus: 50,
    enforceHookRule: true,
    trumpMakerMissDoublePenalty: false,
  },
  PROGRESSIVE: {
    id: 'PROGRESSIVE',
    nameEn: 'Progressive Penalty (Tournament)',
    nameHe: 'ניקוד מדורג (טורניר)',
    descriptionEn: 'Exact Made: +10 + Bid² | Miss: -5/-10/-15/-20 per trick based on bid | Pass: +50/-50',
    descriptionHe: 'עמידה: 10+ריבוע | נפילה: -5/-10/-15/-20 לפי גובה ההכרזה | פאס: +50/-50',
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
    nameHe: 'קלאסי ליניארי (10 + 10×הכרזה)',
    descriptionEn: 'Exact Made: +10 + (Bid × 10) | Miss: -10 × diff | Pass: +50 / -50',
    descriptionHe: 'עמידה: 10 + (10 × הכרזה) | נפילה: -10 לכל סטייה | פאס: +50 / -50',
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
  { id: 'NT', symbol: 'NT', nameEn: 'No Trump', nameHe: 'ללא שליט', color: '#8b5cf6', rank: 5 },
  { id: 'SPADES', symbol: '♠', nameEn: 'Spades', nameHe: 'עלה (ספייד)', color: '#0f172a', rank: 4 },
  { id: 'HEARTS', symbol: '♥', nameEn: 'Hearts', nameHe: 'לב (הארט)', color: '#ef4444', rank: 3 },
  { id: 'DIAMONDS', symbol: '♦', nameEn: 'Diamonds', nameHe: 'יהלום (דיאמונד)', color: '#f59e0b', rank: 2 },
  { id: 'CLUBS', symbol: '♣', nameEn: 'Clubs', nameHe: 'תלתן (קלאב)', color: '#10b981', rank: 1 }
];

/**
 * Calculates score for a single player in a round
 * @param {number} bid - Number of tricks bid (0-13)
 * @param {number} tricks - Number of tricks actually taken (0-13)
 * @param {boolean} isTrumpMaker - Whether this player won the initial trump auction
 * @param {boolean} isPasRound - Whether all passed and round is played as Pas
 * @param {object} rules - Rule configuration object
 * @param {number} totalRoundBets - Sum of all 4 players' bets in the round
 * @returns {object} { score: number, made: boolean, delta: number, explanation: string, explanationHe: string }
 */
export function calculatePlayerScore(bid, tricks, isTrumpMaker = false, isPasRound = false, rules = RULE_PRESETS.STANDARD, totalRoundBets = 13) {
  // If special Pas Round (all passed trump stage)
  if (isPasRound) {
    if (tricks === 0) {
      const bonus = rules.pasRoundZeroBonus || 50;
      return {
        score: bonus,
        made: true,
        delta: 0,
        explanation: `Pas round: 0 tricks taken = +${bonus} bonus`,
        explanationHe: `סיבוב פאס: 0 לקיחות = בונוס +${bonus}`
      };
    } else {
      const penalty = -(tricks * (rules.pasRoundTrickPenalty || 10));
      return {
        score: penalty,
        made: false,
        delta: tricks,
        explanation: `Pas round: ${tricks} tricks taken × -${rules.pasRoundTrickPenalty || 10} = ${penalty}`,
        explanationHe: `סיבוב פאס: ${tricks} לקיחות × -${rules.pasRoundTrickPenalty || 10} = ${penalty}`
      };
    }
  }

  // Exact Made
  if (bid === tricks) {
    if (bid === 0) {
      // Pass (Zero) made
      let points = rules.passMadeScore;
      if (rules.passOverUnderDifference && totalRoundBets > 13) {
        points = rules.passMadeScoreOver || 25;
      }
      return {
        score: points,
        made: true,
        delta: 0,
        explanation: `Pass (0) made exactly: +${points} pts`,
        explanationHe: `פאס (0) בוצע במדויק: +${points} נקודות`
      };
    } else {
      // Regular Made (bid >= 1)
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
        explanation: `Bid ${bid}, Made ${tricks}: +10 + (${bid}²) = +${points} pts`,
        explanationHe: `הכרזה ${bid}, נלקחו ${tricks}: 10 + (${bid}²) = +${points} נק׳`
      };
    }
  }

  // Failed / Missed Contract
  const diff = Math.abs(tricks - bid);

  if (bid === 0) {
    // Pass failed
    let penalty = -rules.passMissPenalty;
    if (rules.passMissAdditionalPerTrick > 0 && tricks > 1) {
      penalty -= (tricks - 1) * rules.passMissAdditionalPerTrick;
    }
    return {
      score: penalty,
      made: false,
      delta: diff,
      explanation: `Pass (0) failed! Took ${tricks} tricks: ${penalty} pts`,
      explanationHe: `פאס (0) נפל! נלקחו ${tricks} לקיחות: ${penalty} נק׳`
    };
  }

  // Regular bid failed
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
    explanation: `Bid ${bid}, Took ${tricks} (diff ${diff} × -${penaltyRate}): ${penalty} pts`,
    explanationHe: `הכרזה ${bid}, נלקחו ${tricks} (סטייה ${diff} × -${penaltyRate}): ${penalty} נק׳`
  };
}

/**
 * Validates whether the 4 bets sum is allowed under Dealer Hook Rule
 * @param {Array<number>} bets - Array of 4 bets [b0, b1, b2, b3]
 * @returns {object} { isValid: boolean, sum: number, status: 'OVER'|'UNDER'|'HOOK_VIOLATION' }
 */
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

/**
 * Computes the forbidden bet for the last bidder (dealer)
 * @param {Array<number>} previousBets - Array of first 3 bets
 * @returns {number|null} The bet number forbidden (0-13), or null if out of range
 */
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

/**
 * Validates that tricks taken sum to exactly 13
 * @param {Array<number>} tricks - Array of 4 trick counts
 * @returns {boolean}
 */
export function validateTricksSum(tricks) {
  if (tricks.length !== 4) return false;
  const sum = tricks.reduce((acc, t) => acc + (typeof t === 'number' && !isNaN(t) ? t : 0), 0);
  return sum === 13;
}
