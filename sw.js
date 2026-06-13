self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {});

// Goose pings you while you're off in another app (payload from /api/push)
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  const title = d.title || '🪿 Goose';
  const body = d.body || 'Get back to work. 🪿';
  e.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: 'goose-offtask',
    renotify: true,
    data: { url: d.url || '/app' }
  }));
});

// Tapping the notification brings Goose back to the front
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/app';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if (c.url.indexOf(url) !== -1 && 'focus' in c) return c.focus(); }
    for (const c of list) { if ('focus' in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  }));
});
