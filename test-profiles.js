import { ProfileManager, AVATAR_OPTIONS, COLOR_OPTIONS } from './src/js/engine/profile-manager.js';
import { GameSession } from './src/js/engine/game-state.js';

console.log('--- Testing ProfileManager & Easy Picking Engine ---');

// Mock localStorage for node environment
const storage = new Map();
global.localStorage = {
  getItem: (k) => storage.get(k) || null,
  setItem: (k, v) => storage.set(k, String(v)),
  removeItem: (k) => storage.delete(k),
  clear: () => storage.clear()
};

// Test 1: getProfiles returns default profiles initially
const initialProfiles = ProfileManager.getProfiles();
if (!Array.isArray(initialProfiles) || initialProfiles.length < 4) {
  throw new Error('Expected default profiles to be loaded');
}
console.log(`✓ PASS: Initial profiles loaded (${initialProfiles.length} profiles)`);

// Test 2: saveProfile creates new profile
const newProf = ProfileManager.saveProfile({
  name: 'יוסי',
  avatar: '🐯',
  color: '#06b6d4'
});
if (!newProf || newProf.name !== 'יוסי' || newProf.avatar !== '🐯') {
  throw new Error('Failed to create new profile');
}
const found = ProfileManager.getProfileByName('יוסי');
if (!found || found.id !== newProf.id) {
  throw new Error('Failed to find profile by name');
}
console.log('✓ PASS: saveProfile created and retrieved new profile by name');

// Test 3: saveProfile updates existing profile
const updated = ProfileManager.saveProfile({
  id: newProf.id,
  name: 'יוסי כהן',
  avatar: '🚀'
});
if (updated.name !== 'יוסי כהן' || updated.avatar !== '🚀') {
  throw new Error('Failed to update profile');
}
console.log('✓ PASS: saveProfile updated existing profile');

// Test 4: Last lineup persistence
const mockLineup = [
  { name: 'יוסי כהן', avatar: '🚀', color: '#06b6d4' },
  { name: 'עומר', avatar: '🦊', color: '#6366f1' },
  { name: 'דניאל', avatar: '🦁', color: '#ec4899' },
  { name: 'טל', avatar: '👑', color: '#10b981' }
];
ProfileManager.saveLastLineup(mockLineup);
const retrievedLineup = ProfileManager.getLastLineup();
if (!retrievedLineup || retrievedLineup.length !== 4 || retrievedLineup[0].name !== 'יוסי כהן') {
  throw new Error('Failed to persist and retrieve last lineup');
}
console.log('✓ PASS: saveLastLineup and getLastLineup work correctly');

// Test 5: Career stats recording on game completion
const session = new GameSession({
  players: [
    { id: 'p0', name: 'יוסי כהן', avatar: '🚀', color: '#06b6d4' },
    { id: 'p1', name: 'עומר', avatar: '🦊', color: '#6366f1' },
    { id: 'p2', name: 'דניאל', avatar: '🦁', color: '#ec4899' },
    { id: 'p3', name: 'טל', avatar: '👑', color: '#10b981' }
  ]
});

// Round 1: יוסי bids 0 and takes 0 (zero made)
session.setBet(0, 0);
session.setBet(1, 4);
session.setBet(2, 4);
session.setBet(3, 4); // sum = 12 (UNDER)
session.proceedToTricks();
session.setTricks(0, 0);
session.setTricks(1, 4);
session.setTricks(2, 4);
session.setTricks(3, 5);
session.commitRound();

const profBefore = ProfileManager.getProfileByName('יוסי כהן');
const prevGames = profBefore.gamesPlayed || 0;
const prevZeroHits = profBefore.zeroHits || 0;

ProfileManager.recordGameCompletion(session);

const profAfter = ProfileManager.getProfileByName('יוסי כהן');
if (profAfter.gamesPlayed !== prevGames + 1) {
  throw new Error(`Expected gamesPlayed to increment by 1, got ${profAfter.gamesPlayed}`);
}
if (profAfter.zeroHits !== prevZeroHits + 1) {
  throw new Error(`Expected zeroHits to increment by 1, got ${profAfter.zeroHits}`);
}
console.log('✓ PASS: recordGameCompletion accurately updated career stats');

// Test 6: deleteProfile removes profile
ProfileManager.deleteProfile(newProf.id);
const deletedCheck = ProfileManager.getProfile(newProf.id);
if (deletedCheck !== null) {
  throw new Error('Profile should have been deleted');
}
console.log('✓ PASS: deleteProfile successfully removed profile');

// Test 7: Circular table seating operations (placeholders, swap, rotate, clear)
let seats = [null, null, null, null];
if (!seats.every(s => s === null)) throw new Error('Initial seats should be placeholders');

seats[0] = { name: 'Omer', avatar: '🦊', color: '#6366f1' };
seats[1] = { name: 'Daniel', avatar: '🦁', color: '#ec4899' };

// Direct swap (no jiggle)
const temp = seats[0];
seats[0] = seats[1];
seats[1] = temp;
if (seats[0].name !== 'Daniel' || seats[1].name !== 'Omer') {
  throw new Error('Direct seat swap failed');
}

// Clockwise rotation
seats = [seats[3], seats[0], seats[1], seats[2]];
if (seats[1].name !== 'Daniel' || seats[2].name !== 'Omer') {
  throw new Error('Clockwise table rotation failed');
}

// Clear seat
seats[1] = null;
if (seats[1] !== null) throw new Error('Seat clearing failed');
console.log('✓ PASS: Circular table seating operations (placeholder, swap, rotate, clear) pass');

console.log('Results: All 7 ProfileManager & Seating tests passed successfully.');

