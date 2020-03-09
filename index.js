// verifica se o navegador suporta service workers
		if (navigator.serviceWorker) {
            // Registra o service worker
            navigator.serviceWorker.register("./sw.js")
                .then(function (registration) {
                console.info("Service Worker registration successful with scope: ", registration.scope);
                })
                .catch(function (err) {
                // Log do erro caso não consiga registrar o service worker
                console.error("Service Worker registration failed: ", err);
                });
            }