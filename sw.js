// V40 - SW FIX - Delete ALL old cache, never cache old V28 again
var CACHE = 'terikano-v40-fresh';

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k !== CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.url.indexOf('.html')!==-1 || e.request.url.indexOf('.js')!==-1){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request).catch(function(){ return caches.match(e.request); }));
});
