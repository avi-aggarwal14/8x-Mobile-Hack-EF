# MEMORY — 8x Mobile App Hackathon

> Durable context + running decisions log. Read at the start of every session; update as things get decided.

---

## 🛑 RULE 0 — ASK FIRST, ALWAYS (read this before doing anything)

**Every agent / Claude working on this project: ask Avi clarifying questions before you build.** Do **not** guess, assume, or go off and do random stuff he'll have to fix later. If the request is even a little ambiguous, **stop and ask.**

- **Large tasks** — anything you estimate at **≥10k tokens** of work — require **at least 5 clarifying questions up front** (more if you need them) *before* you start.
- **Don't be afraid to come back for more input** at any point. Over-asking is cheap; rework is expensive.
- **Log every change in the docs — immediately.** Whenever you do *anything* (ship code, deploy, set up a service, change config, make a decision), record it in the `.md` file it's **most relevant to** *before you move on*: build/status → `CLAUDE.md` §0 + the `IDEAS.md` checklist; decisions, links & context → `MEMORY.md` (dated decisions-log entry). The three docs must always mirror reality — **no silent changes.**
- This **overrides** any "bias to action" instinct elsewhere in these docs. Doing the *wrong* thing fast is worse than a 2-minute question.

---

## Who we are
- **Avi Aggarwal** (avi.aggarwal2011@gmail.com) — founder, on the invite list (listed as "inviter" on the Luma page). Builds mobile + AI; repeat hackathon builder.
- **Team:** 1–3 allowed. _TBD — list members + roles (build / marketing / pitch)._

## The event (from the Luma page)
- **8x Mobile App Hackathon** — build a mobile app. **Sat June 13, 2026.**
- **Venue:** Entrepreneurs First, Shoreditch Exchange, Senna Building, Gorsuch Pl, London E2 8JF. **EF = venue only.**
- **Host / series:** Darijan Ducic · "8x" event series (not formally defined).
- **Teams:** 1–3 · **Tools:** anything (AI / no-code / code / agents / APIs); sponsor AI tools provided.
- **Schedule:** 10:00 doors · **10:30 kickoff (tracks + sponsors + prizes announced)** · 12:30 lunch · **15:00 submission opens** · 16:30 live demos · 17:30 final pitches + winners.
- **CONFIRMED (June 13):** **single track** (no extra theme) · **judging = ① Originality ② UI/UX ③ Execution** (no weights). Originality rule: *not "just another to-do list or health app."*
- **Still TBD (get at 10:30):** prizes, submission format, demo/pitch time limit, sponsor tools.
- **Watch:** waitlist asked to "verify token ownership with your wallet" → possible web3/token angle or sponsor.

## The big lesson (from "Pop the Bubble")
- Last hackathon we were **too technical and got marketing traction too late** — little user traction at judging.
- **This time: distribution-first.** Waitlist + shareable link early, one growing number all day, real users in the room. The build serves the traction.

## Why traction-first still holds
- **Rubric confirmed: ① Originality ② UI/UX ③ Execution.** Execution = *ship + real users*, so traction-first directly scores ⅓ of the rubric — it holds. But it's now **one of three**: we also must be **original** (not a to-do/health clone) and **polished** (UI/UX).
- A working mobile demo + real traction + a clear story still beats technical depth with no users in a ~4-hour window — now framed around all three criteria.

## Product direction
- ✅ **LOCKED: "Goose"** — AI accountability partner as a nagging mascot (a relentless goose) that hunts you about your top 1–3 daily tasks. Mobile, deliberately low-tech (magic = the Claude persona prompt). **Single track now → reskin plan retired; commit to the most original framing** (see `IDEAS.md`).
- ⚠️ **Originality risk (criterion ①):** Goose's task-nag core is adjacent to the "to-do list app" the judges said *not* to build. **Mitigation:** sell the *character + proactive "it texts you" + memeable cards*, never "task manager."
- North-star metric: **waitlist signups** (= our Execution evidence).

## Stack & distribution
- **PWA** → Vercel. No App Store / no dev licence — instant shareable link. *(As-built: vanilla HTML/JS static PWA, not Next.js yet.)*
- **Claude API** = Goose's nags *(✅ wired via `/api/nag`, canned fallback)*. **Google Calendar schedules *when* → chat app (Telegram/WhatsApp) "Goose texts you" delivers.** **QR code** for in-room signups. Waitlist = **Google Apps Script → Google Sheet** (as-built).

