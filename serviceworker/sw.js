self.addEventListener('fetch', function(event) {          
  if (/\.png$/.test(event.request.url)) {                 
    event.respondWith(fetch('/images/unicorn.png'));      
  }
});