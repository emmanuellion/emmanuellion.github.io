const cacheName = 'my-pwa-cache';
const filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/katana.png',
    // Ajoutez ici les autres ressources statiques de votre application
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filesToCache))
            // eslint-disable-next-line no-restricted-globals
            .then(() => self.skipWaiting())
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keyList => Promise.all(
                keyList.map(key => {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            ))
            // eslint-disable-next-line no-restricted-globals
            .then(() => self.clients.claim())
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
