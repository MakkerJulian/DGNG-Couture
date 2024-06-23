// service-worker.js

// Cache name
const CACHE_NAME = 'vite-react-cache';

// Files to cache
const urlsToCache = [
    '/',
    '/home',
    '/country',
    '/city'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Check if response is valid
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Cache the response
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                // Only if network request fails, use cachd instead
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        // return offlinepage.html
                    });
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((name) => {
                        return name !== CACHE_NAME;
                    }).map((name) => {
                        return caches.delete(name);
                    })
                );
            })
    );
});