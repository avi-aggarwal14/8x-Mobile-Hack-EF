/* =====================================================================
   Goose · Screen Time  —  screentime.js
   ---------------------------------------------------------------------
   ⚠️  MOCK DATA — THIS IS THE VISION, NOT REAL OS DATA.
   Real Screen Time / app-usage is native-only and CANNOT be read from a
   website or PWA. Every number below is *simulated* by a small random
   model (rollUsage). We never touch the real OS. The on-screen "demo
   data" tag keeps this honest. Re-rolling = a fresh fake day + roast.
   ===================================================================== */

const $ = id => document.getElementById(id);
const pick = a => a[Math.floor(Math.random() * a.length)];
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

/* ---- The app catalogue the mock model draws from --------------------
   Each entry has a brand colour + emoji glyph so the list reads like a
   real Screen Time screen. `weight` skews how much time it tends to eat
   (the usual time-sinks score higher), and `band` groups apps so the
   roast can suggest a sensible "do this instead". */
const CATALOG = [
  { name: 'Instagram', glyph: '📸', color: '#C13584', weight: 5, band: 'social' },
  { name: 'TikTok',    glyph: '🎵', color: '#000000', weight: 5, band: 'video'  },
  { name: 'X',         glyph: '𝕏',  color: '#1d1d1f', weight: 4, band: 'social' },
  { name: 'YouTube',   glyph: '▶',  color: '#FF0000', weight: 4, band: 'video'  },
  { name: 'Reddit',    glyph: '👽', color: '#FF4500', weight: 3, band: 'social' },
  { name: 'Snapchat',  glyph: '👻', color: '#FFFC00', weight: 3, band: 'social' },
  { name: 'WhatsApp',  glyph: '💬', color: '#25D366', weight: 2, band: 'chat'   },
  { name: 'Netflix',   glyph: '🍿', color: '#E50914', weight: 2, band: 'video'  },
  { name: 'Safari',    glyph: '🧭', color: '#1B82F0', weight: 2, band: 'web'    },
  { name: 'Spotify',   glyph: '🎧', color: '#1DB954', weight: 1, band: 'audio'  },
];

/* What Goose tells you to do *instead*, per offender band. {t} = your task */
const INSTEAD = {
  social: ['put the phone face-down and do <b>{t}</b>', 'go outside and look at a real bird (me)', 'do <b>{t}</b> — it has more plot than your feed'],
  video:  ['watch <b>{t}</b> get done instead', 'one episode of <b>{t}</b>. Season finale: you, productive', 'close the app and start <b>{t}</b>'],
  chat:   ['reply to <b>{t}</b> instead of the group chat', 'message your to-do list. Do <b>{t}</b>'],
  web:    ['google nothing. Do <b>{t}</b>', 'open <b>{t}</b>, not 14 tabs'],
  audio:  ['put on a playlist and knock out <b>{t}</b>', 'study-with-me energy: do <b>{t}</b>'],
  any:    ['lock in on <b>{t}</b>', 'do <b>{t}</b>. Right now. I\'m watching. 🪿'],
};

/* ---- Goose roast lines, escalating by total minutes ----------------
   Voice matches the NAG object in app/index.html: funny, passive-
   aggressive, never cruel, honk, 🪿. {app} = worst offender,
   {time} = time on it, {total} = total today. */
const ROAST = {
  // < 2h — light tease
  low: {
    verdict: 'Not bad… for you',
    lines: [
      'Only {total} today? Suspicious. Who are you and what did you do with my disappointment? 🪿',
      '{total} on the phone. Restrained. {app} still got {time} though — I see you.',
      'A respectable {total}. {app} is the weak link at {time}, but I\'ll allow it.',
    ],
  },
  // 2h–4h — proper roast
  mid: {
    verdict: 'We need to talk',
    lines: [
      '{total} on the phone and {time} of it was {app}? {app} doesn\'t even like you back.',
      '{time} on {app}. You could\'ve learned a language. Or fed a goose. (Me.)',
      '{total} today. {app} alone ate {time}. That\'s not a habit, that\'s a relationship. HONK.',
    ],
  },
  // 4h–6h — savage
  high: {
    verdict: 'Embarrassing for both of us',
    lines: [
      '{total}. {total}. {app} got {time} of your one wild life. I\'m embarrassed, and I\'m a goose.',
      '{time} on {app}?? I unlocked your potential and you unlocked {app} forty times.',
      '{total} of screen time. {app} is at {time}. Your thumbs have a higher streak than your goals.',
    ],
  },
  // 6h+ — unhinged (still never cruel)
  extreme: {
    verdict: 'I\'ve called the other geese',
    lines: [
      '{total}. {time} of it on {app}. I told the flock. They\'re circling your house. 🪿🪿🪿',
      '{total} on a glowing rectangle. {app} alone got {time}. I will follow you into your dreams. Lovingly.',
      '{total}?! {app} has logged {time} and I have logged your shame. Forever. We honk in mourning.',
    ],
  },
};

