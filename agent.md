# Israeli Whist Scorekeeper — Agent Memory & Context Guide (agent.md)

This document serves as the persistent memory and operational guide for the Israeli Whist Scorekeeper project. It documents core rules, architecture, user directives, critical bug fixes, and maintenance procedures so any agent can immediately resume work without losing context.

> 📌 **MANDATORY INSTRUCTION: CONTINUOUS DOCUMENTATION UPDATES**
> Any agent working on this repository **MUST ALWAYS** proactively update both `AGENTS.md` and `agent.md` with every new instruction, user directive, architectural decision, and feature change.
> Both files must remain 100% in sync at all times. Never leave newly requested workflows, rules, or environment changes undocumented.

---


## 1. 🎴 Core Game Rules & Scoring Engine

### A. Zero (0) Bids — Strict Terminology & Scoring
* **CRITICAL USER DIRECTIVE**: Bidding 0 is strictly called **"Zero" / "0"** (Hebrew: **"אפס" / "הכרזה 0"**). **NEVER refer to it as "Pass" or "פאס"!** "Pass" only refers to passing in the trump auction.
* **Scoring upon Win (0 tricks taken)**:
  * **Down / Under** (Total round bids < 13): **`+50` points**
  * **Up / Over** (Total round bids > 13): **`+30` points**
* **Scoring upon Miss (Took >= 1 tricks)**:
  * Base penalty is **`-50` points**, plus **`+10` points** for each trick taken:
    $$\text{Score} = -50 + 10 \times (\text{tricks} - 1)$$
  * 1 trick: **`-50` pts** (-50 + 0)
  * 2 tricks: **`-40` pts** (-50 + 10)
  * 3 tricks: **`-30` pts** (-50 + 20)
  * 4 tricks: **`-20` pts** (-50 + 30)
  * 5 tricks: **`-10` pts** (-50 + 40)
  * 6 tricks: **`0` pts** (-50 + 50)
  * 7 tricks: **`+10` pts** (-50 + 60)

### B. Standard Contract Scoring (B > 0)
* **Exact Made**: **`+10 + B^2` points** (1 -> +11, 2 -> +14, 3 -> +19, 4 -> +26, 5 -> +35, etc.).
* **Failed / Miss**: **`-10 * |Actual - Bid|` points**.

### C. The Hook Rule (חוק ההוק / חוק המחלק)
* Total bids across all 4 players in any deal **can never equal 13** (sum B != 13).
* The dealer / last bidder is forbidden from bidding the exact number that would make the sum equal 13.
* Total tricks across all 4 players must strictly sum to **13**.

---

## 2. ✏️ History Editing & Arbitrary Baseline Scores

### A. Deal History Editing (`recalculateAllScores`)
* Located in `src/js/engine/game-state.js` (`editCompletedRound`, `recalculateAllScores`, `deleteCompletedRound`).
* Users can tap the pencil icon (`✏️`) on any past deal row in the History table to edit bids, tricks, and dealer.
* When saved, `recalculateAllScores()` iterates from round 0 to N, re-evaluates `calculatePlayerScore`, and cascades progressive cumulative scores forward into each `round.cumulativeScores`.
* Deals can also be deleted, triggering re-indexing and forward recalculation.

### B. Arbitrary Baseline Starting Scores (`initialScores`)
* Allows games to begin with non-zero arbitrary scores (e.g. migrating an existing game recorded on paper).
* Configurable during game creation in `showNewGameModal()` or mid-game via `🎯 Set Baseline` in the history table and drawer menu (`showBaselineModal()`).
* Starting cumulative scores initialize to `[...this.initialScores]`.
* When non-zero, a `#0 Baseline` row appears in the history table, and the line chart starts from `initialScores` at `Start`.
* Baseline scores are physically tied to players and remap automatically when players are reordered or swapped.

---

## 3. 🛡️ Link-Share Anti-Regression & Protection System

