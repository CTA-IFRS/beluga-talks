// verifica se o navegador suporta service workers
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }


    // if (navigator.serviceWorker) {
    //     // Registra o service worker
    //     navigator.serviceWorkerRegistration.register("./sw.js")
    //         .then(function (registration) {
    //             console.info("Service Worker registration successful with scope: ", registration.scope);
    //         })
    //         .catch(function (err) {
    //             // Log do erro caso não consiga registrar o service worker
    //             console.error("Service Worker registration failed: ", err);
    //         });
    //     }