import { GameSession } from './src/js/engine/game-state.js';
import { RULE_PRESETS } from './src/js/engine/whist-rules.js';

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

console.log('--- Testing History Editing & Baseline Scores ---');

// Test 1: Baseline Starting Scores at Game Inception
const session = new GameSession({
  simplifiedMode: true,
  rules: { ...RULE_PRESETS.STANDARD },
  initialScores: [100, -30, 50, 20]
});

assert(
  session.getCumulativeScores()[0] === 100 &&
  session.getCumulativeScores()[1] === -30 &&
  session.getCumulativeScores()[2] === 50 &&
  session.getCumulativeScores()[3] === 20,
  'Initial scores correctly reflected before round 1'
);

// Test 2: Completing round 1 cascades from baseline
// Player 0: Bid 4, Took 4 -> +26 -> Total 126
// Player 1: Bid 3, Took 2 -> -10 -> Total -40
// Player 2: Bid 1, Took 1 -> +11 -> Total 61
// Player 3: Bid 5, Took 6 -> -10 -> Total 10
session.activeRound.bets = [4, 3, 1, 5];
session.activeRound.tricks = [4, 2, 1, 6];
session.commitRound();

assert(session.completedRounds.length === 1, 'Round 1 completed');
assert(session.getCumulativeScores()[0] === 126, 'Player 0 total is 100 + 26 = 126');
assert(session.getCumulativeScores()[1] === -40, 'Player 1 total is -30 - 10 = -40');
assert(session.getCumulativeScores()[2] === 61, 'Player 2 total is 50 + 11 = 61');
assert(session.getCumulativeScores()[3] === 10, 'Player 3 total is 20 - 10 = 10');

// Test 3: Round 2
// Player 0: Bid 0, Took 0 -> +50 -> Total 176
// Player 1: Bid 4, Took 4 -> +26 -> Total -14
// Player 2: Bid 5, Took 5 -> +35 -> Total 96
// Player 3: Bid 4, Took 4 -> +26 -> Total 36
session.activeRound.bets = [0, 4, 5, 4];
session.activeRound.tricks = [0, 4, 5, 4];
session.commitRound();

assert(session.completedRounds.length === 2, 'Round 2 completed');
assert(session.getCumulativeScores()[0] === 176, 'Round 2 Player 0 cumulative is 176');
assert(session.getCumulativeScores()[1] === -14, 'Round 2 Player 1 cumulative is -14');

// Test 4: Round 3
// Player 0: Bid 2, Took 2 -> +14 -> Total 190
// Player 1: Bid 3, Took 3 -> +19 -> Total 5
// Player 2: Bid 4, Took 4 -> +26 -> Total 122
// Player 3: Bid 4, Took 4 -> +26 -> Total 62
session.activeRound.bets = [2, 3, 4, 4];
session.activeRound.tricks = [2, 3, 4, 4];
session.commitRound();

assert(session.completedRounds.length === 3, 'Round 3 completed');
assert(session.getCumulativeScores()[0] === 190, 'Round 3 Player 0 cumulative is 190');

// Test 5: Edit Round 1 (index 0) - Change Player 1 from Took 2 to Took 3 (Made contract +19 instead of -10)
// Player 3 must take 5 instead of 6 to keep total tricks = 13 (Player 3 Bid 5, Took 5 -> Made contract +35 instead of -10)
console.log('Editing Round 1...');
session.editCompletedRound(0, {
  bets: [4, 3, 1, 5],
  tricks: [4, 3, 1, 5]
});

// Verification:
// Round 1 new scores:
// P0: 4/4 -> +26 (Total: 100 + 26 = 126)
// P1: 3/3 -> +19 (Total: -30 + 19 = -11)
// P2: 1/1 -> +11 (Total: 50 + 11 = 61)
// P3: 5/5 -> +35 (Total: 20 + 35 = 55)
assert(session.completedRounds[0].cumulativeScores[1] === -11, 'Round 1 P1 recalculated to -11');
assert(session.completedRounds[0].cumulativeScores[3] === 55, 'Round 1 P3 recalculated to 55');

// Round 2 cumulative should cascade forward:
// P1: -11 + 26 = 15 (was -14)
// P3: 55 + 26 = 81 (was 36)
assert(session.completedRounds[1].cumulativeScores[1] === 15, 'Round 2 P1 cascaded forward to 15');
assert(session.completedRounds[1].cumulativeScores[3] === 81, 'Round 2 P3 cascaded forward to 81');

// Round 3 cumulative should cascade forward:
// P1: 15 + 19 = 34 (was 5)
// P3: 81 + 26 = 107 (was 62)
assert(session.getCumulativeScores()[1] === 34, 'Round 3 P1 cascaded forward to 34');
assert(session.getCumulativeScores()[3] === 107, 'Round 3 P3 cascaded forward to 107');

// Test 6: Adjust Baseline Scores mid-game
console.log('Adjusting baseline scores mid-game...');
// Change baseline from [100, -30, 50, 20] to [0, 0, 0, 0]
session.setInitialScores([0, 0, 0, 0]);
// P0 total was 190 (with 100 baseline) -> now 90
// P1 total was 34 (with -30 baseline) -> now 64
// P2 total was 122 (with 50 baseline) -> now 72
// P3 total was 107 (with 20 baseline) -> now 87
assert(session.getCumulativeScores()[0] === 90, 'P0 total updated to 90 after baseline cleared');
assert(session.getCumulativeScores()[1] === 64, 'P1 total updated to 64 after baseline cleared');
assert(session.getCumulativeScores()[2] === 72, 'P2 total updated to 72 after baseline cleared');
assert(session.getCumulativeScores()[3] === 87, 'P3 total updated to 87 after baseline cleared');

// Test 7: Delete Round 2
console.log('Deleting round 2...');
session.deleteCompletedRound(1);
assert(session.completedRounds.length === 2, '2 completed rounds remain');
assert(session.completedRounds[1].roundNumber === 2, 'Remaining round re-indexed to #2');
assert(session.roundNumber === 3, 'Active round number is 3');

// Test 8: Reorder players preserves initialScores
session.setInitialScores([10, 20, 30, 40]);
session.reorderPlayers([3, 2, 1, 0]); // Reverse order
assert(
  session.initialScores[0] === 40 &&
  session.initialScores[1] === 30 &&
  session.initialScores[2] === 20 &&
  session.initialScores[3] === 10,
  'initialScores remapped after player reorder'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
