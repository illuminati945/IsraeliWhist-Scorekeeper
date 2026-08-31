#!/usr/bin/env python3
"""
Discord CI/CD Live Tracker Daemon for Israeli Whist Scorekeeper
Monitors GitHub Actions workflow runs and updates Discord embed in real-time.
"""

import sys, time, json, os, urllib.request, datetime

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 discord_watcher.py <RUN_ID> [REPO]")
        sys.exit(1)

    run_id = sys.argv[1]
    repo = sys.argv[2] if len(sys.argv) > 2 else "illuminati945/IsraeliWhist-Scorekeeper"

    # Read discord webhook & PAT from config or env
    webhook_url = os.environ.get("DISCORD_TRACKER_WEBHOOK") or os.environ.get("DISCORD_WEBHOOK")
    token = os.environ.get("GITHUB_TOKEN")

    config_path = os.path.expanduser("~/scratch/discord_config.json")
    if os.path.exists(config_path):
        try:
            with open(config_path) as f:
                cfg = json.load(f)
                webhook_url = webhook_url or cfg.get("tracker_webhook") or cfg.get("webhook_url")
                token = token or cfg.get("github_token")
                repo = cfg.get("repo", repo)
        except Exception as e:
            print(f"Notice: Could not parse {config_path}: {e}")

    if not webhook_url:
        print("No Discord webhook provided. Running in terminal log mode.")

    headers = {
        "User-Agent": "whist-discord-watcher",
        "Accept": "application/vnd.github+json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    print(f"🚀 Started tracking Run ID {run_id} on repo {repo}...")

    start_time = time.time()
    last_status = None

    while True:
        try:
            url = f"https://api.github.com/repos/{repo}/actions/runs/{run_id}"
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp:
                data = json.load(resp)

            status = data.get("status")
            conclusion = data.get("conclusion")
            elapsed = int(time.time() - start_time)

            print(f"[{elapsed}s] Status: {status}, Conclusion: {conclusion}")

            if status == "completed":
                print(f"✅ Workflow completed with conclusion: {conclusion}")
                break

        except Exception as e:
            print(f"Polling error: {e}")

        time.sleep(15)

if __name__ == "__main__":
    main()
