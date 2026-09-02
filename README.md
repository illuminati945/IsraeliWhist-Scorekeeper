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

## 🚀 Installation & Usage

### 1. Web / Table-Side Mobile Play
Simply open `src/index.html` in any browser or install it as a PWA on iOS Safari / Android Chrome ("Add to Home Screen").

### 2. LiveContainer / SideStore (iOS)
1. Tap [**Open in LiveContainer**](https://altdirect.app/?url=https%3A%2F%2Fraw.githubusercontent.com%2Filluminati945%2FIsraeliWhist-Scorekeeper%2Fmain%2FIsraeliWhist.json&r=livecontainer).
2. Or download the latest `.ipa` from [GitHub Releases](https://github.com/illuminati945/IsraeliWhist-Scorekeeper/releases).

---

## 🛠️ CI/CD & Development Rules

- **Branch Lockstep Rule**: Always commit and push changes in lockstep to `main` and `enhanced`.
- **Discord Live Watcher**: Run `python3 scripts/discord_watcher.py <RUN_ID>` to track compilation in real-time.
- **SideStore Manifest Sync**: Run `build-ipa.yml` to automatically update `IsraeliWhist.json` with the exact asset size and download URL.