/* ---- Read the user's tasks (if they used the main Goose app) --------
   app/index.html now stashes its tasks under 'goose-tasks' so this page
   can roast you about your *actual* to-dos. Falls back to generic. */
function loadTasks() {
  try {
    const raw = localStorage.getItem('goose-tasks');
    if (raw) {
      const arr = JSON.parse(raw).map(t => (typeof t === 'string' ? t : t.text)).filter(Boolean);
      if (arr.length) return arr;
    }
  } catch (e) {}
  return ['the thing you keep avoiding', 'your actual to-do list', 'literally anything productive'];
}
function loadName() {
  try { return (localStorage.getItem('goose-name') || '').trim(); } catch (e) { return ''; }
}

/* ---- THE MOCK MODEL: roll a fresh fake day -------------------------- */
function rollUsage() {
  // 5–7 apps make the cut today, weighted toward the time-sinks
  const n = rint(5, 7);
  const pool = [...CATALOG];
  const chosen = [];
  while (chosen.length < n && pool.length) {
    // weighted draw
    const totalW = pool.reduce((s, a) => s + a.weight, 0);
    let r = Math.random() * totalW;
    let idx = 0;
    for (let i = 0; i < pool.length; i++) { r -= pool[i].weight; if (r <= 0) { idx = i; break; } }
    chosen.push(pool.splice(idx, 1)[0]);
  }
  // assign minutes: top offenders get big chunks, tail gets scraps
  const apps = chosen.map((a, i) => {
    const base = i === 0 ? rint(55, 145) : i === 1 ? rint(35, 95) : rint(6, 55);
    return { ...a, mins: base };
  });
  apps.sort((x, y) => y.mins - x.mins);
  const totalMins = apps.reduce((s, a) => s + a.mins, 0);
  const pickups = rint(48, 162);
  return { apps, totalMins, pickups };
}

/* ---- Formatting helpers --------------------------------------------- */
function fmt(m) {
  const h = Math.floor(m / 60), mm = m % 60;
  return h ? `${h}h ${mm}m` : `${mm}m`;
}

/* ---- Build the roast for a rolled day ------------------------------- */
function buildRoast(day, tasks) {
  const worst = day.apps[0];
  const total = day.totalMins;
  const tier = total < 120 ? 'low' : total < 240 ? 'mid' : total < 360 ? 'high' : 'extreme';
  const set = ROAST[tier];
  const line = pick(set.lines)
    .replace(/{app}/g, worst.name)
    .replace(/{time}/g, fmt(worst.mins))
    .replace(/{total}/g, fmt(total));
  const task = pick(tasks);
  const instead = pick(INSTEAD[worst.band] || INSTEAD.any).replace(/{t}/g, task);
  return { verdict: set.verdict, line, instead, tier };
}

/* ---- Render --------------------------------------------------------- */
const RING_CIRC = 2 * Math.PI * 80; // r=80
let _state = null;

