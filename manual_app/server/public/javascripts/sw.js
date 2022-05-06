CACHE_NAME = "v1"

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/images/very_large_image.jpg",
      "/index.html",
      "/"
    ])
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response){
        caches.open(CACHE_NAME).then(function (cache){
          cache.put(event.request, response.clone());
        });
        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
