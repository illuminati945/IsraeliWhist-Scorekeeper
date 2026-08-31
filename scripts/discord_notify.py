#!/usr/bin/env python3
"""
Discord Announcement & Notification Utility
"""

import sys, json, os, urllib.request

def send_notification(title, message, color=6514937, fields=None):
    webhook_url = os.environ.get("DISCORD_ANNOUNCE_WEBHOOK") or os.environ.get("DISCORD_WEBHOOK")
    if not webhook_url:
        print("No webhook URL configured.")
        return

    embed = {
        "title": title,
        "description": message,
        "color": color,
        "footer": {"text": "Israeli Whist Scorekeeper"}
    }
    if fields:
        embed["fields"] = fields

    payload = {
        "username": "Israeli Whist Bot",
        "embeds": [embed]
    }

    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "WhistNotifier"},
        method="POST"
    )
    try:
        urllib.request.urlopen(req)
        print("Notification sent successfully.")
    except Exception as e:
        print(f"Error sending Discord notification: {e}")

if __name__ == "__main__":
    title = sys.argv[1] if len(sys.argv) > 1 else "Israeli Whist Update"
    msg = sys.argv[2] if len(sys.argv) > 2 else "New update released."
    send_notification(title, msg)
