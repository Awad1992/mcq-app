// Simple service worker for offline cache (Ultra Pro v4.1)
const CACHE_NAME = 'mcq-ultrapro-v4.1';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=4.1.0',
  './app.js?v=4.1.0'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
