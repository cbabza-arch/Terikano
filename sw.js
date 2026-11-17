// TERIKANO V28.2 - INSTALL APP + OFFLINE
const CACHE_NAME = 'terikano-v28.2';
const urlsToCache = ['./','./index.html','./manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});
