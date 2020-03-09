// verifica se o navegador suporta service workers
  if (navigator.serviceWorker) {
    // Registre o service worker
    navigator.serviceWorker.register ("./sw.js")
    .then (function (registration) {
    console.info ("Registro do Service Worker bem-sucedido com escopo:", registration.scope);
    })
    .catch (function (err) {
    // Log do erro não consiga registrar o service worker
    console.error( 'Registro do ServiceWorker falhou:' ,  err );
    });
  }