// Simple cache-first service worker with versioned cache
const CACHE_NAME = 'mcq-app-cache-v3.4.0';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=3.4.0',
  './app.js?v=3.4.0',
  './manifest.json?v=3.4.0'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req);
    })
  );
});
