# 🪿 Goose — the accountability goose that hunts you down

> Tell Goose what you're avoiding. It nags, guilt-trips, and hypes you — in character as a relentless, slightly unhinged goose — until the task is **actually done.** Not a to-do list. A creature that comes after you.

**▶︎ Live:** https://goose-lockin.vercel.app  ·  **App:** https://goose-lockin.vercel.app/app

Built in ~one day at the **8x Mobile App Hackathon** (Entrepreneur First, London — 13 June 2026).

---

## What is Goose?

Goose is an AI accountability partner with a personality problem. You hand it the one to three things you keep putting off (or connect your calendar so your *real* events become the list), and Goose chases you down to finish them — roasting, guilt-tripping, and occasionally hyping you up, all in the voice of a chaotic-but-secretly-caring goose. Your streak proves you actually did the work.

It's a mobile-first **PWA** — it installs to your home screen with no App Store — and the "magic" is a Claude prompt, not a mountain of infrastructure.

## What it's used for

- **Beating procrastination** on the handful of things you keep avoiding.
- **Turning real calendar deadlines into nags** you can't ignore.
- **Getting pinged the moment you wander off** to another app mid-task.
- **Proving you actually did it** — snap a photo, Goose judges it.
- **A reality check** on where your time actually goes (screen-time dashboard).
- **Roping friends in** — send a "goose intervention" to shame a friend into their task.

## Features

- 🗣️ **The Goose chat** (`/app`) — opens straight into a conversation. Goose greets you, learns your name, takes your tasks, and starts nagging. Mark tasks done / ghosted, build a 🔥 streak, earn XP + levels, set off confetti, and generate a shareable *"I survived Goose today"* card. Remembers everything across app closes (`localStorage`). Light **and** dark mode.
- 🧠 **Claude-powered nags** (`/api/nag`) — every line is generated in-character by **Claude** with an escalation scale from a polite nudge (level 1) to completely unhinged, threatening-to-follow-you-into-your-dreams (level 4). Reacts to your specific task, the time of day, and what just happened (intro / nag / done / ghost / all-done / off-task). Falls back to canned lines if the AI is ever unavailable.
- 🔔 **Off-task push notifications** (`/api/push` + service worker) — leave Goose mid-task and it notices (Page Visibility API), then fires a real push to your phone *while you're still in the other app*: **"where do you think you're going? 🪿"**. Web Push + VAPID; the client hands over its own subscription, so there's no database to run.
- 📸 **Photo proof — "proof or it didn't happen"** (`/api/judge`) — claim a task is done and Goose makes you prove it. Snap a photo; **Claude vision** returns PASS or FAIL with a reaction. *("That is a photo of your CEILING. Nice try.")*
- 📅 **Calendar awareness** (`gcal.js` / `/calendar.html`) — connect Google Calendar and your real events **become Goose's task list** (read + write `calendar.events` via client-side OAuth, no backend secret). Goose nags you about your actual deadlines.
- 📱 **Screen-time reality check** (`/api/screentime` + `/app/screentime`) — a website can't read your phone's Screen Time, so you screenshot it and **Claude vision** extracts the real per-app minutes into a dashboard. Honest data, no faking.
- 🤝 **Tattle / buddy shame** — Goose drafts a savage-but-loving message you can send a friend to drag *them* back to their task. The social loop.
- 📲 **Installable PWA** — manifest + service worker + icons. "Add to Home Screen" gives it a real app icon, full-screen, and notifications. No App Store, no download.
- 📋 **Landing + waitlist** (`/`) — the pitch, an email waitlist that writes straight to a **Google Sheet** (via Google Apps Script), a live signup counter, install + connect-calendar buttons, and rotating sample nags.

## How it works

- **Frontend:** a no-build, vanilla **HTML / CSS / JS** PWA (fonts: Baloo 2 + Nunito; share cards via html2canvas).
- **Goose's brain:** **Vercel serverless functions** calling the **Claude API** (`claude-haiku-4-5`) for nags, photo judging, and screen-time OCR. The API key lives only in a server env var — the browser never sees it.
- **Push:** Web Push API + **VAPID**, sent from `/api/push`; rendered by the service worker.
- **Calendar:** Google Identity Services (client-side OAuth token model) → Google Calendar API. No backend, no client secret.
- **Waitlist:** Google Apps Script web app → Google Sheet.
- **Hosting:** Vercel.

## Project structure

```
index.html            Landing page + email waitlist
app/index.html        The Goose app — chat, tasks, streak/XP, share card, toolkit
app/screentime.*      Screen-time dashboard (screenshot → Claude vision)
api/nag.js            Claude-generated, in-character nags (escalating)
api/judge.js          Photo-proof verdict — PASS/FAIL (Claude vision)
api/push.js           Web Push sender (VAPID) — the off-task ping
api/screentime.js     Screen-time screenshot → structured JSON (Claude vision)
gcal.js, config.js    Google Calendar connector (client-side OAuth)
calendar.html         Calendar connection test page
sw.js                 Service worker (push + notification click)
manifest.json, icon.svg, apple-touch-icon.png   PWA assets
CALENDAR_SETUP.md     Google Cloud / OAuth setup notes
```

## Running & deploying

No build step — it's a static PWA plus Vercel functions.

```bash
npm install     # installs web-push (used by /api/push)
vercel dev      # run locally
vercel --prod   # deploy
```

**Environment variables** (set in Vercel → project settings; see `.env.example`):

| Variable | Used by | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `/api/nag`, `/api/judge`, `/api/screentime` | Claude — server-side only |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_SUBJECT` | `/api/push` | Web Push — `npx web-push generate-vapid-keys` |

The Google OAuth **Client ID** is public by design and lives in `config.js`.

## The hackathon

Built in ~one day at the **8x Mobile App Hackathon** (Entrepreneur First, Shoreditch, London — 13 June 2026). Single track, judged on **Originality · UI/UX · Execution**. Goose's wedge: *not* another to-do list or habit tracker — a **character** that proactively comes after you, lives in your notifications, and is genuinely funny.

---

*Goose nags for laughs, never cruelty. If anything suggests you're genuinely struggling, Goose drops the bit and is kind. Your tasks are yours — minimal retention.*
