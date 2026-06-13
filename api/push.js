/*
 * /api/push — sends a Web Push so Goose can ping your phone WHILE you're off
 * in another app. The client (app/index.html) hands over its OWN PushSubscription
 * on the way out, so there's no database to maintain for the "I just left" case.
 *
 * Env vars (Vercel → project goose-8x → Settings → Environment Variables):
 *   VAPID_PUBLIC_KEY   — the public VAPID key (also hardcoded in the client; it's public by design)
 *   VAPID_PRIVATE_KEY  — SECRET. Never commit.
 *   VAPID_SUBJECT      — optional mailto:/https: contact (default below)
 *
 * Regenerate a keypair any time with:  npx web-push generate-vapid-keys
 */
const webpush = require('web-push');

const GRACE_MS = 5000; // brief delay so a quick glance away doesn't always ping; the push lands while you're still gone

const LINES = [
  '{n}where do you think you’re going? "{t}" isn’t done. 🪿',
  'I SAW that. Back to "{t}". Now.',
  'Wandering off mid-task? "{t}" is still sitting right here. HONK.',
  '{n}the work is THIS way. "{t}". Get back here.',
  'You left. I noticed. "{t}" did not finish itself. 🪿',
  '{n}nice try. "{t}" and I are both still waiting. 🪿'
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method_not_allowed' }); return; }

  const pub = process.env.VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || 'mailto:avi.aggarwal2011@gmail.com';
  if (!pub || !priv) { res.status(503).json({ error: 'no_vapid' }); return; } // not configured → client just relies on the in-app roast

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const sub = body.subscription;
  if (!sub || !sub.endpoint) { res.status(400).json({ error: 'no_subscription' }); return; }

  const name = (body.name || '').toString().slice(0, 60);
  const task = (body.task || '').toString().slice(0, 200) || 'that task';

  const line = LINES[Math.floor(Math.random() * LINES.length)]
    .replace('{t}', task)
    .replace('{n}', name ? name + ', ' : '');

  const payload = JSON.stringify({ title: '🪿 Goose', body: line, url: '/app' });

  try {
    webpush.setVapidDetails(subject, pub, priv);
  } catch (e) {
    console.error('vapid_setup_failed', e && e.message);
    res.status(500).json({ error: 'vapid_setup' });
    return;
  }

  // brief grace, then fire while they're still away in the other app
  await new Promise(r => setTimeout(r, GRACE_MS));

  try {
    await webpush.sendNotification(sub, payload);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('push_send_failed', err && err.statusCode, err && err.message);
    res.status(502).json({ error: 'send_failed', status: err && err.statusCode });
  }
};
