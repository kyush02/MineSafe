const CACHE_NAME = 'minesafe-v1';
// List all the files your app needs to work offline
const urlsToCache = [
  'index.html',
  'FullLogo.jpg',
  'icon-192.png',
  'icon-512.png'
];

// 1. Installation: Open a cache and save the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch: Intercept network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is found in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});