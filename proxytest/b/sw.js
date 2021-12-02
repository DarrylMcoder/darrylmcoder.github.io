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
    event.respondWith(handleRequest(event.request));
  }else{
    return;
  }
});
    
async function handleRequest(request) {
  const response = await fetch(getRealUrl(request.url), editRequest(request));
  return response;
}

function editRequest(request) {
  if(request.mode === "navigate") {
    var newRequest = new Request(request, {
      mode: ""
    });
    return newRequest;
  }
}

function getRealUrl(url) {
  const parts = url.split("/darrylmcoder-proxy/");
  return parts[1].trim();
}