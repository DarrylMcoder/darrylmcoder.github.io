self.addEventListener('install', function(event){
	console.log(event);
});

self.addEventListener('activate', function(event){
    console.log(event);
});

self.addEventListener('fetch', function(event) {          
  if (/\.png$/.test(event.request.url)) {                 
    event.respondWith(fetch('/images/unicorn.png'));      
  }
});