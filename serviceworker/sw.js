self.addEventListener('install', function(event){
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event) {          
  event.respondWith(async function() {
    const request = event.request;
    return fetch(getRealUrl(request.url), request);
  });
});

function getRealUrl(url) {
  const parts = url.split("/darrylmcoder-proxy/");
  return parts[1].trim();
}