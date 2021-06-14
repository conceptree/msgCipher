importScripts('./node_modules/workbox-sw/build/workbox-sw.js');

const precacheManifest = [[{"revision":"785418f55651b348ff73535ea47724e7","url":"css/styles.css"},{"revision":"7a24e50d96b518ca2693fa88ca3e537d","url":"index.html"},{"revision":"d2af762f593dac0a607b34fdc01d55e5","url":"main.js"},{"revision":"1efde22b00f380257234ca3f8348bf7c","url":"workbox-a9938592.js"}]];

workbox.precaching.precacheAndRoute(precacheManifest);