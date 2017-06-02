self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.php',
        '/about.php',
        '/faq.html',
        '/manifest.json',
        '/background.jpeg',
        '/farmer_images',
        '/img/icon-192.png',
        '/logo.png',
        '/site.js',
        '/dragon.js',
        '/css/styles.css',
        '/css/bootstrap.min.css',
        '/font/css/font-awesome.css',
        '/js/jquery2.js',
        '/js/bootstrap.min.js',

      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
   if (event.request.url == 'https://farmbase.venturezhub.com/') {
    console.info('responding to farmbase fetch with Service Worker! 🤓');
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = {Gold: 1, Size: -1, Actions: []};
      return new Response(JSON.stringify(out));
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});