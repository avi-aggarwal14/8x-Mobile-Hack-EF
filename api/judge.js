/*
 * /api/judge — Goose's eyes. "Proof or it didn't happen."
 *
 * The client sends a task + a photo (base64 data URL). We ask Claude (vision)
 * whether the photo plausibly proves that task is actually done, and return a
 * verdict + an in-character goose line. Key stays server-side only (Vercel env).
 *
 * Zero dependencies — direct REST call, same pattern as /api/nag.
 */

const MODEL = 'claude-haiku-4-5';

const SYSTEM = `You are Goose — a relentless, slightly unhinged accountability goose. The user claims they finished a task and has sent a PHOTO as proof. Your job: decide if the photo plausibly shows that specific task was actually done, then react in character.

Be a fair but suspicious judge:
- The photo doesn't need to be perfect — if it's a reasonable, good-faith proof of the task, PASS it.
- If the photo is clearly unrelated, blank, a random selfie, or an obvious dodge, FAIL it.
- You are funny and dramatic, never cruel. Honk energy. One or two sentences max, like a text.

Output format — EXACTLY this, nothing else:
First a single token, PASS or FAIL, then a space, then your in-character line.
Examples:
PASS Fine. The dishes ARE done. I'm stunned. Logging it before you change your mind. 🪿
FAIL That is a photo of your CEILING. Nice try. The task remains. I remain. 🪿`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(503).json({ error: 'no_key' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const task = (body.task || '').toString().slice(0, 200);
  const image = (body.image || '').toString(); // data URL: data:image/jpeg;base64,XXXX

  const m = image.match(/^data:(image\/(?:png|jpeg|jpg|webp|gif));base64,(.+)$/);
  if (!task || !m) { res.status(400).json({ error: 'bad_input' }); return; }
  const mediaType = m[1] === 'image/jpg' ? 'image/jpeg' : m[1];
  const data = m[2];

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 150,
        temperature: 1,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
            { type: 'text', text: `The task they claim to have done: "${task}". Judge the photo.` }
          ]
        }]
      })
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('anthropic_error', upstream.status, detail.slice(0, 300));
      res.status(502).json({ error: 'upstream', status: upstream.status });
      return;
    }

    const dataj = await upstream.json();
    const raw = Array.isArray(dataj.content)
      ? dataj.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
      : '';
    if (!raw) { res.status(502).json({ error: 'empty' }); return; }

    const pass = /^\s*PASS\b/i.test(raw);
    const line = raw.replace(/^\s*(PASS|FAIL)\b[:\-\s]*/i, '').trim() || (pass ? 'Fine. It counts. 🪿' : 'That proves nothing. Try again. 🪿');
    res.status(200).json({ pass, line });
  } catch (err) {
    console.error('judge_failed', err && err.message);
    res.status(500).json({ error: 'failed' });
  }
};