### A. The Link-Wipe Bug (Fixed & Guarded)
* **Root Cause**: When a user shared a room URL (e.g. `/whist/?room=W-XXXX`), a newly joining client instantiated with a default blank game (0 rounds, default names). Before joining the room, it would auto-save and sync to the server, overwriting and clearing the ongoing game.
* **Server Anti-Regression Engine (`server.js`)**:
  * `isStateRegression(existing, incoming)` checks whether an incoming state attempt would wipe completed rounds, replace custom player names with defaults, or erase baseline scores.
  * Rejects regressive HTTP `POST /api/session/:roomId` and WebSocket `SYNC_STATE` messages.
  * When rejected on WebSocket, server sends back `STATE_UPDATED` with the authoritative state to restore the client.
  * Automatic rolling snapshots in `data/backups/<roomId>.bak.json`.
* **Client Guards**:
  * `ArchiveManager.saveGameToArchive`: never persists blank templates.
  * `SyncManager.broadcastLocalState`: never broadcasts if local state has no completed rounds and default names.
  * `app.js`: calls `fetchRoomStateFromServer(roomId)` before rendering session.

---

## 4. 🎨 UI/UX Specifications & User Directives

* **Hebrew / RTL Number Formatting**:
  * In Hebrew RTL mode, mathematical signs (`+` and `-`) must remain on the **left side** of the number.
  * Implemented via CSS: `direction: ltr !important; unicode-bidi: isolate !important;` on `.signed-score` elements.
* **Physical Card Reordering (Jiggle Mode)**:
  * Initiated by long-press on any player card.
  * Cards are physically moved in the DOM using pointer drag and FLIP transitions. Content and avatars are strictly coupled to their cards (no text-swapping).
  * Dismissed by tapping outside cards.
* **Menu Organization Button**:
  * The separate "Organize Seating" button was removed from the drawer menu per user request (reordering is performed directly via cards).
* **Landscape Mode & Short Viewport Architecture**:
  * Safe-area insets (`--safe-left` & `--safe-right`) prevent notches and cutouts from clipping the navbar, container, and modals.
  * Leaderboard grid uses explicit `grid-template-areas: "p0 p1 p2 p3"` for 4-column layout and `"p0 p1" "p3 p2"` in portrait/circular table modal.
  * Active round inputs (`.round-inputs-grid`) arrange players into a 2x2 grid in landscape, displaying all 4 players and action buttons on screen without vertical scrolling.
  * Modals adapt to 2-column grids and wide layouts in landscape with sticky table headers for history.

---

## 5. ⚡ Instant Loading & Performance Architecture

* **Production Bundling & Minification**:
  * Bundles all ES modules into a single `src/js/app.bundle.js` (29.7 KB gzipped) and `src/css/styles.min.css` (4.4 KB gzipped) using `esbuild`.
  * Eliminates the 16-request ES module waterfall completely; entire application payload is under **35 KB**.
  * Rebuild command: `npm run build` (takes ~15ms).
* **In-Memory Static Caching & Cache-Busting Policy (`server.js`)**:
  * Static files are cached in RAM with pre-compressed gzip buffers and MD5 `ETag`s.
  * **Development Environment (`NODE_ENV === 'development'`)**: Sends `Cache-Control: no-cache, no-store, must-revalidate` and bypasses 304 conditional cache so mobile and desktop testers always fetch fresh assets immediately.
  * **Production Environment**: Sends `Cache-Control: public, max-age=31536000, immutable` for versioned assets (`?v=XX`). Assets are version-bumped on each release (`?v=12`) to prevent stale browser disk caching.
  * Instant HTTP `304 Not Modified` on unchanged resources without disk I/O in production.
* **In-Memory Recent Games Cache (`server.js`)**:
  * Caches `recentGames` list in memory and invalidates on session save/delete, removing synchronous 30+ file disk reads on page loads.
* **PWA Service Worker (`src/sw.js`)**:
  * Stale-While-Revalidate strategy serves app shell and assets in **0ms (instantly)** on return visits.
  * Full offline support and background revalidation.
* **Nginx HTTP/2 Compression**:
  * Global `gzip_proxied any;` and `gzip_types` enabled in `/etc/nginx/nginx.conf`.

