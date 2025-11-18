self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mcq-ultra-pro-v4.2').then(cache => cache.addAll([
      './',
      './index.html',
      './style.css?v=4.2.0',
      './app.js?v=4.2.0'
    ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
