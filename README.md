# 🃏 Israeli Whist Scorekeeper (וויסט ישראלי)

<p align="center">
  <img src="src/icons/icon-192.png" alt="Israeli Whist Logo" width="100" />
</p>

<p align="center">
  <strong>An intelligent scorekeeping companion and exact-bidding game manager for Israeli Whist (וויסט ישראלי).</strong>
</p>

<p align="center">
  <a href="https://altdirect.app/?url=https%3A%2F%2Fraw.githubusercontent.com%2Filluminati945%2FIsraeliWhist-Scorekeeper%2Fmain%2FIsraeliWhist.json&r=livecontainer"><img src="https://img.shields.io/badge/Open%20in-LiveContainer-30B0C7?style=for-the-badge&logo=apple&logoColor=white" alt="LiveContainer" /></a>
  <a href="https://altdirect.app/?url=https%3A%2F%2Fraw.githubusercontent.com%2Filluminati945%2FIsraeliWhist-Scorekeeper%2Fmain%2FIsraeliWhist.json"><img src="https://img.shields.io/badge/Add%20to-SideStore-6366f1?style=for-the-badge&logo=apple&logoColor=white" alt="SideStore" /></a>
  <a href="https://github.com/illuminati945/IsraeliWhist-Scorekeeper/actions"><img src="https://img.shields.io/badge/CI%2FCD-Automated-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI/CD" /></a>
</p>

---

## ✨ Features

- 🎯 **Exact Bidding Score Engine**: Instant calculation of $+10 + \text{Bid}^2$ for successful contracts, exact $-10 \times |\text{diff}|$ penalties, and Zero scoring ($+50$ down / $+30$ up, $-50$ base $+ 10$/trick for misses).
- 🎴 **The Dealer Hook Rule Enforcer**: Real-time validation preventing total round bets from equaling 13 ($\sum B \neq 13$), with an automated forbidden bet badge for the dealer.
- ⚡ **Interactive 4-Stage Round Flow**:
  1. **Trump Auction Stage**: Record winner, trick target ($\ge 5$), suit (♣, ♦, ♥, ♠, NT), or all-pass Pas round.
  2. **Exact Predictions Stage**: Fast number chips & steppers with live "Over" (בגדול) / "Under" (בקטן) indicator.
  3. **Actual Tricks Won Stage**: Trick counters with auto-fill remainder calculation.
  4. **Score & Round Breakdown**: Immediate formula transparency and cumulative standings.
- 📊 **Rich Analytics & Trends**: Accuracy hit rates (%), zero success rates, aggressive bidding index, and SVG progression charts.
- 🌐 **Bilingual (עברית RTL & English LTR)**: Native Hebrew layout and terminology alongside full English localization.
- 🎨 **Liquid Glass UI**: Ultra-modern frosted glass aesthetic with Light and Dark themes.
- 📲 **Multiplatform & LiveContainer Ready**: Ready for iOS (LiveContainer, SideStore, AltStore), Android, and mobile web table-side play.

---

## 📜 Israeli Whist Scoring Table

| Bet ($B$) | Actual Tricks ($T$) | Result | Standard Score Formula | Points Awarded |
| :--- | :--- | :--- | :--- | :--- |
| **0** | 0 | Made | $+50$ (Down, $\sum B < 13$) / $+30$ (Up, $\sum B > 13$) | **$+50$ / $+30$** |
| **0** | $\ge 1$ | Failed | $-50 + 10 \times (T - 1)$ | **$-50$ ($T=1$), $-40$ ($T=2$), $\dots$** |
| **1** | 1 | Made | $+10 + 1^2$ | **$+11$** |
| **2** | 2 | Made | $+10 + 2^2$ | **$+14$** |
| **3** | 3 | Made | $+10 + 3^2$ | **$+19$** |
| **4** | 4 | Made | $+10 + 4^2$ | **$+26$** |
| **5** | 5 | Made | $+10 + 5^2$ | **$+35$** |
| **6** | 6 | Made | $+10 + 6^2$ | **$+46$** |
| **7** | 7 | Made | $+10 + 7^2$ | **$+59$** |
| **Any $B > 0$** | $T \neq B$ | Failed | $-10 \times \|T - B\|$ | **$-10 \times \Delta$** |
| **Pas Round** | $T$ tricks | Pas Mode | $-10 \times T$ (or $+50$ if $T=0$) | **$-10 \times T$** |

---

## 🚀 Environments & Live Deployment

| Environment | Purpose | Branch | Port | Live Access URL |
| :--- | :--- | :--- | :--- | :--- |
| 🟢 **Production (Prod)** | Latest stable release for actual gameplay | `main` | `3000` | [https://i945.duckdns.org/whist/](https://i945.duckdns.org/whist/) |
| 🟠 **Development (Dev)** | Active sandbox for testing features & changes | `dev` | `3001` | [https://i945.duckdns.org/whist-dev/](https://i945.duckdns.org/whist-dev/) |

- **Data Isolation**: Dev and Prod maintain completely segregated databases (`data/sessions/`), ensuring experimental rounds or test rooms never interfere with ongoing games.
- **Visual Indicator**: The Dev environment features an amber `DEV` badge in the header.

---

## 📦 GitHub Releases & Development Lifecycle

1. **Developing & Testing Features**:
   - Work on the `dev` branch in `/home/ubuntu/israeli-whist-scorekeeper-dev`.
   - Deploy & restart dev anytime:
     ```bash
     npm run deploy:dev
     ```
   - Test live at `https://i945.duckdns.org/whist-dev/`.

2. **Publishing a New Release**:
   - Run the automated release command with the target version:
     ```bash
     npm run release <version>  # Example: npm run release 1.0.1
     ```
   - This executes tests, rebuilds production bundles, tags the commit, creates the GitHub Release on [illuminati945/IsraeliWhist-Scorekeeper](https://github.com/illuminati945/IsraeliWhist-Scorekeeper/releases), and syncs the dev branch.

