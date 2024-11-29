const CACHE_NAME = "pdf-watermarker-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pdf-lib.min.js",
  "/pdf.min.js",
  "/pdf.worker.js",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/index.js",
  "/style.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response so we can update the cache while still returning it
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // If fetch fails (e.g., offline), try to serve from cache
        return caches.match(event.request);
      })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});