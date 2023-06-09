/**
 * service-worker.js
 *
 * Note: It is important to note that while this event is happening, any 
 * previous version of your service worker is still running and serving pages, 
 * so the things you do here must not disrupt that. For instance, this is not 
 * a good place to delete old caches, because the previous service worker may 
 * still be using them at this point.
 *
 * @link https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

'use strict';

/** @const filesToCache Array A list of files to store in cache */
const filesToCache = [
    'css/footer.css',
    'css/navbar.css',
    'footer.html',
    'navbar.html',
];


/** @const staticCacheName String The name of the version. Update it to get the new files */
const staticCacheName = 'pages-cache-v2';


// When the service worker is installed...
self.addEventListener ('install', event => {
    // Attemps to cache the static assets
    event.waitUntil (
        caches.open (staticCacheName)
        .then (cache => {
            return cache.addAll (filesToCache);
        })
    );
});



/**
 * Cache falling back to the network
 * 
 * If you're making your app offline-first, this is how you'll handle 
 * the majority of requests. 
 *
 * This gives you the "Cache only" behavior for things in the cache and 
 * the "Network only" behaviour for anything not cached 
 * (which includes all non-GET requests, as they cannot be cached).
 */

self.addEventListener ('fetch', function (event) {
    event.respondWith (
        caches.match (event.request).then (function (response) {
            console.log (event.request.url + " " + (response ? "in cache" : "not in cache"));
            return response || fetch (event.request);
        })
    );
});

