import { GameSession } from './src/js/engine/game-state.js';
import { calculateGameStatistics } from './src/js/engine/statistics.js';

console.log('=== Simulating Simplified Israeli Whist Match ===');

const session = new GameSession({
  simplifiedMode: true,
  players: [
    { id: 'p0', name: 'Alice', color: '#3b82f6' },
    { id: 'p1', name: 'Bob', color: '#10b981' },
    { id: 'p2', name: 'Charlie', color: '#f59e0b' },
    { id: 'p3', name: 'Diana', color: '#ec4899' }
  ]
});

// In simplified mode, session starts directly at BETS stage
if (session.activeRound.stage !== 'BETS') {
  throw new Error(`Expected stage to be BETS in simplified mode, got ${session.activeRound.stage}`);
}

// Deal 1: Alice is dealer (idx 0).
// Bids: Bob = 5, Charlie = 3, Diana = 0 (Pass), Alice = 4 (Total = 12 -> UNDER)
session.setBet(1, 5);
session.setBet(2, 3);
session.setBet(3, 0);

const forbiddenForAlice = session.getDealerForbiddenNumber();
console.log(`Dealer Alice cannot bid: ${forbiddenForAlice}`);
if (forbiddenForAlice !== 5) {
  throw new Error(`Expected forbidden bet to be 5, got ${forbiddenForAlice}`);
}

session.setBet(0, 4);
session.proceedToTricks();

// Tricks taken: Bob = 5, Charlie = 4, Diana = 0, Alice = 4
session.setTricks(1, 5);
session.setTricks(2, 4);
session.setTricks(3, 0);
session.setTricks(0, 4);

const r1 = session.commitRound();
console.log('Deal 1 Scores:', r1.scores);
// Bob (5 made) = 10 + 25 = +35
// Charlie (bid 3, took 4) = -10
// Diana (bid 0, took 0) = +50
// Alice (bid 4, took 4) = 10 + 16 = +26

if (r1.scores[1] !== 35 || r1.scores[2] !== -10 || r1.scores[3] !== 50 || r1.scores[0] !== 26) {
  throw new Error(`Unexpected Deal 1 scores: ${JSON.stringify(r1.scores)}`);
}

// Check next round starts directly at BETS stage
if (session.activeRound.stage !== 'BETS') {
  throw new Error(`Expected next round stage to be BETS, got ${session.activeRound.stage}`);
}

console.log('Cumulative Scores after Deal 1:', session.getCumulativeScores());
console.log('✓ Full simplified match simulation passed successfully!');
