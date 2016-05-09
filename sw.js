var staticCacheName = 'PTApp-v4';

self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    'scripts/main.js',
    'css/styles.css',
  ];
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'scripts/main.js',
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

  /*if(event.request.url.endsWith('/stations')) {
    event.respondWith(
      fetch(event.request).then(function(response) {
      	if(response.status == 404) {
      		return new Response(console.log('glawie'));
      	}
      	return response;
      }).catch(function() {
      	return new Response('Uh oh that totally failed!');
      })
    ); 	
  }*/

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) return response;

      return fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if(event.data.action == 'skipWaiting') {
    self.skipWaiting();
  }
});










