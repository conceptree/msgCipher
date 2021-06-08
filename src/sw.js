self.addEventListener('install', function (event) {
    const CACHE_NAME = 'my-site-cache-v1';
    const urlsToCache = [
        '../assets/*',
        '../data/ciphers.json',
        '/css/style.css',
        '/main.js',
        '../cyphers/*'
    ];

    self.addEventListener('install', function (event) {
        // Perform install steps
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(function (cache) {
                    console.log('Opened cache');
                    return cache.addAll(urlsToCache);
                })
        );
    });
});