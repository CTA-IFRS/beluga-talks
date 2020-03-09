// Criando um nome para o arquivo de cache
const staticCache = "prancha_alfanumerica_2020_03_09_10_39"; //ano_mes_dia_hora_min

//Install
// Lista de arquivos que devem ser cacheados
const files = [
    '/',
    '/LICENSE',
    '/estilo.css',
    '/manifest.json',
    '/imagens/icon10.png',
  ];

// Faz cache dos arquivos ao instalar 
this.addEventListener("install", event => {
    this.skipWaiting();
  
    event.waitUntil(
      caches.open(staticCache)
        .then(cache => {
          return cache.addAll(files);
      })
    )
});

//Activate
// Limpa o cache antigo 
this.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => (cacheName.startsWith('prancha_alfanumerica_')))
            .filter(cacheName => (cacheName !== staticCache))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
  });

 //Fetch
 // Reponde o request direto do cache
this.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Retorna o cache
          if (response) {
            return response;
          }
          // Faz a requisição  
          return fetch(event.request);
        })
        .catch(() => {
          // Mostra uma página de offline
          return caches.match('/index.html');
        })
    )
  }); 