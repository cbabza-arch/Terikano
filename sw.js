// TERIKANO - NO CACHE - ALWAYS FRESH - V5
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  // NEVER cache HTML - Always go to Network!
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
