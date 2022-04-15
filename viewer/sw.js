var cacheName = 'mvp-pwa';
var databaseName = 'mvp-game-data'
var filesToCache = [
  '.',
  './index.html',
  './favicon.ico',
  './manifest.json',
  './images/icons/favicon-96x96.png',
  './css/style.css',
  './offline.html',
  './images/offline.png',
  '../node-server/games',
  '../node-server/pitches'
];
console.log("now we tesst");
// Start the service worker and cache all of the app's content
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback
      return caches.open(cacheName).then((cache) => {
        return cache.match('./offline.html');
      });
    })
  );
});

// Remove previous cached data from disk
self.addEventListener('activate', function(event) {
  event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
});
