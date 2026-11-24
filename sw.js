self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open('terikano-v2').then(c => c.addAll(['./', './index.html', './manifest.json'])));
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      let copy = res.clone();
      caches.open('terikano-v2').then(c => c.put(e.request, copy));
      return res;
    }).catch(() => r))
  );
});
