# Israeli Whist Scorekeeper — Agent Memory & Context Guide (agent.md)

This document serves as the persistent memory and operational guide for the Israeli Whist Scorekeeper project. It documents core rules, architecture, user directives, critical bug fixes, and maintenance procedures so any agent can immediately resume work without losing context.

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

## 5. 🌿 Repository Architecture & Operations

* **Working Branches**:
  * `main`: Production releases and documentation.
  * `enhanced`: Active development and CI build target.
  * **Always commit and push to both `main` and `enhanced` in lockstep**:
    ```bash
    git add .
    git commit -m "<message>"
    git checkout enhanced && git merge main
    git checkout main
    ```
* **Systemd Service**:
  * Service name: `israeli-whist.service`
  * Restart command: `sudo systemctl restart israeli-whist.service`
  * Status command: `sudo systemctl status israeli-whist.service`
* **Test Suite**:
  * Command: `npm test`
  * 50 unit and integration tests covering rules engine, hook rule, session anti-regression, history editing, baseline scores, and 0 scoring formulas.
* **Live Deployment**:
  * HTTPS: `https://i945.duckdns.org/whist/`
  * HTTP: `http://i945.duckdns.org/whist/` (Port 3000 reverse-proxied via Nginx)

---

## 6. 📁 Key Source Files Map

| File | Purpose |
| :--- | :--- |
| `src/js/engine/whist-rules.js` | Core scoring formulas, 0 scoring rules, Hook rule validation, preset definitions |
| `src/js/engine/game-state.js` | `GameSession`, round transitions, baseline scores, history editing & recalculation |
| `src/js/engine/sync-manager.js` | WebSocket synchronization with server and anti-wipe guards |
| `src/js/engine/archive-manager.js` | LocalStorage + REST archive management with blank state protection |
| `src/js/engine/statistics.js` | Match analytics, accuracy, and zero (0) success rates |
| `src/js/ui/round-view.js` | Active round bidding and trick entry interface |
| `src/js/ui/scoreboard.js` | Leaderboard cards, deal history table, edit buttons, baseline row |
| `src/js/ui/dialogs.js` | Modals: edit deal, baseline scores, new game, player names, settings |
| `src/js/ui/chart-view.js` | SVG cumulative score progression chart starting from baseline |
| `src/js/i18n/he.js` & `en.js` | Hebrew and English localizations |
| `server.js` | Node.js backend: REST API, WebSocket server, backups, anti-regression engine |
