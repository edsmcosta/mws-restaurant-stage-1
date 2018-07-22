self.addEventListener('activate', function(event) {
  event.waitUntil(
    // TODO: remove the old cache
    event.waitUntil(self.clients.claim())
  );
});

self.addEventListener('install', function(event) {
    event.waitUntil(
      // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
      // Ensure at least $primary-color changes
      // TODO: change cache name to 'wittr-static-v2'
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