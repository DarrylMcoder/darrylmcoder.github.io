self.addEventListener('fetch', function(event) {          1
  if (/\.png$/.test(event.request.url)) {                 
    event.respondWith(fetch('/images/unicorn.png'));      
  }
});