importScripts('https://cdn.jsdelivr.net/npm/workbox-lib@6.1.5/workbox/workbox-sw.min.js')
// workbox.setConfig({debug: true})
workbox.precaching.precache([])
workbox.routing.registerRoute(
    new RegExp('.*.html'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'html-main',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 604800,
            }),
        ],
    }),
)
workbox.routing.registerRoute(
    new RegExp('.*.(js|css|vue|es6)'),
    new workbox.strategies.CacheFirst({
        cacheName: 'icepro-resource',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 86400,
            }),
        ],
    }),
)

