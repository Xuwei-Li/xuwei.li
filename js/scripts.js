// Progressive Web Application Service Worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/pwa.js?v=1').then(function (registration) {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
    }).catch(function (error) {
        console.log('ServiceWorker registration failed:', errror);
    });
}