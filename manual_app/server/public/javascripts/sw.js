CACHE_NAME = "v1"

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  self.skipWaiting()
  event.waitUntil(
    addResourcesToCache([
      "/images/very_large_image.jpg",
      "/index.html",
      "/"
    ])
  );
});
self.addEventListener('fetch', function(event) {
  if(event.request.method === "GET")
  {
    event.respondWith(
      fetch(event.request)
        .then(function(response){
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(function (cache){
            cache.put(event.request, cloned.clone());
          });
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      fetch(event.request)
    );
  }
});

self.addEventListener('push', function(e) {
  const {title, body} = JSON.parse(e.data.text());
  console.log(title, body);
  e.waitUntil(
    self.registration.showNotification(title, {body: body})
  );
});