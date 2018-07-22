self.addEventListener('activate', function(event) {
  event.waitUntil(
    event.waitUntil(self.clients.claim())
  );
});

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('mws-restaurant-v1').then(function(cache) {
            return cache.addAll([
                '/',
                './index.html',
                './restaurant.html',
                'css/styles.css',
                'js/main.js',
                'js/restaurant_info.js',
                'js/dbhelper.js',
                './img/',
                'data/restaurants.json'
            ]);
        })
    );
});


//  self.addEventListener('activate', event => {
//      event.waitUntil(self.clients.claim());
//    });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});