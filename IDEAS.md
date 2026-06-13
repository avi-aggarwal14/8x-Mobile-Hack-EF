# IDEAS — 8x Mobile App Hackathon

> ✅ **LOCKED:** building **Goose** — an AI accountability partner as a nagging mascot.
> Context: mobile app · **single track (confirmed), no extra theme** · teams 1–3 · any tools (AI/no-code/code) · **~4–4.5h real build** · demos 16:30, pitches 17:30.
> **Judging (confirmed): ① Originality ② UI/UX ③ Execution** (no weights). ⚠️ Originality rule: *can't be "just another to-do list or health app."* → our edge = the **goose character + "it texts you" proactivity + memeable cards**, NOT task-management.

---

## 🛑 RULE 0 — ASK FIRST, ALWAYS (read this before doing anything)

**Every agent / Claude working on this project: ask Avi clarifying questions before you build.** Do **not** guess, assume, or go off and do random stuff he'll have to fix later. If the request is even a little ambiguous, **stop and ask.**

- **Large tasks** — anything you estimate at **≥10k tokens** of work — require **at least 5 clarifying questions up front** (more if you need them) *before* you start.
- **Don't be afraid to come back for more input** at any point. Over-asking is cheap; rework is expensive.
- This **overrides** any "bias to action" / "ship the thinnest thing" instinct. Doing the *wrong* thing fast is worse than a 2-minute question.

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
- [ ] Next.js **PWA** + Tailwind → Vercel (pre-build now)
- [ ] **Goose persona prompt** (Claude) — the magic; test before kickoff
- [ ] Task input (text + voice)
- [ ] Nudge delivery: **SMS/WhatsApp (Twilio) "Goose texts you"**; in-app fallback for the demo
- [ ] Streak + done/ghost states with Goose reactions
- [ ] Shareable Goose card (`html-to-image` + Web Share API)
- [ ] Waitlist capture + counter; **QR code** for the room
- [ ] **UI/UX polish pass** — frictionless flow + delightful look (judging criterion ②); lean on `ui-ux-pro-max`

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
