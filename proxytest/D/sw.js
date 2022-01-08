self.importScripts('caesarShift.js');
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

self.addEventListener('fetch', event => {
  var url = encodeUrl(event.request.url);
  var request = new Request(url, event.request);
  fetch(request).then(res => {
    res.text()
    .then(text => caesarShift(text, -1))
    .then(text => {
      event.respondWith(new Response(text, res));
    }).catch(e => returnError(e, event));
  }).catch(e => returnError(e, event));
});

function returnError(error, event) {
  event.respondWith(new Response(error));
}

function encodeUrl(url) {
  let separator = 'proxy/';
  if(!url.includes(separator)) {
    return;
  }
  let proxyUrl = url.slice(url.indexOf(separator) + separator.length);
  let enc = caesarShift(proxyUrl, 1);
  return enc;
}