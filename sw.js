// sw.js
const CACHE_NAME = 'verse-vault-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    '/script.js',
    '/script.js',
    '/script.js',
    '/script.js',
    '/script.js',
    // Add more assets you want to cache
];

// Install the service worker and cache the assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch cached assets
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
