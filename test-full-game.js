import { GameSession } from './src/js/engine/game-state.js';
import { calculateGameStatistics } from './src/js/engine/statistics.js';

console.log('=== Simulating Full Israeli Whist Match ===');

const session = new GameSession({
  players: [
    { id: 'p0', name: 'Alice (אליס)', color: '#3b82f6', avatar: '🦁' },
    { id: 'p1', name: 'Bob (בוב)', color: '#10b981', avatar: '🦅' },
    { id: 'p2', name: 'Charlie (צ\'רלי)', color: '#f59e0b', avatar: '🦊' },
    { id: 'p3', name: 'Diana (דיאנה)', color: '#ec4899', avatar: '🐺' }
  ]
});

// Round 1: Alice is dealer (idx 0). Lead bidder is Bob (idx 1).
// Trump auction won by Bob with 5 Hearts.
console.log('--- Round 1 ---');
session.setTrump(1, 'HEARTS', 5, false);

// Bets: Bob = 5, Charlie = 3, Diana = 0 (Pass), Alice (Dealer) tries to bid 5 (sum would be 5+3+0+5 = 13 -> Hook violation!)
session.setBet(1, 5);
session.setBet(2, 3);
session.setBet(3, 0);

const forbiddenForAlice = session.getDealerForbiddenNumber();
console.log(`Dealer Alice cannot bid: ${forbiddenForAlice}`);
if (forbiddenForAlice !== 5) {
  throw new Error(`Expected forbidden bet to be 5, got ${forbiddenForAlice}`);
}

// Alice bids 4 instead (Total sum = 12 -> UNDER)
session.setBet(0, 4);
session.proceedToTricks();

// Tricks taken: Bob = 5 (Made exact!), Charlie = 4 (Missed by 1), Diana = 0 (Pass made exact!), Alice = 4 (Made exact!)
session.setTricks(1, 5);
session.setTricks(2, 4);
session.setTricks(3, 0);
session.setTricks(0, 4);

const r1 = session.commitRound();
console.log('Round 1 Scores:', r1.scores);
// Bob (5 made) = 10 + 25 = +35
// Charlie (bid 3, took 4) = -10
// Diana (bid 0, took 0) = +50
// Alice (bid 4, took 4) = 10 + 16 = +26

if (r1.scores[1] !== 35 || r1.scores[2] !== -10 || r1.scores[3] !== 50 || r1.scores[0] !== 26) {
  throw new Error(`Unexpected Round 1 scores: ${JSON.stringify(r1.scores)}`);
}

// Cumulative check
console.log('Cumulative Scores after R1:', session.getCumulativeScores());

// Round 2: Dealer rotates to Bob (idx 1).
if (session.currentDealerIndex !== 1) {
  throw new Error(`Expected dealer to be 1, got ${session.currentDealerIndex}`);
}

// Stats verification
const stats = calculateGameStatistics(session);
console.log(`Leader: ${stats.rankings[0].player.name} with ${stats.rankings[0].totalScore} pts`);
console.log('✓ Full match simulation passed successfully!');
