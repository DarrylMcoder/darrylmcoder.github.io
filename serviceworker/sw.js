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

self.addEventListener('fetch', function(event) {          
  if(event.request.url.includes("/darrylmcoder-proxy/")){
    event.respondWith(async function() {
      const request = event.request;
      return await fetch(getRealUrl(request.url), request);
    });
  }else{
    return;
  }
});

function getRealUrl(url) {
  const parts = url.split("/darrylmcoder-proxy/");
  return parts[1].trim();
}