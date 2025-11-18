self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mcq-ultra-v41').then(cache => cache.addAll([
      './',
      './index.html',
      './style.css',
      './app.js'
    ]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
