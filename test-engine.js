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
// Bid 0 Made when Down (sum bets <= 13) -> +50
const s0_down = calculatePlayerScore(0, 0, false, false, RULE_PRESETS.STANDARD, 12);
assert(s0_down.score === 50 && s0_down.made === true, 'Bid 0 Made when Down = +50 pts');

// Bid 0 Made when Up (sum bets > 13) -> +30
const s0_up = calculatePlayerScore(0, 0, false, false, RULE_PRESETS.STANDARD, 14);
assert(s0_up.score === 30 && s0_up.made === true, 'Bid 0 Made when Up = +30 pts');

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

// Bid 0, Took 1 -> Pass failed (1 trick) -> -50
const m0_1 = calculatePlayerScore(0, 1, false, false, RULE_PRESETS.STANDARD, 14);
assert(m0_1.score === -50 && m0_1.made === false, 'Bid 0, Took 1 = -50 pts');

// Bid 0, Took 2 -> Pass failed (2 tricks) -> -40 (-50 + 10)
const m0_2 = calculatePlayerScore(0, 2, false, false, RULE_PRESETS.STANDARD, 14);
assert(m0_2.score === -40 && m0_2.made === false, 'Bid 0, Took 2 = -40 pts (-50 + 10)');

// Bid 0, Took 3 -> Pass failed (3 tricks) -> -30 (-50 + 20)
const m0_3 = calculatePlayerScore(0, 3, false, false, RULE_PRESETS.STANDARD, 14);
assert(m0_3.score === -30 && m0_3.made === false, 'Bid 0, Took 3 = -30 pts (-50 + 20)');

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

import { GameSession } from './src/js/engine/game-state.js';

console.log('--- Testing Seating Reorganization ---');
const sess = new GameSession({
  players: [
    { name: 'Alice', color: '#6366f1' },
    { name: 'Bob', color: '#10b981' },
    { name: 'Charlie', color: '#f59e0b' },
    { name: 'Diana', color: '#ec4899' }
  ],
  currentDealerIndex: 1
});

// Swap Alice (0) and Charlie (2)
sess.swapPlayers(0, 2);
assert(sess.players[0].name === 'Charlie', 'Alice & Charlie swapped seat 0');
assert(sess.players[2].name === 'Alice', 'Alice & Charlie swapped seat 2');
assert(sess.currentDealerIndex === 1, 'Bob remains dealer at index 1');

// Swap Bob (dealer at 1) and Diana (3)
sess.swapPlayers(1, 3);
assert(sess.players[1].name === 'Diana', 'Diana is now at seat 1');
assert(sess.players[3].name === 'Bob', 'Bob is now at seat 3');
assert(sess.currentDealerIndex === 3, 'Dealer index followed Bob to seat 3');

// Rotate clockwise
// Order was: [0: Charlie, 1: Diana, 2: Alice, 3: Bob]
// After clockwise: [0: Bob, 1: Charlie, 2: Diana, 3: Alice]
sess.rotateSeatingClockwise();
assert(sess.players[0].name === 'Bob', 'Clockwise rotation puts Bob at 0');
assert(sess.players[1].name === 'Charlie', 'Clockwise rotation puts Charlie at 1');
assert(sess.currentDealerIndex === 0, 'Dealer followed Bob to seat 0');
