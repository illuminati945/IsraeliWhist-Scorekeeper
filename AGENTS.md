# Israeli Whist Scorekeeper — Agent Instructions & Architecture Guide

This document contains operational workflows, build instructions, CI/CD automation, GitHub branching rules, and LiveContainer / SideStore guidelines for developing and maintaining the Israeli Whist Scorekeeper codebase.

---

## 1. 🌿 Repository & Branch Strategy (Nuvio Lockstep)

- **Architecture**: Multiplatform (Responsive PWA / Web + Kotlin Compose Multiplatform for iOS & Android + Native Host).
- **Primary Working Branches**:
  - `main`: Stable releases, documentation, and SideStore/AltStore/LiveContainer community source manifests.
  - `enhanced`: Active development and CI build target for GitHub Actions.
- **Rule**: Whenever pushing commits, **always push to both `main` and `enhanced` in lockstep** so they stay synchronized:
  ```bash
  git push origin main
  git checkout enhanced && git merge main
  git push origin enhanced
  git checkout main
  ```

---

## 2. 📢 Discord CI/CD Tracking & Notifications

Builds and milestones are monitored live and streamed to Discord channels:

- **Channel A (Live CI/CD Tracker)**: Posts real-time compilation step progress, progress bars, and elapsed time every 30 seconds.
- **Channel B (Announcements & Releases)**: Posts version release notes, changelogs, build success status with direct `.ipa` and `.apk` download links, or failure diagnostics.

### Configuration & Daemon
- Configuration is stored in `scratch/discord_config.json` (or environment variables `DISCORD_WEBHOOK` and `GITHUB_TOKEN`).
- **Run the background watcher daemon during CI builds**:
  ```bash
  python3 scripts/discord_watcher.py <RUN_ID>
  ```
- The watcher automatically edits old embeds to keep the channel clean and posts fresh bottom announcements when the job completes.

---

## 3. 🚀 Triggering Automated CI/CD Builds

Trigger an Apple Silicon macOS build via GitHub Actions workflow dispatch:

```python
import json, urllib.request

with open('scratch/discord_config.json') as f:
    config = json.load(f)

token = config['github_token']
headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'whist-scorekeeper-ci',
    'X-GitHub-Api-Version': '2022-11-28'
}
url = f"https://api.github.com/repos/{config['repo']}/actions/workflows/build-ipa.yml/dispatches"
data = json.dumps({
    'ref': 'enhanced',
    'inputs': {
        'mode': 'enhanced',
        'description': 'Build Israeli Whist iOS & LiveContainer'
    }
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers=headers, method='POST')
with urllib.request.urlopen(req) as resp:
    print('Workflow dispatched successfully!')
```

---

## 4. 🏷️ Versioning & Release Checklist

When adding features or releasing updates, follow this exact sequence:

1. **Increment Version**:
   - Update `package.json` / version manifests (e.g. `1.0.0` -> `1.0.1`).
2. **Update SideStore / AltStore / LiveContainer Manifests**:
   - Update `IsraeliWhist.json` and `IsraeliWhistEnhanced.json`:
     - Update `version`, `buildVersion`, and `date`.
     - Update `downloadURL`: `https://github.com/<owner>/<repo>/releases/download/v<version>/IsraeliWhist-v<version>-Enhanced.ipa`.
     - Update `localizedDescription` with release bullet points.
3. **Commit & Push in Lockstep**:
   - Commit changes and push to `main` and `enhanced`.
   - Dispatch `build-ipa.yml` on `enhanced`.
   - Start `discord_watcher.py <RUN_ID>` as a background task.
4. **Post-Build Exact Size Sync**:
   - Once the build succeeds, copy the exact byte size (`size`) from GitHub Releases asset into `IsraeliWhist.json` and `IsraeliWhistEnhanced.json`.
   - Commit and push the size sync to both `main` and `enhanced`.

---

## 5. 🛡️ LiveContainer & Sandbox Guidelines

### A. LiveContainer & SideStore Sandbox Integration
- In `Info.plist`:
  - `<key>UIFileSharingEnabled</key><true/>`
  - `<key>LSSupportsOpeningDocumentsInPlace</key><true/>`
- Exposes game export data and history files in the iOS **Files** app under **On My iPhone ➔ Israeli Whist** (and in LiveContainer / LiveLauncher shared storage).

### B. Background Notifications & Haptics
- Enable `UNUserNotificationCenter` permission requests with foreground presentation delegates and physical haptic chimes (`AudioServicesPlaySystemSound` and `UINotificationFeedbackGenerator`) for dealer rotation and round alerts inside LiveContainer sandboxes.

### C. Security & Secrets Management
- **Rule**: Never commit raw Discord webhook URLs or GitHub Personal Access Tokens (PATs) directly into repository files or git history.
- Always read credentials from local `scratch/discord_config.json` or system environment variables.
