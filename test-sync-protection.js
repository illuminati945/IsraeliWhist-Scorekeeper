import { isStateRegression } from './server.js';
import { GameSession } from './src/js/engine/game-state.js';

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

console.log('--- Testing Game Session Protection & Anti-Regression Engine ---');

const existingActiveGame = {
  id: 'game_12345',
  players: [
    { id: 'p0', name: 'Alice' },
    { id: 'p1', name: 'Bob' },
    { id: 'p2', name: 'Charlie' },
    { id: 'p3', name: 'Diana' }
  ],
  completedRounds: [
    { roundNumber: 1 },
    { roundNumber: 2 },
    { roundNumber: 3 }
  ]
};

// Test 1: Brand new game allows write
assert(!isStateRegression(null, existingActiveGame), 'New room allows first game save');

// Test 2: Incoming game has 0 rounds, but existing has 3 rounds -> MUST BE REJECTED
const incomingBlankGame = {
  id: 'game_blank',
  players: [
    { id: 'p0', name: 'Player 1' },
    { id: 'p1', name: 'Player 2' },
    { id: 'p2', name: 'Player 3' },
    { id: 'p3', name: 'Player 4' }
  ],
  completedRounds: []
};
assert(isStateRegression(existingActiveGame, incomingBlankGame), 'Reject incoming 0-round game when existing has 3 rounds');

// Test 3: Existing game has custom names at round 0; incoming has default Player 1..4 -> MUST BE REJECTED
const existingRoundZeroCustomNames = {
  id: 'game_custom',
  players: [
    { id: 'p0', name: 'איתי' },
    { id: 'p1', name: 'אביגיל' },
    { id: 'p2', name: 'איל' },
    { id: 'p3', name: 'יותם' }
  ],
  completedRounds: []
};
assert(isStateRegression(existingRoundZeroCustomNames, incomingBlankGame), 'Reject default Player 1..4 names from overwriting custom Hebrew player names');

// Test 4: Incoming game is a forward progression (round 4 added) -> MUST BE ALLOWED
const incomingRound4Game = {
  id: 'game_12345',
  players: existingActiveGame.players,
  completedRounds: [
    { roundNumber: 1 },
    { roundNumber: 2 },
    { roundNumber: 3 },
    { roundNumber: 4 }
  ]
};
assert(!isStateRegression(existingActiveGame, incomingRound4Game), 'Allow valid forward round progression (round 4)');

// Test 5: Legitimate single-round undo (from 3 rounds to 2 rounds, same ID) -> MUST BE ALLOWED
const incomingLegitUndo = {
  id: 'game_12345',
  players: existingActiveGame.players,
  completedRounds: [
    { roundNumber: 1 },
    { roundNumber: 2 }
  ]
};
assert(!isStateRegression(existingActiveGame, incomingLegitUndo), 'Allow legitimate single-round undo (round 3 -> 2)');

// Test 6: Illegitimate multi-round jump or different ID -> MUST BE REJECTED
const incomingBogusUndo = {
  id: 'game_different_id',
  players: existingActiveGame.players,
  completedRounds: [
    { roundNumber: 1 }
  ]
};
assert(isStateRegression(existingActiveGame, incomingBogusUndo), 'Reject illegitimate multi-round jump or mismatched ID');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
