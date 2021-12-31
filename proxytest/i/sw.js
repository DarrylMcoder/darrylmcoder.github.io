self.importScripts('caesarShift.js');
self.importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
self.importScripts('unblocker.js');

self.addEventListener('install', function(event){
      // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
    self.skipWaiting();
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch',unblocker({
  requestMiddleware: [
    
  ],
  responseMiddleware: [
    
  ],
}));