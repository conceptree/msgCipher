self.addEventListener('instal', event => {
    event.waitUntil(
        caches.open('v1')
            .then(cache => {
                cache.addAll([
                    './',
                    './script.js',
                    './main.js'
                ]);
                console.log('Assets cached');
            })
            .catch(err=> console.log("Could not cache"))
    )
});

