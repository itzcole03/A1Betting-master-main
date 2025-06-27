/// <reference lib="webworker" />


const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/static/js/main.bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/favicon.ico'
];
const API_ROUTES = [
    'api.prizepicks.com/projections',
    'api.prizepicks.com/games'
];
self.addEventListener('install', (event) => {
    event.waitUntil(Promise.all([
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)),
        caches.open(API_CACHE_NAME)
    ]));
});
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames;
            .filter(name => name !== CACHE_NAME && name !== API_CACHE_NAME)
            .map(name => caches.delete(name)));
    }));
});
self.addEventListener('fetch', (event) => {

    // Handle API requests;
    if (API_ROUTES.some(route => url.href.includes(route))) {
        event.respondWith(handleApiRequest(event.request));
        return;
    }
    // Handle static assets;
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
            // Cache new static assets;
            if (response.status === 200) {

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
            }
            return response;
        });
    }));
});
async function handleApiRequest(request) {
    try {
        // Try network first;

        if (response.status === 200) {


            await cache.put(request, responseClone);
            return response;
        }
        throw new Error('Network response was not ok');
    }
    catch (error) {
        // Fall back to cache;

        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}
// Handle background sync for failed requests;
self.addEventListener('sync', ((event) => {

    if (syncEvent.tag === 'sync-projections') {
        syncEvent.waitUntil(syncProjections());
    }
}));
async function syncProjections() {

    await Promise.all(failedRequests.map(async (request) => {
        try {
            await fetch(request);
            await removeFailedRequest(request);
        }
        catch (error) {
            // console statement removed
        }
    }));
}
// IndexedDB utilities for failed requests;


// NOTE: If you store requests as POJOs, update this type to Promise<StoredRequest[]> and rehydrate as needed.
async function getFailedRequests() {


    return store.getAll();
}
async function removeFailedRequest(request) {


    await store.delete(request.url);
}
function openDB() {
    return new Promise((resolve, reject) => {

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            // Type guard: event.target may be null, and must be an IDBOpenDBRequest to access .result;

            if (target && 'result' in target) {

                db.createObjectStore(storeName, { keyPath: 'url' });
            }
        };
    });
}
