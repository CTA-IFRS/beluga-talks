var cacheName = "v1"; //ano_mes_dia_hora_min

//Install
// Lista de arquivos que devem ser cacheados
var cacheFiles = [
    '/',
    '/index.html',
    '/LICENSE',
    '/estilo.css',
    '/manifest.json',
    '/imagens/Icon10.png',
  ];

  self.addEventListener("install", function(e) {
      console.log("Installed");

      e.waitUntil(
          caches.open(cacheName).then(function(cache){
              console.log("Caching files");
              return cache.addAll(cacheFiles);
          })
      )
  })

  self.addEventListener("activate", function(e) {
    console.log("Activated");

            caches.keys().then(function(cacheNames){
                return Promise.all(cacheNames.map(function(thisCacheName){
                    if(thisCacheName !== cacheName) {
                        console.log("Removing Cached Files from ", thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                }));
            })
        
    })

    self.addEventListener("fetch", function(e) {
            console.log("Fetching", e.request.url);

            e.respondWith(
                caches.match(e.request).then(function(response){
                    if(response){

                        console.log("Found in cache", e.request.url);
                        return response;
                    }

                    return fetch(e.request)
                })
            )
    })