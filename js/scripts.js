// Progressive Web Application Service Worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js?v=2').then(function (registration) {
        // #DEBUG
        console.log('ServiceWorker registration successful with scope:', registration.scope);
    }).catch(function (error) {
        // #DEBUG
        console.log('ServiceWorker registration failed:', errror);
    });
}