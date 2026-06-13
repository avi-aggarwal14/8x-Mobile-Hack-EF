# 8x Mobile App Hackathon — Project Brief & Playbook

> Our entry for the **8x Mobile App Hackathon**, **Sat June 13, 2026**, at the **Entrepreneur First London** office (Shoreditch Exchange, Senna Building, Gorsuch Pl, London E2 8JF).
> Host: **Darijan Ducic** · "8x" = the event series · **EF is the venue only** (not organizer/judge).
> `IDEAS.md` = what we build · `MEMORY.md` = context + decisions log.

---

## 🛑 RULE 0 — ASK FIRST, ALWAYS (read this before doing anything)

**Always keep all three project docs in context.** Every Vybal agent must **read and keep `CLAUDE.md`, `IDEAS.md`, and `MEMORY.md` in its context window at all times** — re-read them at the start of every session and before any non-trivial action. Never work from a stale or partial copy.

**Every agent / Claude working on this project: ask Avi clarifying questions before you build.** Do **not** guess, assume, or go off and do random stuff he'll have to fix later. If the request is even a little ambiguous, **stop and ask.**

- **Large tasks** — anything you estimate at **≥10k tokens** of work — require **at least 5 clarifying questions up front** (more if you need them) *before* you start.
- **Don't be afraid to come back for more input** at any point. Over-asking is cheap; rework is expensive.
- **Log every change in the docs — immediately.** Whenever you do *anything* (ship code, deploy, set up a service, change config, make a decision), record it in the `.md` file it's **most relevant to** *before you move on*: build/status → `CLAUDE.md` §0 + the `IDEAS.md` checklist; decisions, links & context → `MEMORY.md` (dated decisions-log entry). The three docs must always mirror reality — **no silent changes.**
- This **overrides** any "bias to action" / "ship the thinnest thing" guidance elsewhere in this doc. Doing the *wrong* thing fast is worse than a 2-minute question.

---

## 0. STATUS — what's live right now (June 13, mid-build)

**🟢 Deployed:** **https://goose-lockin.vercel.app** (Vercel project `goose-8x`) · **Repo:** github.com/avi-aggarwal14/8x-Mobile-Hack-EF

**Shipped & live:**
- **Landing page** (`/`) — email waitlist → **Google Apps Script → Google Sheet** (collecting signups now); rotating nag samples; PWA install.
- **Interactive app** (`/app`) — **opens straight into the goose chat**: Goose roasts you, asks your name, then suggests **Connect Calendar** → your real calendar events **become the tasks** it nags about (done/ghost/skip, XP·levels·streak·confetti, shareable card). Type a one-off task in the chat box too. ✅ Nags from **Claude via `/api/nag`** (canned fallback). ✅ **Remembers across closes** — name, tasks, streak & the full chat persist in `localStorage` (this device).
- **Focus-watch + push (off-task callout)** — the goose notices when you *leave the app mid-task* (Page Visibility API) and (a) roasts you on return (`kind:'offtask'` → `/api/nag`) **and (b) fires a real push notification to your phone while you're still away** (`/api/push`, Web Push + VAPID; the client hands over its own subscription, so no DB). PWA limit: it knows *that* you left, not which app you opened (true OS screen-time = native only). Needs `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY` env vars in Vercel; iOS needs the PWA installed to the home screen.
- **PWA** — manifest, service worker, icon, install prompts, **browser-tab favicon** (SVG `icon.svg`, on both `/` and `/app`).
- *(As-built note: vanilla HTML/JS static PWA, not the Next.js in §5 — fine for the window.)*

**🟡 In progress:**
- **Google Calendar API (two-way):** reads your real calendar/deadlines to nag you about them, **and** writes new tasks/reminders (with deadlines) back to your calendar to nag about later. = Goose's scheduling + awareness brain. — ✅ **client-side connector built + deployed** (GIS token model, read+write `calendar.events`, no backend/secret): `gcal.js` + `config.js` + a `/calendar.html` test page. ✅ **Client ID wired in + deployed** (Google project Goose/`goose-499311`). ✅ **Connect Google Calendar button now on the landing page + the app start screen** (not just `/calendar.html`). 🔓 **Public:** OAuth app **published to Production** so *anyone* can connect — users click through Google's "unverified app" warning (Advanced → Continue), since full verification of the sensitive `calendar.events` scope isn't feasible today (`CALENDAR_SETUP.md` Part F). **Next:** fold calendar reads into Goose's nags.
- **Nag delivery model:** **Calendar decides *when* · a chat app (Telegram/WhatsApp) *delivers* the nag.** (The Claude Goose engine + chat delivery is the open build.)
- **Waitlist → email + phone** (phone capture being added; needed so Goose can actually text you).

