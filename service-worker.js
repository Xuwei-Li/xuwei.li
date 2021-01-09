// Progressive Web Application Service Worker

const VERSION = 'v2.3';

var artifacts = [
    '/',
    '/background.html',
    '/favicon.ico',
    '/manifest.json',
    '/css/background.css?v=1',
    '/css/main.css?v=13',
    '/images/avatar.jpg',
    '/js/scripts.js?v=4',
];

// Clear cache promise
async function clearCache() {
    caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.filter(cacheName => {
                // Return true if you want to remove this cache,
                // but remember that caches are shared across
                // the whole origin
                return cacheName !== VERSION;
            }).map(cacheName => {
                return caches.delete(cacheName);
            })
        );
    })
};

// 'install' event
self.addEventListener('install', event => {
    // #DEBUG
    console.log('Installing Service Worker ' + VERSION);
    event.waitUntil(
        caches.open(VERSION).then(cache => {
            return cache.addAll(artifacts);
        })
    );
    event.waitUntil(clearCache());
});

// 'activate' event
// 1. Clear old caches
self.addEventListener('activate', event => {
    // #DEBUG
    console.log('Activating Service Worker ' + VERSION);
    event.waitUntil(clearCache());
});

// 'fetch' event
self.addEventListener('fetch', event => {
    //
    event.respondWith(caches.match(event.request).then(response => {
        // Cache hit - return response
        if (response) {
            return response;
        }
        // Fetch through network
        return fetch(event.request).then(response => {
            // #DEBUG
            // console.log(event.request);
            // console.log(response);

            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(VERSION).then(cache => {
                cache.put(event.request, responseToCache);
            });

            return response;
        });
    }));
});