---

## 6. 🌿 Dual-Environment Architecture & GitHub Releases

* **Environments Map**:
  | Environment | Path | Git Branch | Port | Systemd Service | Live URL | Storage Isolation |
  | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
  | **Production (PROD)** | `/home/ubuntu/israeli-whist-scorekeeper` | `main` | `3000` | `israeli-whist.service` | `https://i945.duckdns.org/whist/` | Dedicated `/data/` |
  | **Development (DEV)** | `/home/ubuntu/israeli-whist-scorekeeper-dev` | `dev` | `3001` | `israeli-whist-dev.service` | `https://i945.duckdns.org/whist-dev/` | Dedicated `/data/` |

* **Development Workflow**:
  1. Make and test changes in the Dev environment (`/home/ubuntu/israeli-whist-scorekeeper-dev` on branch `dev`).
  2. Test in the browser at `https://i945.duckdns.org/whist-dev/` (features an amber `DEV` header badge).
  3. Deploy dev updates anytime with:
     ```bash
     npm run deploy:dev
     ```
  4. Ensure all unit and asset tests pass (`npm test`).
  5. When ready for stable release, promote and publish to GitHub with one command:
     ```bash
     npm run release <new_version>   # e.g. npm run release 1.0.1
     ```
     This automatically runs the test suite, bumps version in `package.json` and manifests, bundles assets, creates and pushes git tags, creates the GitHub Release on `illuminati945/IsraeliWhist-Scorekeeper`, syncs `dev`, and updates prod.

* **GitHub Environment & Releases**:
  - Remote Repository: `https://github.com/illuminati945/IsraeliWhist-Scorekeeper`
  - GitHub Environments: `production` (tracks `main`) and `development` (tracks `dev`).
  - GitHub Releases: `https://github.com/illuminati945/IsraeliWhist-Scorekeeper/releases`
  - Workflow Automation: `.github/workflows/release.yml` and `scripts/release.sh`

* **Systemd Services**:
  - Prod service: `sudo systemctl status israeli-whist.service` / `sudo systemctl restart israeli-whist.service`
  - Dev service: `sudo systemctl status israeli-whist-dev.service` / `sudo systemctl restart israeli-whist-dev.service`

* **Strict Policy: No "Enhanced" Concept in Israeli Whist**:
  - **CRITICAL USER DIRECTIVE**: The whole "Enhanced" concept (including `enhanced` branches, `IsraeliWhistEnhanced.json`, and `-Enhanced.ipa` suffixes) was only relevant for the separate **Nuvio** application.
  - **DO NOT** use or introduce `enhanced` in this codebase.
  - Branches are strictly `main` (production) and `dev` (development).
  - SideStore source manifest is strictly `IsraeliWhist.json` and builds produce `IsraeliWhist-v<VERSION>.ipa`.



---

## 7. 👥 Player Profiles & Easy Picking UI System

### A. System Overview & Architecture
* **Engine**: `src/js/engine/profile-manager.js` (`ProfileManager`).
* **Storage Keys**:
  - `israeli_whist_profiles_v1`: Persistent roster array of player profiles.
  - `israeli_whist_last_lineup_v1`: Most recent 4-player lineup.
* **Profile Data Model**:
  - `id`: Unique identifier (`prof_<timestamp>_<hash>`).
  - `name`: Player display name.
  - `avatar`: Visual emoji icon (e.g. 🦊, 🦁, 👑, 🚀, ⭐, 🎯).
  - `color`: Distinct player accent color from `COLOR_OPTIONS`.
  - `gamesPlayed`: Career total matches.
  - `wins`: Matches won (highest final score).
  - `totalScore`: Cumulative career score.
  - `zeroBids`: Career zero (0) bids made.
  - `zeroHits`: Successful zero (0) bids achieved.
  - `lastPlayed`: ISO timestamp of recent activity.

