
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mcq-ultra-v43').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './style.css?v=4.3.0',
        './app.js?v=4.3.0',
        './manifest.json?v=4.3.0'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