**✅ Resolved:** the share card + share text now use **goose-lockin.vercel.app** (the public URL). *(The Vercel project is still internally named `goose-8x`, but that's not user-facing.)*

---

## 1. TL;DR — what actually matters
- **~One-day sprint with only ~4–4.5 hrs of real build time** (kickoff ~10:45 → submission opens 15:00, minus lunch). **Scope must be tiny: one screen, one magic moment.**
- **Single track confirmed** (no separate theme). **Judging = ① Originality ② UI/UX ③ Execution** (no weights given — treat as ~equal). ⚠️ Originality rule: *not "just another to-do list or health app"* — our edge is the goose *character* + "it texts you" proactivity, **not** task-management (see §4). Prizes + sponsors still drop at the 10:30 kickoff.
- **Distribution-first** (the Pop the Bubble fix): land a waitlist + shareable link early, drive ONE growing number, get real users in the room.
- **No App Store. No native build.** PWA + "Goose texts you" over SMS + a QR code. (The rules literally encourage "AI, no-code, code, agents" — and there's no time for store deploy anyway.)
- North-star metric: **waitlist signups** — this is our **Execution** evidence (criterion ③). But it's now one of three: we also have to win **Originality** ① and **UI/UX** ②.

## 2. Event facts (from the Luma page)
- **Event:** 8x Mobile App Hackathon (build a mobile app)
- **Date:** Sat June 13, 2026 (today)
- **Venue:** Entrepreneurs First, Shoreditch Exchange, Senna Building, Gorsuch Pl, London E2 8JF — *EF = venue only*
- **Host / series:** Darijan Ducic · "8x" event series
- **Teams:** 1–3 people
- **Who:** founders, students, designers, developers — anyone who builds
- **Tools allowed:** anything — AI, no-code, code, agents, APIs. **Sponsor AI tools provided.**
- **Schedule:**
  | Time | What |
  |------|------|
  | 10:00 | Doors open |
  | 10:30 | Welcome, kickoff, rules — **tracks + sponsors announced** |
  | 12:30 | Lunch |
  | **15:00** | **Submission form opens** (have a working build by now) |
  | 16:30 | Live demos (everyone) |
  | 17:30 | Final pitches → winners + prizes |
- **CONFIRMED (June 13):** **single track** (no extra theme) · **judging = ① Originality ② UI/UX ③ Execution** (no weights — see §8). Originality is explicit: *not "just another to-do list or health app."*
- **Still TBD — get at the 10:30 kickoff:** prizes · submission format · demo/pitch time limit · sponsor AI tools.
- **Watch:** waitlist asked to "verify token ownership with your wallet" → possible **web3/token angle or sponsor**. Confirm; could be a prize track.

## 3. Strategy — pre-build, then commit to the most *original* Goose
1. **Before 10:30 (now):** build + deploy the **track-independent skeleton** — PWA shell, Vercel deploy pipeline, waitlist landing page (start signups), Goose persona prompt, SMS/notification plumbing.
2. **At 10:30:** there's **one open track** — nothing to flex to. Confirm prizes/format/time, then **commit to the most *original* framing of Goose** (a chaotic creature that hunts you down + memeable cards), and explicitly **steer away from "to-do list / health tracker"** (the criterion ① trap).
3. **~10:45–14:30:** build the ONE magic moment + the share/invite loop. Nothing else.
4. **~14:30 freeze.** Working submission by **15:00**. Then polish the demo.
5. **In parallel all day:** QR code in the room, link in socials/Slack, real users trying it, waitlist number climbing.
6. **16:30 demo · 17:30 pitch** — rehearse 3×.
- **Rule:** if a task doesn't create the magic moment or move the north-star number, it waits.

## 4. Product — ✅ Goose (locked)
**Goose** — an AI accountability partner in the form of a relentless, slightly unhinged goose that hunts you down until your tasks are done.
- **One-liner:** Tell Goose your top 1–3 tasks; it nags, guilt-trips, and hypes you in-character until they're done — your streak proves it.
- **Magic moment:** set a task → Goose fires a real, personalized nag ("It's 2pm. The landing page. I'm watching."). Best delivered as a **text** (no install).
- **Growth loops:** (1) shareable Goose nag/streak cards = memeable spread; (2) "let Goose watch your friend too" = buddy invite.
- ⚠️ **Originality (criterion ①):** judges said *not "another to-do list or health app"* — and Goose's task-nag core sits right next to that line. **Our originality = the unhinged goose *character* + the proactive "it texts you / hunts you down" mechanic + memeable nag/streak cards.** Always pitch & build it as *a creature that comes after you*, **never** "a smarter to-do list." (Single track now, so the old multi-track reskin is retired.)
- Full spec + demo script: `IDEAS.md`.

## 5. Stack — speed + zero-install distribution
- **App:** PWA (Next.js + Tailwind) → **Vercel**. Instant shareable link, installable to home screen, no App Store / no dev licence. Right call given ~4h + "any tools."
- **AI:** **Claude API** = Goose's nag persona (the magic is the prompt; invest there). Use sponsor AI credits if offered.
- **Scheduling + nudges:** **Google Calendar API schedules *when*** (reads your real deadlines + writes new task reminders to nag about later) → a **chat app (Telegram/WhatsApp) *delivers*** the nag ("Goose texts you", zero install). In-app goose chat = demo fallback.
- **Waitlist:** Formspree / Tally (instant) or Supabase. **QR code** for in-room signups.
- **Alts:** Glide (no-code PWA) if no one's coding; Expo Go only if a track demands true native.

## 6. Timeline checklist (mapped to the real clock)
**Pre-kickoff (now → 10:30) — track-independent**
- [x] PWA scaffold + Vercel project + live URL → **goose-lockin.vercel.app**
- [x] Waitlist landing page live *(email → Google Sheet)*; ⬜ signup counter
- [ ] Goose persona prompt on the Claude API *(app still uses canned nags)*
- [~] Nudge plumbing — Calendar schedules → chat app delivers *(in progress)*
- [ ] QR code generated for the live link

**Kickoff (10:30)** — *single track + rubric (Originality / UI-UX / Execution) already known*
- [ ] Write down the still-open items: prizes, submission format, demo/pitch time limit, sponsor tools
- [ ] Lock the **most original** framing/copy for Goose; cut anything that reads as a plain to-do/health app

**Build (10:45 → 14:30)**
- [~] Core loop: task input ✅ → Goose nag *(canned ✅ / Claude ⬜)* → done/ghost + streak ✅
- [x] Share artifact (Goose card) ✅; ⬜ buddy invite
- [x] Deployed ✅; ⬜ test on a real phone via the QR

**Submit & polish (15:00)**
- [ ] Working build submitted at 15:00 (don't let the form be the failure point)
- [ ] Freeze features; rehearse demo + pitch; record a fallback clip

**Demo 16:30 · Pitch 17:30**
- [ ] Live magic moment + the climbing traction number + a real user quote

## 7. Traction playbook
Pick ONE north-star number and make it visibly climb.
- **QR code = the superpower:** on your laptop, a slide, a sticker. Anyone scans → in the app in 2 seconds. Walk the room.
- **"Goose texts you"** is the demo hook *and* the distribution (no install).
- Drop the link in the **event Slack/Discord**, your socials, group chats.
- Every signup = a real number for the pitch, even before the app is finished.
- Capture: a screenshot of the climbing counter + 2–3 real user quotes.

## 8. Demo & pitch
**Hit all three judging criteria on stage:** ① **Originality** — name the wedge out loud ("not a to-do app — a creature that hunts you"); ② **UI/UX** — let them *feel* how clean & fast it is on a phone; ③ **Execution** — the live climbing number + a real user quote.
Two moments — confirm the time limits at kickoff (assume ~2–3 min):
- **16:30 live demo:** show the ONE magic moment — set a task, Goose texts a nag live. Make them laugh.
- **17:30 final pitch:** problem → live magic → "we launched this morning, here's the number" → why it's big → team/ask.
- Keep a **recorded fallback** of the live nag in case WiFi fails.

## 9. Safety & tone
Accountability app (lighter than a health app, but still):
- Goose nags for laughs, **never cruelty.** If someone's genuinely struggling (not just procrastinating), drop the bit.
- Tasks are personal data → minimal retention, be transparent.

## 10. How Claude helps
- **Bias to action**; protect the ~4h budget — simplest shippable path, always.
- **Pre-build now** — single track is confirmed, so there's no track reveal to wait for; just lock the most original framing and ship.
- **Guard originality (criterion ①):** if a request makes Goose look like a generic to-do/health app, flag it and steer back to the character/proactive-texting wedge.
- Keep the stack in §5 unless a track forces otherwise.
- Tools I can drive: **Vercel** (deploy/domains), **Figma/Canva** (mascot + assets), `web-artifacts-builder` / `ui-ux-pro-max` (fast UI), `visualize` (mockups), web search.
- Log real decisions to `MEMORY.md`.

## 11. Confirm at the 10:30 kickoff
1. ✅ ~~Tracks / theme~~ — *single track, confirmed*  2. Prizes  3. ✅ ~~Judging criteria~~ — *Originality / UI-UX / Execution, confirmed (weights not given — ask if there's a tie-breaker)*  4. Submission format + exact deadline  5. Demo & pitch time limits  6. Sponsor AI tools / API credits  7. The "wallet / token" thing — is there a web3 angle or sponsor?
