# 8X Mobile Hackathon — Project Brief & Playbook

> Working doc for our entry at the **8X Mobile Hackathon (ATX)** hosted by **Entrepreneur First**, today **Sat, June 13, 2026**, Austin TX.
> This file is the single source of truth. `IDEAS.md` = what we build. `MEMORY.md` = durable context + decisions log.

---

## 1. TL;DR — The one thing that matters

Last time (**Pop the Bubble**) we over-built and under-marketed. We had no traction to show by demo time.
**This time we flip it: distribution first, build second.** The app exists to generate *real users and real numbers by the time we pitch.*

> **North-star metric for the day:** a single live, growing number we show the judges (waitlist signups OR shares OR sessions). Pick one and make it climb all day.

EF backs **people + ambition + traction**, not technical polish ("Found, don't follow"). A simple app with 200 real signups and a great story beats a complex app with 0 users. Build accordingly.

---

## 2. Event facts — confirm on-site

Fill these in from the kickoff / event Slack/Discord. **[CONFIRM]** = grab the real answer ASAP; it changes our plan.

- **Event:** 8X Mobile Hackathon, hosted by Entrepreneur First (EF)
- **Date / hours:** June 13, 2026 — **[CONFIRM start, end, and demo time]**
- **Length:** **[CONFIRM 1-day vs overnight/2-day]** (plan assumes ~1 day sprint)
- **Theme / required prompt:** **[CONFIRM — is "mobile" the only constraint, or is there a theme/track?]**
- **Team size limit:** **[CONFIRM]**
- **Judging criteria + weights:** **[CONFIRM the rubric — ask an organizer directly]** (expect some mix of: traction/impact, product, design, technical, pitch)
- **Prizes / tracks:** **[CONFIRM]**
- **Demo format:** **[CONFIRM — live demo? slides allowed? time limit? (assume 2–3 min)]**
- **Submission:** **[CONFIRM — Devpost? form? what's due and when?]**
- **Sponsors / API credits:** **[CONFIRM — free credits we can use? sponsor prize tracks worth targeting?]**
- **WiFi / power / venue logistics:** **[CONFIRM]**

> 📌 Knowing the **judging rubric** and **demo time limit** is worth more than an hour of coding. Get them first.

---

## 3. Strategy — Traction-first (the Pop the Bubble fix)

The order of operations is deliberately backwards from how most teams work:

1. **Hour 0–1:** Lock the idea (see `IDEAS.md`), buy/point a domain, stand up a **landing page + waitlist**. Start collecting emails *before the app works.*
2. **Hour 1–2:** Push the landing page everywhere (see §7). Begin the traction counter.
3. **Hour 2–N:** Build the thinnest possible version of the product that delivers ONE magic moment + a built-in share/invite loop.
4. **Throughout:** Put it in real hands at the venue. Screenshot real usage. Collect 2–3 user quotes.
5. **Last 2 hrs:** Freeze features. Polish the demo + pitch. Rehearse 3×.

**Rule:** if a task doesn't either (a) create the one magic moment, or (b) drive the north-star number — it waits.

---

## 4. The Product — ✅ LOCKED: "Goose"

**Goose** — an AI accountability partner in the form of a relentless, slightly unhinged goose that hunts you down until you finish your tasks.

- **Name:** Goose *(working — alts: Honk, Nag, Locked In, On It, Cadence)*
- **One-liner:** Tell Goose your top 1–3 tasks; it nags, guilt-trips, and hypes you in-character until they're done — and your streak proves it.
- **The one magic moment:** set a task → Goose fires a real, personalized nag ("It's 2pm. The landing page. I'm watching. 🪿"). On stage = a live push/text.
- **The growth loop:** (1) shareable Goose nag/streak cards = memeable spread; (2) "let Goose watch your friend too" = buddy invite (layer on after core).
- **North-star metric:** waitlist signups (start the counter at H+0).
- **Engine + vibe:** AI proactively pings you · nagging-mascot personality *(locked June 13)*.

Full spec + demo script: `IDEAS.md`.

---

## 5. Tech stack — optimized for speed + instant distribution

Goal: shippable link in hands within the hour, no app-store delay, feels native on a phone.

- **App:** **Next.js PWA** (installable mobile web app) + **Tailwind** → deploy on **Vercel** (we have the Vercel connector here). Anyone opens a link instantly — zero install friction = better traction in a 1-day window than App Store/TestFlight.
  - *Alt if we want "real native app" credibility:* **Expo / React Native** + Expo Go for instant sharing. Slower to first demo. Decide based on the rubric.
- **AI:** **Claude API.** Use `claude-opus-4-8` or `claude-fable-5` for response quality on the core feature; `claude-haiku-4-5` for speed/cost on simple calls. The magic is in the **prompt**, not heavy code.
- **Waitlist / data:** start with a no-code capture (Tally/Typeform) or a single **Supabase** table. Don't build auth unless the demo needs it.
- **Design:** Figma (connector available) for a quick mockup; **Canva** (connector) for marketing/social assets; `ui-ux-pro-max` skill for polished UI code.
- **Landing page:** can be a one-file artifact first (use `web-artifacts-builder` skill), then upgrade.

> Decision: **PWA-first** unless an organizer says native is required or rewarded. Confirm in §2.

---

## 6. Game plan — timeline checklist

Times are relative to **H+0 = when building starts**. Adjust once we know total hours.

**Phase 1 — Setup & distribution (H+0 → H+2)**
- [ ] Confirm event facts in §2 (rubric, demo time, submission)
- [ ] Lock the idea in §4
- [ ] Name + grab domain (check availability — we have a domain-check tool)
- [ ] Landing page live with waitlist + clear value prop
- [ ] Traction counter started (§7) — first posts out
- [ ] Repo + Vercel project scaffolded

**Phase 2 — Build the magic moment (H+2 → H+60%)**
- [ ] Core feature: one input → one delightful AI output
- [ ] Built-in share/invite loop wired in
- [ ] Safety guardrails (§9) — non-negotiable for mental health
- [ ] Deploy; test on a real phone

**Phase 3 — Traction push + real users (ongoing, peaks mid-event)**
- [ ] Get 10+ strangers at the venue to use it; screenshot it
- [ ] Collect 2–3 user quotes / reactions
- [ ] Keep the number climbing; capture the growth chart

**Phase 4 — Demo & pitch (last 2 hrs — FREEZE features)**
- [ ] 3-min pitch written (§8) + slide/visual
- [ ] Live demo path rehearsed (with offline fallback: recorded GIF/video)
- [ ] Submission completed early (don't let the form be the failure point)
- [ ] Rehearse 3×, time it

---

## 7. Traction playbook — how we win on marketing

Pick **ONE** north-star number and make it visibly climb all day.

**Channels to hit in the first 2 hours:**
- Event **Slack/Discord** — share the link + ask for feedback (organizers love engaged teams)
- Our own socials (IG story, X, LinkedIn) + personal group chats / college GroupMes
- Relevant communities — *read the rules first*, contribute don't spam: r/Anxiety, r/mentalhealth, r/getdisciplined, mental-health Discords
- In-person: literally walk the venue and get people to try it

**Make sharing intrinsic:** the product should produce something a user *wants* to post (a beautiful card, a funny output) or *needs a friend for* (invite loop). That's the engine — not paid ads.

**Capture proof for the pitch:**
- Live signup/usage counter (screenshot the growth curve)
- Screen recordings of real strangers using it
- 2–3 verbatim user quotes
- Any organic share you can point to

---

## 8. Demo & pitch — 3-minute structure

EF rewards founder thinking. Structure:

1. **Hook (15s):** the problem, made visceral. ("X million people spiral with anxiety daily and have nothing for the 2am moment.")
2. **Live magic moment (45s):** demo the ONE thing. Use a real audience-supplied input if safe. Make them feel it.
3. **Traction (45s):** *the differentiator.* "We launched this morning. Here's the number." Show the climbing chart + a real user quote.
4. **Why this is big (45s):** the wedge → the company. Market size, the growth loop, where it goes.
5. **Team + ask (30s):** why us, what we'd do with more time/the prize.

Have a **recorded fallback** of the demo in case WiFi/live fails.

---

## 9. Safety & ethics — MANDATORY (mental health)

Skipping this loses points *and* is the right thing to do. Bake in from the start:

- **Crisis handling:** detect self-harm / crisis language → surface **988 (US Suicide & Crisis Lifeline)** and Crisis Text Line (text HOME to 741741). Never try to "reframe" or trivialize a crisis input.
- **Clear disclaimer:** "Not a substitute for professional care / not a therapist."
- **Privacy:** don't store sensitive entries longer than needed; if anonymous, say so; no surprise data use.
- **Tone:** warm, validating, never preachy or clinical-cold.
- Put a one-line safety note in the pitch — it reads as maturity to EF judges.

---

## 10. How Claude helps — working agreements

When I (Claude) help during the event:
- **Bias to action.** Ship the thinnest thing that works. Suggest the simplest path, not the most "correct" one.
- **Protect the timeline.** If a request risks the demo, say so and offer the faster route.
- Default stack = §5 (PWA + Claude API + Vercel). Flag if a request implies a heavier path.
- Keep **safety guardrails (§9)** in anything user-facing.
- Update `MEMORY.md` decisions log when we make a real call.
- Tools I can drive here: **Vercel** (deploy, domains), **Figma** (mockups/design), **Canva** (marketing assets), `web-artifacts-builder` / `ui-ux-pro-max` skills (fast UI), `visualize` (quick mockups), web search.

---

## 11. Open questions to fill in (ask Avi / organizers)

1. Exact **judging rubric + weights**? (biggest unknown)
2. **Demo time limit** + live-demo vs slides?
3. **Theme/track** beyond "mobile"? Any sponsor prize worth targeting?
4. **Team:** who's on it, who does build vs marketing vs pitch?
5. **Total hours** available?
6. Native-app requirement, or is a **PWA** fine?
7. Any **API credits / sponsor tools** we should use?
