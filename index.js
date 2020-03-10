// verifica se o navegador suporta service workers
  if ('serviceWorker' in navigator) {
    // Registre o service worker
     navigator.serviceWorker
      .register ('./testesw.js')
      .then (function (registration) {
      console.info ("Registro do Service Worker bem-sucedido com escopo:", registration.scope);
      })
      .catch (function (err) {
      // Log do erro não consiga registrar o service worker
      console.error( 'Registro do ServiceWorker falhou:' ,  err );
      });
  }

  //function to perform HTTP request
  var get = function(url){
    return new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
            var result = xhr.responseText
            result = JSON.parse(result);
          }else{
            reject(xhr);
          }
        }
      };

      xhr.open("GET", url, true);
      xhr.send();
    });
  };