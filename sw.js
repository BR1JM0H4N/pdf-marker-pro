const CACHE_NAME = "pdf-watermarker-cache-v1";
const urlsToCache = [
"/",
"/index.html",
"/manifest.json",
"/pdf-lib.min.js",
"/pdf.min.js",
"/pdf.worker.js",
"/android-chrome-192x192.png",
"/android-chrome-512x512.png"
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
caches.match(event.request).then((response) => {
return response || fetch(event.request);
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