/* ==========================================
   MCQ App Pro 2.0 — Service Worker (PWA)
   ========================================== */

const CACHE_NAME = "mcq-app-pro-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

/* Install Event — Cache all app files */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app shell files...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* Activate Event — Clean old caches */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

/* Fetch Event — Serve from cache first */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve from cache OR fetch from network
      return response || fetch(event.request);
    })
  );
});