## Build status — live now (June 13, mid-build)
- 🟢 **Deployed:** https://goose-lockin.vercel.app (Vercel project `goose-8x`). Repo: github.com/avi-aggarwal14/8x-Mobile-Hack-EF.
- 🟢 **Landing** (`/`): email waitlist → **Google Apps Script → Google Sheet** (live, collecting); PWA install + nag samples.
- 🟢 **Interactive app** (`/app`): name + 3 tasks → goose chat (escalating nags, done/ghost/skip), XP/levels/streak/confetti, shareable card (html2canvas + Web Share). ✅ Nags from **Claude via `/api/nag`** (canned fallback).
- 🟢 **PWA:** manifest + service worker + install prompts.
- 🟡 **Google Calendar API:** two-way — reads real calendar/deadlines to nag about, AND writes new tasks/reminders (with deadlines) to nag about later. Goose's scheduling + awareness brain. **As-built:** client-side connector (GIS token model, scope `calendar.events`, no backend/secret) — `gcal.js`, `config.js` — ✅ Client ID wired (project Goose/`goose-499311`). ✅ **Connect button now on landing + app start screen** (plus `/calendar.html`). 🔓 **Public:** OAuth **published to Production** → anyone can connect via the "unverified app" warning (Part F). ⚠️ Unverified prod apps cap at ~100 users until Google verification. **Next:** use calendar reads inside the nags.
- 🟡 **Nag delivery:** Calendar schedules *when* → **chat app (Telegram/WhatsApp) delivers**. Claude engine + chat delivery still to build.
- 🟡 **Waitlist → email + phone** (phone capture being added so Goose can text you).
- ✅ **URL fixed:** share card + share text now use **goose-lockin.vercel.app** (project still internally named `goose-8x`, not user-facing).

## Safety & tone
- Goose nags for laughs, never cruelty; drop the bit if someone's genuinely struggling. Personal data → minimal retention, be transparent.

---

