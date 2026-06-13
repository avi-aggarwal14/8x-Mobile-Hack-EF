# IDEAS — Accountability App (8X Mobile Hackathon)

> ✅ **LOCKED (June 13, 2026):** We're building **Goose** — an AI accountability partner as a nagging mascot.
> Engine = *AI hunts you down*. Vibe = *nagging mascot*. Spec below. Earlier mental-health concepts kept at the bottom as backup.

---

## ✅ What we're building — "Goose"

**Goose** is an AI accountability partner that takes the form of a relentless, slightly unhinged goose. You tell Goose your top 1–3 tasks for the day (10-second text or voice dump). Goose hunts you down with in-character nags until you do them, reacts to your wins and your ghosting, and builds your streak.

**Who it's for:** founders first (no boss, infinite distractions, death by their own lack of follow-through) → then anyone who can't stay on task. *Goose is the boss you choose.*

- **Name:** Goose *(working — alts: Honk, Nag, Locked In, On It, Cadence)*
- **One-liner:** Tell Goose your top tasks; it nags, guilt-trips, and hypes you in-character until they're done — and your streak proves it.
- **The one magic moment:** you set a task → Goose fires a real, personalized nag at you. *"It's 2pm. The landing page. I'm watching. 🪿"*
- **Engine:** AI proactively pings you (works even solo → low cold-start friction for same-day traction).
- **Vibe:** nagging mascot — funny, passive-aggressive, never cruel. A character with moods (smug, disappointed, proud).

## Why this wins the room (EF + traction)
- **Memeable brand:** a nagging goose is inherently funny and shareable — the mascot does marketing for us (Duolingo-owl playbook).
- **Two growth loops:** (1) Goose's nag/streak cards are screenshot-able → organic social spread; (2) *"Let Goose watch your friend too"* → buddy invite (K-factor) we layer on after the core.
- **Demo wow:** on stage, set a task and a real push/text from Goose fires live. Tangible + funny = memorable to judges.
- **Low-tech, on purpose:** the magic is a Claude persona prompt, not infra. Frees the day for traction (the Pop the Bubble fix).
- **Company story:** wedge = founders who can't stay on task → the AI accountability layer for getting anything done. Productivity + the discipline/loneliness gap of solo & remote work.

## Core loop
`What are you locking in today?` (type/voice, 1–3 tasks) → Goose confirms with attitude → **Goose pings you through the day** (push / SMS / in-app) → you mark done / not done → Goose reacts (proud honk vs. disappointed) + **streak updates** → share a Goose card / *invite a friend so Goose watches them too.*

## Build checklist (speed-first)
- [ ] Next.js **PWA** + Tailwind → Vercel
- [ ] Task input screen (text + voice)
- [ ] **Goose persona prompt** (Claude) — *this is the magic; invest here.* Generates in-character nags from the user's actual tasks + how overdue they are
- [ ] Nudge delivery: push notification (PWA) or SMS (sponsor/Twilio if available); in-app fallback for the demo
- [ ] Streak + done/ghost states with Goose reactions
- [ ] Shareable "Goose card" (streak + best nag) via `html-to-image` + Web Share API
- [ ] Waitlist email capture (north-star counter)
- [ ] Mascot art: simple SVG / 🪿 for v1 (upgrade in Canva/Figma if time)

## Demo script (the wow — ~3 min)
1. **Hook (15s):** "Founders have no boss. So nothing gets done. Meet your new one." 
2. **Live magic (45s):** set a task on stage → Goose fires a real nag at the phone. Mark it done → Goose celebrates; "forget" one → Goose guilt-trips. Laughs in the room.
3. **Traction (45s):** "We launched this morning — here's the signup counter," show the climbing chart + a real Goose nag someone shared.
4. **Why it's big (45s):** founder wedge → anyone; the memeable mascot is the growth engine; buddy loop is next.
5. **Team + ask (30s):** why us.
- Keep a **recorded fallback** of the live nag in case WiFi fails.

## Tone & safety
- Goose nags and guilt-trips **for laughs, never cruelty.** It's a bit, not bullying.
- If a user expresses real distress (not just procrastination), Goose **drops the act, softens, and points to support** — don't roast someone who's struggling.
- Tasks are personal data → minimal retention, be transparent about what's stored.

## Name options
**Goose** (recommended — memeable) · Honk · Nag / Nagi · Locked In · On It · Cadence · Sidekick

---

## Appendix — earlier idea slate (mental-health, backup)
Kept in case we pivot. Full detail was in the prior version; condensed here:
1. **Unspiral** — dump an anxious thought → AI reframe → shareable card. (Was the prior lead.)
2. **Two Good Things** — BeReal for gratitude; invite-required loop.
3. **Hype** — pocket hype-man; funny shareable outputs.
4. **Vent & Vanish** — Snapchat for feelings; ephemeral venting.
5. **Grounded** — 2am panic button; better as a feature than standalone.
6. **Mind Wrapped** — Spotify-Wrapped for your mood; retention layer.

*(If we ever merge themes: Goose could nag you toward self-care tasks too — accountability ∩ mental health.)*
