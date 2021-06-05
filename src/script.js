let registration = null;

function registerServiceWorker(){
    if('serviceWorker' in navigator) {
        window.navigator.serviceWorker.register('./sw.js', { scope: './'})
        .then(res => {
            registration = res;
            console.log('Service Worker sucessfully registered');
        })
        .catch(err => {
            console.log("Could not register Service Worker.");
        });
    }
}

function unregisterServiceWorker(){
    navigator.serviceWorker.getRegistrations()
    .then(registrations => {
        registrations.forEach(registration => {
            registrations.unregister();
            console.log("Service Worker unregistered");
        })
    })
    .catch(err => {
        console.log("Could not unregister Service Worker");
    })
}

registerServiceWorker();