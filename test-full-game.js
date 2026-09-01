import { GameSession } from './src/js/engine/game-state.js';

console.log('=== Testing Hook Rule in Simplified & Full Modes ===');

// Test 1: Simplified Mode (no specific person blocked, whole-round validation)
const sessionSimple = new GameSession({
  simplifiedMode: true,
  players: [
    { id: 'p0', name: 'Alice' },
    { id: 'p1', name: 'Bob' },
    { id: 'p2', name: 'Charlie' },
    { id: 'p3', name: 'Diana' }
  ]
});

// In simplified mode, getForbiddenBetForLastBidder returns null (no individual pre-emptively blocked)
const simpleForbidden = sessionSimple.getForbiddenBetForLastBidder();
console.log('Simplified mode individual forbidden bet:', simpleForbidden);
if (simpleForbidden !== null) {
  throw new Error('Expected no individual forbidden bet in simplified mode');
}

// If all 4 enter bets that equal 13 (4 + 3 + 3 + 3 = 13), proceedToTricks throws error
sessionSimple.setBet(0, 4);
sessionSimple.setBet(1, 3);
sessionSimple.setBet(2, 3);
sessionSimple.setBet(3, 3);

let errorCaught = false;
try {
  sessionSimple.proceedToTricks();
} catch (e) {
  errorCaught = true;
  console.log('✓ Correctly caught Hook violation error in simplified mode:', e.message);
}
if (!errorCaught) {
  throw new Error('Expected proceedToTricks to throw error when sum equals 13 in simplified mode');
}

// Adjust Diana's bet to 4 -> Sum = 14 (OVER) -> Valid
sessionSimple.setBet(3, 4);
sessionSimple.proceedToTricks();
console.log('✓ Simplified mode allows valid sum (14) to proceed to tricks!');

// Test 2: Full Mode with Trump Maker
const sessionFull = new GameSession({
  simplifiedMode: false,
  players: [
    { id: 'p0', name: 'Alice (Dealer)' },
    { id: 'p1', name: 'Bob' },
    { id: 'p2', name: 'Charlie (Trump Maker)' },
    { id: 'p3', name: 'Diana' }
  ]
});

sessionFull.setTrump(2, 'HEARTS', 5);
const lastBidder = sessionFull.getLastBidderIndex();
if (lastBidder !== 1) throw new Error(`Expected last bidder to be Bob (1), got ${lastBidder}`);

sessionFull.setBet(2, 5);
sessionFull.setBet(3, 3);
sessionFull.setBet(0, 2);

const forbiddenForBob = sessionFull.getForbiddenBetForLastBidder();
if (forbiddenForBob !== 3) throw new Error(`Expected forbidden bet for Bob to be 3, got ${forbiddenForBob}`);

console.log('✓ Full Mode last-bidder test passed!');