### B. Circular Table Seating UI & Easy Picking for New Games (`showNewGameModal`)
* **Zero Horizontal Scroll Architecture**:
  - Eliminates horizontal overflow by reusing the responsive circular 2x2 table seating UI (`.seating-modal-grid`).
  - Wrapped roster chips container (`.roster-chips-wrap`) with flex wrapping and vertical scrolling instead of horizontal carousel scrolling.
* **Placeholder Seats**:
  - When no players have been chosen yet, all 4 seat cards render clean placeholder slots (`+ Choose Player` / `+ בחר שחקן`) with dashed outlines and `+` avatars.
  - Active target seat is highlighted in indigo (`.is-active-target`), indicating where the next chosen player will sit.
* **Moving Players Around by Default (NO Jiggle Mode)**:
  - Tapping any filled seat selects it for swapping (highlighted with a glowing golden border: `.is-swap-selected`).
  - Tapping any second seat immediately swaps the two players between those seats with zero delay and NO jiggle mode!
  - 1-tap table rotation controls (`↺ Rotate CCW` and `↻ Rotate CW`) directly shift all 4 players clockwise or counter-clockwise around the table.
  - Tapping the `✕` on any seat clears that player back to an empty placeholder.
* **⚡ "Use Last Lineup" & Fast Assignment**:
  - Restores the exact 4-player arrangement from the previous match in one tap.
  - Tapping an unassigned profile chip in the roster assigns them to the target seat and auto-advances to the next empty seat slot.
  - "Clear All" (`🗑️`) button resets all 4 seats back to placeholders.
  - Inline profile creation button opens `showCreateEditProfileModal()` and places the new player into the active seat.

### C. Dedicated Roster & Career Statistics Modal (`showProfilesModal`)
* Accessible from:
  1. Landing Page Lobby (`👥 Player Profiles & Roster` button).
  2. Main Drawer Menu (`👤 Player Profiles & Roster`).
  3. New Game Modal (Quick picker header).
* Displays player cards with:
  - Avatar circle with custom colored border and background tint.
  - Games played badge.
  - Win rate percentage badge (🏆 X%).
  - Zero bidding accuracy badge (0️⃣ X%).
  - Career total points badge (⭐ X).
* Full CRUD functionality: edit name/avatar/color or delete profiles.

### D. Visual Integration Across Views
* **Leaderboard (`Scoreboard`)**: Renders `.player-avatar-mini` next to player name on cards and history table headers.
* **Round View (`RoundView`)**: Renders avatar badge in Trump auction selection, Bets stage steppers, Tricks stage rows, and Score preview cards.
* **Landing Page (`LandingView`)**: Renders quick interactive roster preview strip with avatars directly under the hero section.

---

## 8. 📁 Key Source Files Map

| File | Purpose |
| :--- | :--- |
| `src/js/engine/whist-rules.js` | Core scoring formulas, 0 scoring rules, Hook rule validation, preset definitions |
| `src/js/engine/game-state.js` | `GameSession`, round transitions, baseline scores, history editing & recalculation |
| `src/js/engine/profile-manager.js` | `ProfileManager`: Player profiles, roster persistence, career statistics & last lineup |
| `src/js/engine/sync-manager.js` | WebSocket synchronization with server and anti-wipe guards |
| `src/js/engine/archive-manager.js` | LocalStorage + REST archive management with blank state protection |
| `src/js/engine/statistics.js` | Match analytics, accuracy, and zero (0) success rates |
| `src/js/ui/round-view.js` | Active round bidding and trick entry interface with player avatars |
| `src/js/ui/scoreboard.js` | Leaderboard cards with avatars, deal history table, edit buttons, baseline row |
| `src/js/ui/dialogs.js` | Modals: interactive 4-seat new game picker, profile manager, avatar picker, edit deal |
| `src/js/ui/landing-view.js` | Welcome lobby with player profiles access and quick roster strip |
| `src/js/ui/chart-view.js` | SVG cumulative score progression chart starting from baseline |
| `src/js/i18n/he.js` & `en.js` | Hebrew and English localizations (including profile and picking strings) |
| `server.js` | Node.js backend: REST API, WebSocket server, backups, anti-regression engine |

