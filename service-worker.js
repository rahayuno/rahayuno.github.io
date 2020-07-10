importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/detail.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/pages/standing.html', revision: '1' },
    { url: '/pages/archive.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/script-index.js', revision: '1' },
    { url: '/js/script-detail.js', revision: '1' },
    { url: '/img/bgsatu.jpg', revision: '1' },
    { url: '/img/bgdua.jpg', revision: '1' },
    { url: '/img/bgtiga.jpg', revision: '1' },
    { url: '/img/icon512.png', revision: '1' },
    { url: '/img/icon192.png', revision: '1' },
    { url: '/img/custom_icon.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('detail.html'),
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
        plugins:[
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 30*24*60*60, //satu bulan 
          })
        ]
    })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});