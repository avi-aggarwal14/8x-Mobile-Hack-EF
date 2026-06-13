# MEMORY — 8x Mobile App Hackathon

> Durable context + running decisions log. Read at the start of every session; update as things get decided.

---

## 🛑 RULE 0 — ASK FIRST, ALWAYS (read this before doing anything)

**Every agent / Claude working on this project: ask Avi clarifying questions before you build.** Do **not** guess, assume, or go off and do random stuff he'll have to fix later. If the request is even a little ambiguous, **stop and ask.**

- **Large tasks** — anything you estimate at **≥10k tokens** of work — require **at least 5 clarifying questions up front** (more if you need them) *before* you start.
- **Don't be afraid to come back for more input** at any point. Over-asking is cheap; rework is expensive.
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
- **PWA** (Next.js + Tailwind) → Vercel. No App Store / no dev licence — instant shareable link.
- **Claude API** = Goose's nags. **SMS/WhatsApp (Twilio) = "Goose texts you"** (zero install). **QR code** for in-room signups. Waitlist via Formspree/Tally or Supabase.

## Safety & tone
- Goose nags for laughs, never cruelty; drop the bit if someone's genuinely struggling. Personal data → minimal retention, be transparent.

---

## Decisions log
- **2026-06-13 (judging confirmed by organizer):** **One track** + a **3-part rubric: ① Originality ② UI/UX ③ Execution** (no weights). Originality is explicit: *not "another to-do list or health app."* → Retired the multi-track reskin plan (no theme to flex to); committing to the **most original framing of Goose** (chaotic character + proactive texting + memeable cards, *not* task-management) and optimizing the build for all three criteria. Updated `CLAUDE.md` (§1–§4, §6, §8, §10, §11), `IDEAS.md`, this file.
- **2026-06-13 (event facts confirmed):** Pulled the Luma page. It's the **8x Mobile App Hackathon** at **EF London** (venue only), host **Darijan Ducic**. One-day, **~4–4.5h real build** (kickoff 10:30 → submission 15:00), demos 16:30, pitches 17:30. **Open theme; tracks/prizes/judging announced at 10:30.** Teams 1–3; any tools. → Plan: pre-build the track-independent skeleton, then flex Goose to the track.
- **2026-06-13 (correction):** Event is at **EF London**, not Austin; **EF is venue only** (not organizer/judge). Earlier EF-as-organizer/"found don't follow" framing was wrong and is removed.
- **2026-06-13 (product):** Pivoted from a mental-health reframing idea ("Unspiral") to an **accountability app**. Locked **"Goose"** — AI accountability nag-mascot. Engine = AI hunts you; vibe = nagging mascot. Distribution = PWA + SMS + QR (no App Store).

## Key links
- **Luma event:** https://luma.com/t4j6h0br?tk=7WQ2wo
- Landing page: _TBD_ · Repo: _TBD_ · Vercel: _TBD_ · Waitlist: _TBD_ · Submission form: opens 15:00 (link at kickoff)