## Decisions log
- **2026-06-13 (Claude API wired → live nags):** Replaced the canned nag strings with **Claude-generated lines** for *every* goose utterance (intro, escalating nags, done, ghost, all-done). Added a server-side **Vercel function `/api/nag.js`** calling **`claude-haiku-4-5`** (picked for low latency + cost on short one-liners — Avi's call over Opus/Sonnet) with a Goose persona system prompt; it takes task context (name, time, task list, escalation level 1–4, short session history) and returns one in-character line. `app/index.html` shows a typing bubble, posts to `/api/nag`, and **falls back to the canned `NAG` strings** on any failure (offline / API down / key unset) so the live demo never dies. **Key handling:** `ANTHROPIC_API_KEY` is a SECRET → lives ONLY as a **Vercel env var**, never in client JS or the repo (unlike the public Google Client ID in `config.js`). Used a zero-dependency `fetch` to the documented `/v1/messages` REST endpoint to keep the no-build static site intact. Smoke-tested the key + model live — valid, Haiku returned an in-character nag. **⚠️ Rotate this key after the hackathon** (it was pasted into chat in plaintext). **ACTION (Avi):** Vercel → project `goose-8x` → Settings → Environment Variables → add `ANTHROPIC_API_KEY` (Production + Preview) → redeploy, then test at `/app`.
- **2026-06-13 (Calendar made public + Connect surfaced):** Per Avi, **publishing the OAuth app to Production** so *anyone* can connect — this **reverses the earlier same-day revert to Testing** (Avi accepts the trade-off). Users pass Google's "unverified app" warning (Advanced → Continue); ⚠️ unverified production apps with the sensitive `calendar.events` scope are **capped at ~100 users** until full verification (privacy policy + domain + Google review — deferred). Surfaced the **Connect Google Calendar button on the landing page + the app start screen** (was only `/calendar.html`); both now load `config.js`+`gcal.js` with a Goose-flavored connect/result that tells users to click through the warning. **Vercel:** canonical `goose-lockin.vercel.app` is already public — no change (only the `*-projects.vercel.app` preview URLs sit behind Vercel's login wall). Updated `CALENDAR_SETUP.md` (new **Part F** = publish steps), `CLAUDE.md` §0, `IDEAS.md`. **Avi's to-do:** click **Publish app → Push to production** in the Console (Part F).
- **2026-06-13 (Calendar Client ID wired + live):** Avi created the OAuth Client ID `288285399458-...apps.googleusercontent.com` in Google project **Goose/`goose-499311`** — User type **External**, **Testing** mode (switched back from "In production" to keep a controlled test-user list + avoid the permanent unverified user cap), JS origins `https://goose-lockin.vercel.app` + `http://localhost:3000`, no redirect URIs. Pasted into `config.js`, committed, deployed. **Calendar connection is live & ready to verify** at `goose-lockin.vercel.app/calendar.html`. (Client ID is public by design — safe in the repo.)
- **2026-06-13 (Google Calendar — connection layer built):** Chose **client-side OAuth** (Google Identity Services token model, scope `https://www.googleapis.com/auth/calendar.events` = read+write events) — **no backend, no client secret**, fits the static PWA. Built `gcal.js` (connect / listToday / addTestEvent / disconnect), `config.js` (public Client ID holder), a Goose-styled `/calendar.html` connectivity test page, and `CALENDAR_SETUP.md` (Cloud Console steps). Committed + deployed. **OAuth app stays in Testing mode** (test users only; public would need Google verification for this sensitive scope — not feasible today). **Authorized JS origin = `https://goose-lockin.vercel.app`** — NOT the `goose-8x.vercel.app` alias, which 401s behind Vercel deployment protection. **Blocked on Avi:** create the OAuth Client ID in Google Cloud Console → send it to paste into `config.js`. Later: proactive nagging while the app is closed needs the server-side refresh-token flow.
- **2026-06-13 (working rules → RULE 0):** Added to RULE 0 across all three docs: (1) **ask Avi clarifying questions before building** (5+ for any ≥10k-token task); (2) **keep all three docs in context** at all times; (3) **every agent logs each change to the most-relevant `.md` before moving on** — docs must always mirror reality.
- **2026-06-13 (build shipped + Calendar direction):** Deployed Goose to **goose-lockin.vercel.app** (Vercel project `goose-8x`, repo `8x-Mobile-Hack-EF`). Live: landing page with **email waitlist → Google Apps Script → Google Sheet**, an **interactive `/app`** (3 tasks → escalating goose chat, done/ghost, streak/XP, shareable card), and PWA install. Nags are still **canned strings — Claude API not wired in yet.** Now building the **Google Calendar API** (two-way: read real deadlines to nag about + write new tasks/reminders to nag about later) as Goose's scheduler; **chat app (Telegram/WhatsApp) = delivery** (Calendar schedules → chat delivers). Adding **phone capture** to the waitlist. ⚠️ Code/share-card still say `goose-8x.vercel.app`; canonical is `goose-lockin.vercel.app` → reconcile.
- **2026-06-13 (judging confirmed by organizer):** **One track** + a **3-part rubric: ① Originality ② UI/UX ③ Execution** (no weights). Originality is explicit: *not "another to-do list or health app."* → Retired the multi-track reskin plan (no theme to flex to); committing to the **most original framing of Goose** (chaotic character + proactive texting + memeable cards, *not* task-management) and optimizing the build for all three criteria. Updated `CLAUDE.md` (§1–§4, §6, §8, §10, §11), `IDEAS.md`, this file.
- **2026-06-13 (event facts confirmed):** Pulled the Luma page. It's the **8x Mobile App Hackathon** at **EF London** (venue only), host **Darijan Ducic**. One-day, **~4–4.5h real build** (kickoff 10:30 → submission 15:00), demos 16:30, pitches 17:30. **Open theme; tracks/prizes/judging announced at 10:30.** Teams 1–3; any tools. → Plan: pre-build the track-independent skeleton, then flex Goose to the track.
- **2026-06-13 (correction):** Event is at **EF London**, not Austin; **EF is venue only** (not organizer/judge). Earlier EF-as-organizer/"found don't follow" framing was wrong and is removed.
- **2026-06-13 (product):** Pivoted from a mental-health reframing idea ("Unspiral") to an **accountability app**. Locked **"Goose"** — AI accountability nag-mascot. Engine = AI hunts you; vibe = nagging mascot. Distribution = PWA + SMS + QR (no App Store).

## Key links
- **Luma event:** https://luma.com/t4j6h0br?tk=7WQ2wo
- **Live app:** https://goose-lockin.vercel.app (Vercel project `goose-8x`) · **Repo:** https://github.com/avi-aggarwal14/8x-Mobile-Hack-EF
- **Waitlist:** Google Apps Script endpoint → Google Sheet (email now · phone in progress) · **Submission form:** opens 15:00 (link at kickoff)
