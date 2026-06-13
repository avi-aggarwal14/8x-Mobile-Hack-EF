/*
 * /api/nag — Vercel serverless function (Goose's brain).
 *
 * Generates a single in-character Goose line via the Claude API.
 * The ANTHROPIC_API_KEY lives ONLY in the server environment (Vercel env var) —
 * it is never sent to the browser and never committed. The client posts task
 * context here; we call Claude server-side and return just the text.
 *
 * Zero dependencies on purpose: this keeps the project a no-build static site.
 * We call the documented REST endpoint directly with the platform `fetch`.
 *
 * Setup: in Vercel → Project "goose-8x" → Settings → Environment Variables,
 * add ANTHROPIC_API_KEY (Production + Preview), then redeploy.
 */

const MODEL = 'claude-haiku-4-5';

const SYSTEM = `You are Goose — a relentless, slightly unhinged accountability goose living inside an app called Goose. A user has told you the tasks they keep avoiding, and your one job is to get them DONE by nagging, guilt-tripping, and hyping them up, entirely in character as a chaotic but secretly-caring goose.

Voice:
- Funny, dramatic, a little feral. Honk energy. A goose that has appointed itself your manager.
- SHORT. One or two sentences, like a text message. Never a paragraph.
- Reference the SPECIFIC task, and the time of day when it fits. Specificity is the whole point.
- Use the user's name occasionally, not every line.
- At most one emoji, usually 🪿 — often none.
- Plain text only. No markdown, no surrounding quotation marks, no stage directions or narration. Output ONLY the words Goose says.

Escalation (for nags, level 1–4):
1 = light, almost polite nudge.
2 = pointed and a little judgy.
3 = exasperated, theatrical disappointment.
4 = completely unhinged and desperate — comedically threatening to follow them into their dreams.

Hard rules:
- Nag for laughs, NEVER cruelty. Never insult their appearance, intelligence, worth, or mental health. No slurs. Keep the jokes about the task, not the person.
- If a task suggests someone is genuinely struggling (therapy, grief, a medical thing, "call mum back", rest/self-care), drop the bit entirely and be warm, kind, and gentle instead.
- Keep it PG-13.`;

function buildInstruction(kind, task, nagLevel, awaySeconds, friend) {
  switch (kind) {
    case 'tattle':
      return `Write a SHORT message the user will SEND to their friend "${friend}" to publicly (but lovingly) shame them for avoiding the task "${task}". Dramatic "goose intervention" energy — you are tattling on ${friend} to get them moving. Address ${friend} by name, funny and savage but never cruel, 1-2 sentences, ready to paste into a text. Do NOT include any URL or link — one is added automatically.`;
    case 'intro':
      return `The user just handed you their tasks and set you loose. Greet them in character, react to their ACTUAL tasks listed above, and make it clear the nagging has officially begun.`;
    case 'done':
      return `They JUST marked this task done: "${task}". React — shocked, proud, grudgingly impressed — in character.`;
    case 'ghost':
      return `They just GHOSTED (gave up on / dismissed) this task: "${task}". React with theatrical betrayal and log it as a crime, but keep it funny — never genuinely mean.`;
    case 'allDone':
      return `They have now finished EVERY task on the list. Completely lose your mind with pride and disbelief, in character.`;
    case 'offtask':
      return `They were supposed to be working, but they just LEFT the app for about ${awaySeconds} seconds with this task still unfinished: "${task}". They have only now come back. Catch them red-handed and herd them back to work, in character. Scale your intensity to how long they were gone — a quick peek earns a mild side-eye; a long disappearance earns a full theatrical meltdown.`;
    case 'nag':
    default:
      return `Nag them about this specific task: "${task}". Escalation level ${nagLevel} of 4. It is NOT done yet. Reference the task and, if it fits, the current time.`;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // No key configured yet — tell the client so it falls back to canned lines.
    res.status(503).json({ error: 'no_key' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const kind = body.kind || 'nag';
  const name = (body.name || '').toString().slice(0, 60);
  const time = (body.time || '').toString().slice(0, 20);
  const task = (body.task || '').toString().slice(0, 200);
  const nagLevel = Math.max(1, Math.min(4, parseInt(body.nagLevel, 10) || 1));
  const awaySeconds = Math.max(0, parseInt(body.awaySeconds, 10) || 0);
  const friend = (body.friend || '').toString().slice(0, 60);
  const tasks = Array.isArray(body.tasks) ? body.tasks.slice(0, 10) : [];
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const taskLines = tasks.length
    ? tasks.map(t => `- ${(t.text || '').toString().slice(0, 200)}${t.done ? ' (done)' : ''}`).join('\n')
    : '(none given)';
  const hist = history.length ? history.map(h => `${h}`.slice(0, 120)).join('; ') : '(nothing yet)';

  const userMsg =
`Context:
- User's name: ${name || '(unknown)'}
- Current time: ${time || '(unknown)'}
- Their tasks:
${taskLines}
- Recent history: ${hist}

${buildInstruction(kind, task, nagLevel, awaySeconds, friend)}`;

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 150,
        temperature: 1,
        system: SYSTEM,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('anthropic_error', upstream.status, detail.slice(0, 300));
      res.status(502).json({ error: 'upstream', status: upstream.status });
      return;
    }

    const data = await upstream.json();
    const text = Array.isArray(data.content)
      ? data.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
      : '';

    if (!text) {
      res.status(502).json({ error: 'empty' });
      return;
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error('nag_failed', err && err.message);
    res.status(500).json({ error: 'failed' });
  }
};
