import { GameSession } from './src/js/engine/game-state.js';

console.log('=== Simulating Israeli Whist Last-Bidder Hook Rule ===');

// Test 1: Full Mode with Trump Maker
const sessionFull = new GameSession({
  simplifiedMode: false,
  players: [
    { id: 'p0', name: 'Alice (Dealer)' },
    { id: 'p1', name: 'Bob' },
    { id: 'p2', name: 'Charlie (Trump Maker)' },
    { id: 'p3', name: 'Diana' }
  ]
});

// Alice is dealer (idx 0). Charlie (idx 2) wins the trump auction.
sessionFull.setTrump(2, 'HEARTS', 5);

// Bidding sequence:
// 1st bidder: Charlie (idx 2, Trump Maker)
// 2nd bidder: Diana (idx 3)
// 3rd bidder: Alice (idx 0, Dealer)
// 4th / Last bidder: Bob (idx 1, sitting right before Charlie)

const firstBidder = sessionFull.getFirstBidderIndex();
const lastBidder = sessionFull.getLastBidderIndex();

console.log(`First bidder (Trump Maker): Player ${firstBidder} (Charlie)`);
console.log(`Last bidder (Hook Rule applied): Player ${lastBidder} (Bob)`);

if (firstBidder !== 2) throw new Error(`Expected first bidder to be Charlie (2), got ${firstBidder}`);
if (lastBidder !== 1) throw new Error(`Expected last bidder to be Bob (1), got ${lastBidder}`);

// Enter bets for Charlie (5), Diana (3), Alice (2) -> Sum = 10
sessionFull.setBet(2, 5);
sessionFull.setBet(3, 3);
sessionFull.setBet(0, 2);

const forbiddenForBob = sessionFull.getForbiddenBetForLastBidder();
console.log(`Forbidden bet for Last Bidder (Bob): ${forbiddenForBob}`);

if (forbiddenForBob !== 3) {
  throw new Error(`Expected forbidden bet for Bob to be 3 (13 - 10), got ${forbiddenForBob}`);
}

// Bob bids 4 -> Total = 14 (OVER)
sessionFull.setBet(1, 4);
sessionFull.proceedToTricks();

console.log('✓ Full Mode last-bidder test passed!');

// Test 2: Simplified Mode
const sessionSimple = new GameSession({
  simplifiedMode: true,
  players: [
    { id: 'p0', name: 'Alice (Dealer)' },
    { id: 'p1', name: 'Bob' },
    { id: 'p2', name: 'Charlie' },
    { id: 'p3', name: 'Diana' }
  ]
});

// In simplified mode, Alice is dealer (idx 0). Lead bidder is Bob (idx 1).
// Last bidder is Alice (idx 0, dealer).
if (sessionSimple.getLastBidderIndex() !== 0) {
  throw new Error(`Expected last bidder in simplified to be dealer Alice (0), got ${sessionSimple.getLastBidderIndex()}`);
}

console.log('✓ Simplified Mode last-bidder test passed!');