function render(day) {
  _state = day;
  const name = loadName();
  $('who').textContent = name ? `${name}'s screen time, judged by a goose` : "Today's screen time, judged by a goose";

  // ring: fill proportion of an "8h heavy day" cap, min visible slice
  $('ringTotal').textContent = fmt(day.totalMins);
  const frac = Math.max(0.08, Math.min(1, day.totalMins / 480));
  const offset = RING_CIRC * (1 - frac);
  const ring = $('ringFill');
  // colour the ring by severity
  const tierColor = day.totalMins < 120 ? 'var(--green)' : day.totalMins < 240 ? 'var(--amber)' : 'var(--coral)';
  ring.setAttribute('stroke', tierColor);
  ring.style.transition = 'none';
  ring.style.strokeDashoffset = RING_CIRC;
  // animate on next frame
  requestAnimationFrame(() => requestAnimationFrame(() => {
    ring.style.transition = 'stroke-dashoffset .9s cubic-bezier(.2,.7,.2,1)';
    ring.style.strokeDashoffset = offset;
  }));

  $('pickups').textContent = day.pickups != null ? `${day.pickups} pickups` : (day.real ? 'from your screenshot' : '');

  // app list
  const maxMins = day.apps[0].mins;
  const wrap = $('apps');
  wrap.innerHTML = '';
  day.apps.forEach((a, i) => {
    const card = document.createElement('div');
    card.className = 'appcard' + (i === 0 ? ' worst' : '');
    card.innerHTML =
      '<div class="approw">' +
        '<div class="appicon"></div>' +
        '<div class="appname"><span class="nm"></span>' + (i === 0 ? '<span class="worsttag">worst offender</span>' : '') + '</div>' +
        '<div class="apptime"></div>' +
      '</div>' +
      '<div class="bartrack"><div class="barfill"></div></div>';
    const icon = card.querySelector('.appicon');
    icon.textContent = a.glyph;
    icon.style.background = a.color;
    // X / TikTok dark glyphs need a touch of contrast in dark mode handled by white text already
    card.querySelector('.nm').textContent = a.name;
    card.querySelector('.apptime').textContent = fmt(a.mins);
    const fill = card.querySelector('.barfill');
    fill.style.background = i === 0 ? 'var(--coral)' : 'var(--amber)';
    wrap.appendChild(card);
    const pct = Math.round((a.mins / maxMins) * 100);
    requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = pct + '%'; }));
  });

  // roast
  const tasks = loadTasks();
  const r = buildRoast(day, tasks);
  $('verdict').textContent = r.verdict;
  $('roastLine').textContent = r.line;
  $('insteadLine').innerHTML = '🦢 <b>Instead:</b> ' + r.instead;

  // re-trigger the pop animation
  const roastEl = $('roast');
  roastEl.classList.remove('pop'); void roastEl.offsetWidth; roastEl.classList.add('pop');
}

/* ---- REAL data: read the user's Screen Time screenshot via vision ----
   A PWA can't read the OS directly, so the user screenshots Settings →
   Screen Time; /api/screentime (Claude vision) extracts the real per-app
   minutes. We map those onto the same render shape (matching known apps to
   the CATALOG for colour/glyph; unknown apps get a neutral default). */
function catalogMatch(name) {
  const n = (name || '').toLowerCase();
  return CATALOG.find(c => n.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(n));
}
function mapRealDay(data) {
  const apps = (data.apps || [])
    .map(a => {
      const c = catalogMatch(a.name) || { glyph: '📱', color: '#7A786F', band: 'any' };
      return { name: a.name, glyph: c.glyph, color: c.color, band: c.band, mins: a.minutes };
    })
    .filter(a => a.mins > 0)
    .sort((x, y) => y.mins - x.mins);
  const totalMins = data.total_minutes || apps.reduce((s, a) => s + a.mins, 0);
  return { apps, totalMins, pickups: (data.pickups != null ? data.pickups : null), real: true };
}
function setStatus(msg) { const e = $('importStatus'); if (e) e.textContent = msg || ''; }
function markReal() {
  const tag = document.querySelector('.demo-tag');
  if (tag) { tag.textContent = '🪿 your real data'; tag.title = 'Read from your Screen Time screenshot'; }
  const foot = $('foot');
  if (foot) foot.innerHTML = 'Read live from your Screen Time screenshot by Goose’s eyes (Claude vision). 🪿';
}
async function importScreenshot(dataUrl) {
  setStatus('👀 Goose is reading your screenshot…');
  try {
    const r = await fetch('/api/screentime', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl })
    });
    if (r.status === 503) { setStatus('Goose’s eyes aren’t set up (no API key). Showing demo data.'); return; }
    if (!r.ok) { setStatus('Couldn’t read that one. Try a clearer Screen Time screenshot.'); return; }
    const data = await r.json();
    if (!data.apps || !data.apps.length) { setStatus('No usage found. Screenshot Settings → Screen Time and try again.'); return; }
    render(mapRealDay(data));
    markReal();
    setStatus('Got it — that’s YOUR real screen time. No hiding now. 🪿');
  } catch (e) { setStatus('Something went wrong reading it. Showing demo data.'); }
}

/* ---- Wire up -------------------------------------------------------- */
$('importBtn').onclick = () => { const i = $('stInput'); i.value = ''; i.click(); };
$('stInput').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = () => importScreenshot(reader.result);
  reader.readAsDataURL(f);
});
$('reroll').onclick = () => render(rollUsage());
render(rollUsage());

/* ---- Theme toggle (same behaviour as app/index.html) ---------------- */
(function () {
  const tt = $('themeToggle');
  const cur = () => document.documentElement.getAttribute('data-theme');
  const setIcon = () => { if (tt) tt.textContent = cur() === 'dark' ? '☀️' : '🌙'; };
  setIcon();
  if (tt) tt.addEventListener('click', () => {
    const n = cur() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('goose-theme', n); } catch (e) {}
    setIcon();
  });
})();
