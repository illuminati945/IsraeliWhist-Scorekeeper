import { calculatePlayerScore, validateBetsHook, validateTricksSum, getDealerForbiddenBet, RULE_PRESETS } from './src/js/engine/whist-rules.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- Testing Israeli Whist Rules Engine ---');

// Test 1: Standard Exact Made Formula: 10 + Bid^2
// Bid 0 -> +50
const s0 = calculatePlayerScore(0, 0, false, false, RULE_PRESETS.STANDARD, 14);
assert(s0.score === 50 && s0.made === true, 'Bid 0 Made = +50 pts');

// Bid 1 -> 10 + 1^2 = 11
const s1 = calculatePlayerScore(1, 1, false, false, RULE_PRESETS.STANDARD, 12);
assert(s1.score === 11 && s1.made === true, 'Bid 1 Made = +11 pts (10 + 1^2)');

// Bid 4 -> 10 + 4^2 = 26
const s4 = calculatePlayerScore(4, 4, false, false, RULE_PRESETS.STANDARD, 14);
assert(s4.score === 26 && s4.made === true, 'Bid 4 Made = +26 pts (10 + 4^2)');

// Bid 5 -> 10 + 5^2 = 35
const s5 = calculatePlayerScore(5, 5, false, false, RULE_PRESETS.STANDARD, 14);
assert(s5.score === 35 && s5.made === true, 'Bid 5 Made = +35 pts (10 + 5^2)');

// Bid 13 -> 10 + 13^2 = 179
const s13 = calculatePlayerScore(13, 13, false, false, RULE_PRESETS.STANDARD, 14);
assert(s13.score === 179 && s13.made === true, 'Bid 13 Made = +179 pts (10 + 13^2)');

// Test 2: Standard Miss Formula: -10 * |diff|
// Bid 4, Took 2 -> diff 2 -> -20
const m4_2 = calculatePlayerScore(4, 2, false, false, RULE_PRESETS.STANDARD, 14);
assert(m4_2.score === -20 && m4_2.made === false, 'Bid 4, Took 2 = -20 pts (-10 * 2)');

// Bid 2, Took 5 -> diff 3 -> -30
const m2_5 = calculatePlayerScore(2, 5, false, false, RULE_PRESETS.STANDARD, 14);
assert(m2_5.score === -30 && m2_5.made === false, 'Bid 2, Took 5 = -30 pts (-10 * 3)');

// Bid 0, Took 1 -> Pass failed -> -50
const m0_1 = calculatePlayerScore(0, 1, false, false, RULE_PRESETS.STANDARD, 14);
assert(m0_1.score === -50 && m0_1.made === false, 'Bid 0, Took 1 = -50 pts');

// Test 3: Pas Round
// Pas round, took 0 -> +50 bonus
const pas0 = calculatePlayerScore(0, 0, false, true, RULE_PRESETS.STANDARD, 0);
assert(pas0.score === 50 && pas0.made === true, 'Pas round 0 tricks = +50 pts');

// Pas round, took 3 -> 3 * -10 = -30
const pas3 = calculatePlayerScore(0, 3, false, true, RULE_PRESETS.STANDARD, 0);
assert(pas3.score === -30 && pas3.made === false, 'Pas round 3 tricks = -30 pts');

// Test 4: Hook Rule Validation
const hookEqual13 = validateBetsHook([3, 4, 2, 4]); // sum = 13
assert(hookEqual13.isValid === false && hookEqual13.status === 'HOOK_VIOLATION', 'Hook rule catches sum = 13');

const hookOver = validateBetsHook([4, 4, 3, 3]); // sum = 14
assert(hookOver.isValid === true && hookOver.status === 'OVER', 'Hook rule allows sum = 14 (OVER)');

const hookUnder = validateBetsHook([2, 3, 2, 3]); // sum = 10
assert(hookUnder.isValid === true && hookUnder.status === 'UNDER', 'Hook rule allows sum = 10 (UNDER)');

// Test 5: Dealer Forbidden Number Calculation
// previous bets [4, 3, 2] -> sum = 9 -> forbidden is 13 - 9 = 4
const forbidden = getDealerForbiddenBet([4, 3, 2]);
assert(forbidden === 4, 'Dealer forbidden bet for [4, 3, 2] is 4');

// Test 6: Tricks Sum
assert(validateTricksSum([4, 3, 2, 4]) === true, 'Tricks sum [4, 3, 2, 4] = 13 is valid');
assert(validateTricksSum([4, 3, 2, 5]) === false, 'Tricks sum [4, 3, 2, 5] = 14 is invalid');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
