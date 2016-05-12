var staticCacheName = 'PTApp-v12';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'build/main.js',
        'css/styles.css',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('PTApp-') &&
                  cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  var requestUrl = new URL(event.request.url);
  if(requestUrl.origin === location.origin) {
    if(requestUrl.pathname === '/') {
      event.respondWith(caches.match('./skeleton'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) return response;

      return fetch(event.request);
    })
  );
});











