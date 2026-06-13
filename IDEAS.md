# IDEAS — 8x Mobile App Hackathon

> ✅ **LOCKED:** building **Goose** — an AI accountability partner as a nagging mascot.
> Context: mobile app · **single track (confirmed), no extra theme** · teams 1–3 · any tools (AI/no-code/code) · **~4–4.5h real build** · demos 16:30, pitches 17:30.
> **Judging (confirmed): ① Originality ② UI/UX ③ Execution** (no weights). ⚠️ Originality rule: *can't be "just another to-do list or health app."* → our edge = the **goose character + "it texts you" proactivity + memeable cards**, NOT task-management.

---

## 🛑 RULE 0 — ASK FIRST, ALWAYS (read this before doing anything)

**Every agent / Claude working on this project: ask Avi clarifying questions before you build.** Do **not** guess, assume, or go off and do random stuff he'll have to fix later. If the request is even a little ambiguous, **stop and ask.**

- **Large tasks** — anything you estimate at **≥10k tokens** of work — require **at least 5 clarifying questions up front** (more if you need them) *before* you start.
- **Don't be afraid to come back for more input** at any point. Over-asking is cheap; rework is expensive.
- **Log every change in the docs — immediately.** Whenever you do *anything* (ship code, deploy, set up a service, change config, make a decision), record it in the `.md` file it's **most relevant to** *before you move on*: build/status → `CLAUDE.md` §0 + the `IDEAS.md` checklist; decisions, links & context → `MEMORY.md` (dated decisions-log entry). The three docs must always mirror reality — **no silent changes.**
- This **overrides** any "bias to action" / "ship the thinnest thing" instinct. Doing the *wrong* thing fast is worse than a 2-minute question.

---

## 🟢 Status — live (June 13, mid-build)
**Deployed:** https://goose-lockin.vercel.app · **Repo:** 8x-Mobile-Hack-EF
- ✅ Landing + waitlist (email → Google Sheet) · ✅ interactive `/app` (3 tasks → goose chat, done/ghost, streak/XP, shareable card) · ✅ PWA install.
- ✅ **Claude API wired:** goose nags are now generated live by **Claude (Haiku 4.5)** via a server-side `/api/nag` function — canned strings kept as the offline fallback.
- 🟡 Building: **Google Calendar API** (reads your real deadlines to nag about + writes new tasks/reminders to nag about later) → schedules the nags; **chat app (Telegram/WhatsApp) delivers** them; **phone capture** on the waitlist. ✅ **Connect Calendar now on the landing + app start screen**; OAuth **published to Production** so anyone can connect (via the "unverified app" warning).
- ✅ Share card + share text now use `goose-lockin.vercel.app`.

---

## How we choose (given the real constraints)
1. **Fits ~4 hours** — magic in a prompt, not infra. One screen, one moment.
2. **Built-in traction loop** — sharing/inviting happens because of the core action (the Pop the Bubble fix).
3. **Demo wow on a phone** in <10s.
4. **Wins on originality** — a *character that hunts you*, not a to-do/health clone (judging criterion ①).
5. **Mobile-native feel** without an App Store (PWA + SMS).

## ✅ What we're building — "Goose"
An AI accountability partner that takes the form of a relentless, slightly unhinged goose. You tell Goose your top 1–3 tasks; it hunts you down with in-character nags (best delivered as **texts** — no install), reacts to wins and ghosting, and builds your streak.

- **One-liner:** Tell Goose your top tasks; it nags, guilt-trips, and hypes you until they're done — your streak proves it.
- **Magic moment:** set a task → Goose fires a real, personalized nag at your phone.
- **Two growth loops:** (1) memeable Goose nag/streak cards → social spread; (2) "let Goose watch your friend too" → buddy invite.
- **Why it fits 8x:** memeable mobile consumer app, dead-simple to build in the window, traction loop baked in, and a clean "founders → everyone" story.

## ⚠️ Reskin plan — RETIRED (single track confirmed)
There's **one open track** and a fixed rubric (① Originality ② UI/UX ③ Execution) — no morning-of theme to flex to. So drop the multi-track reskin and **commit to the most *original* framing of Goose**, optimized for the 3 criteria:
- **① Originality:** sell the unhinged-goose *character* + the "it hunts you / texts you" proactivity + memeable cards. **Never** frame Goose as a to-do list or health tracker — those are the two examples the judges explicitly called out.
- **② UI/UX:** one screen, <10s to the magic, delightful goose animations/reactions, zero friction.
- **③ Execution:** live waitlist counter + real people in the room using it by 16:30.
> Lean *weirder*, not more useful: when in doubt, push the comedy/character, not more task-management features.

## Build checklist (speed-first)
- [x] **PWA → Vercel** — live at goose-lockin.vercel.app *(as-built: static HTML/JS, not Next.js)*
- [x] **Goose persona prompt** (Claude) — ✅ wired via server-side `/api/nag` (Haiku 4.5); generates intro/nags/done/ghost/all-done in character; canned strings now the offline fallback. *(Needs `ANTHROPIC_API_KEY` set in Vercel.)*
- [x] Task input — name + top-3 tasks *(text only; voice = stretch)*
- [~] Nudge delivery — **Calendar schedules → chat app (Telegram/WhatsApp) delivers**; ✅ in-app goose chat works as the demo fallback
- [x] Streak + done/ghost states with Goose reactions *(+ XP, levels, confetti)*
- [x] Shareable Goose card (html2canvas + Web Share API) — ✅ now prints `goose-lockin.vercel.app`
- [~] Waitlist — ✅ email → Google Apps Script → Google Sheet; 🟡 phone capture in progress; ⬜ live counter + QR
- [~] **Google Calendar API** — ✅ client-side read+write connector, Client ID wired, **Connect button on landing + app start screen**, OAuth **published to Production** (anyone connects via the unverified-app warning); ⬜ fold calendar reads into the nags
- [~] **UI/UX polish pass** — clean Baloo/Nunito UI shipped; keep refining (criterion ②)

## Demo script (~2–3 min — confirm limit)
1. **Hook (15s):** "We have no boss. So nothing gets done. Meet your new one."
2. **Live magic (45s):** set a task → Goose texts a nag live. Mark done → celebrates; ghost one → guilt-trips. Laughs.
3. **Traction (45s):** "We launched this morning — here's the signup counter," + a shared Goose nag.
4. **Why it's big (30s):** the memeable mascot is the growth engine; buddy loop next.
5. **Team + ask (15s).**
- Keep a **recorded fallback** of the live nag.

## Tone & safety
- Goose nags **for laughs, never cruelty.** If someone's genuinely struggling, drop the bit.
- Tasks are personal → minimal retention, be transparent.

## Names
**Goose** (recommended — memeable) · Honk · Nag · Locked In · On It · Cadence

---

## Appendix — backup ideas (if Goose stalls)
Mobile, simple, traction-loop-first — *but each must also clear the originality bar (not a to-do/health clone), since that's criterion ①*:
1. **Two Good Things** — BeReal for gratitude; invite-required loop.
2. **Hype** — pocket hype-man; funny shareable outputs.
3. **Unspiral** — dump an anxious thought → AI reframe → shareable card.
4. **Vent & Vanish** — ephemeral venting; satisfying "vanish" animation.
