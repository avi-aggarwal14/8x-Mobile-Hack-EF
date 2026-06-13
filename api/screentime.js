/*
 * /api/screentime — reads a REAL Screen Time screenshot.
 *
 * A website can't read iOS/Android Screen Time directly (native-only). So the
 * user screenshots their Settings → Screen Time, and we use Claude vision to
 * extract the real per-app minutes + total into structured JSON the dashboard
 * renders. Honest "real data" path. Key stays server-side (Vercel env).
 *
 * Zero dependencies — direct REST call, same pattern as /api/nag and /api/judge.
 */

const MODEL = 'claude-haiku-4-5';

const SYSTEM = `You read screenshots of phone "Screen Time" / "Digital Wellbeing" / app-usage screens (iOS or Android) and extract the usage data as STRICT JSON.

Return ONLY a JSON object, no prose, no markdown fences, exactly this shape:
{"total_minutes": <integer total screen time for the period, or null if not shown>,
 "pickups": <integer pickups/unlocks if shown, else null>,
 "apps": [{"name": "<app name>", "minutes": <integer minutes>}, ...]}

Rules:
- Convert all times to whole MINUTES (e.g. "1h 23m" -> 83, "47m" -> 47, "2h" -> 120).
- Include every app you can read, most-used first. Skip category headers that aren't apps.
- If you genuinely cannot find any usage data in the image, return {"total_minutes": null, "pickups": null, "apps": []}.
- Never invent numbers that aren't visible. Output JSON only.`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { res.status(503).json({ error: 'no_key' }); return; }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const image = (body.image || '').toString();
  const m = image.match(/^data:(image\/(?:png|jpeg|jpg|webp|gif));base64,(.+)$/);
  if (!m) { res.status(400).json({ error: 'bad_input' }); return; }
  const mediaType = m[1] === 'image/jpg' ? 'image/jpeg' : m[1];
  const data = m[2];

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 700,
        temperature: 0,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
            { type: 'text', text: 'Extract the screen-time usage from this screenshot as JSON.' }
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
    let raw = Array.isArray(dataj.content)
      ? dataj.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
      : '';
    // strip accidental code fences
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

    let parsed;
    try { parsed = JSON.parse(raw); } catch (e) {
      const m2 = raw.match(/\{[\s\S]*\}/);
      if (m2) { try { parsed = JSON.parse(m2[0]); } catch (e2) {} }
    }
    if (!parsed || !Array.isArray(parsed.apps)) { res.status(502).json({ error: 'parse', raw: raw.slice(0, 200) }); return; }

    // sanitize
    const apps = parsed.apps
      .filter(a => a && a.name)
      .map(a => ({ name: String(a.name).slice(0, 40), minutes: Math.max(0, parseInt(a.minutes, 10) || 0) }))
      .filter(a => a.minutes > 0)
      .slice(0, 12);
    const total_minutes = Number.isFinite(parsed.total_minutes)
      ? Math.max(0, parseInt(parsed.total_minutes, 10))
      : apps.reduce((s, a) => s + a.minutes, 0);
    const pickups = Number.isFinite(parsed.pickups) ? Math.max(0, parseInt(parsed.pickups, 10)) : null;

    res.status(200).json({ total_minutes, pickups, apps });
  } catch (err) {
    console.error('screentime_failed', err && err.message);
    res.status(500).json({ error: 'failed' });
  }
};
