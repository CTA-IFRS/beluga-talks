// Criando um nome para o arquivo de cache
var staticCache = "prancha_alfanumerica_2020_12_16_16_06"; //ano_mes_dia_hora_min

console.log("Inicio do cache");

//Install
// Lista de arquivos que devem ser cacheados
var files = [
    '/Prancha-alfanumerica-CAA/prancha/index.html',
    '/Prancha-alfanumerica-CAA/prancha/index.js',
    '/Prancha-alfanumerica-CAA/prancha/estilo.css',
    '/Prancha-alfanumerica-CAA/prancha/manifest.json',
    '/Prancha-alfanumerica-CAA/prancha/imagens/Icon10.png'
  ];

// Faz cache dos arquivos ao instalar 
this.addEventListener("install", event => {
  //console.log("Install");
    this.skipWaiting();
  
    event.waitUntil(
      caches.open(staticCache)
        .then(cache => {
          console.log("Catching files");
          return cache.addAll(files)
          .then(() => self.skipWaiting());
      })
    )
});

//Activate
// Limpa o cache antigo 
this.addEventListener('activate', event => {
  //console.log("Activate");

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
  //console.log("Fetch");
  
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
          return caches.match('/Prancha-alfanumerica-CAA/prancha/index.html');
        })
    )
  }); 