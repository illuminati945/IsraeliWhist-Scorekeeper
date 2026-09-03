/**
 * Israeli Whist Scorekeeper - Service Worker (Instant Load & Offline Engine)
 */
const CACHE_NAME = 'israeli-whist-v8';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/styles.min.css?v=8',
  './css/styles.css?v=8',
  './js/app.bundle.js?v=8',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache partial error:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Do not intercept WebSocket or REST API requests
  if (url.pathname.includes('/api/') || url.pathname.includes('/ws') || url.protocol === 'ws:' || url.protocol === 'wss:') {
    return;
  }

  // Stale-While-Revalidate strategy for static assets and app shell
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // If offline and request is navigation, fallback to index.html
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return null;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
