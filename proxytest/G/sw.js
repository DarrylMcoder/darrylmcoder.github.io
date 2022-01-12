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
  if(!event.request.url.includes('proxy/http')) {
    return;
  }
  event.respondWith(async function() {
    try {
    var url = encodeUrl(event.request.url);
    var req = event.request;
    var init =     {
      method: req.method,
      headers: req.headers,
      credentials: req.credentials,
      cache: req.cache,
      redirect: req.redirect,
      referrer: req.referrer,
      integrity: req.integrity
    };
    
    if(req.method === 'GET' ||
       req.method === 'HEAD' ||
       !req.method) {
      
    }else{
      init.body = req.body;
    }
    
    if(req.mode !== 'navigate') {
      init.mode = req.mode;
    }
    var request = new Request(url,init);
  } catch(e) {
    return new Response("Error: " + e);
  }
    return fetch(request)
    .then(response => {
      return response.text()
      .then(text => caesarShift(text, -1))
      .then(text => {
        let status = response.status >= 100 
        && response.status <= 599 
        ? response.status : 200,
            statusText = response.statusText,
            headers = response.headers;
        return new Response(text, response);
      }).catch(e => {
        return new Response("Error: " + e);
      });
    })
    .catch(e => {
      return new Response("Error: " + e);
    });
  }());
});
    


function encodeUrl(url) {
  let separator = 'proxy/';
  if(!url.includes(separator)) {
    return;
  }
  let proxyUrl = url.slice(url.indexOf(separator) + separator.length);
  let enc = caesarShift(proxyUrl, 1);
  return url.replace(proxyUrl, enc);
}