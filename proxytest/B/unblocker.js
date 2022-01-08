// using  https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js

var unblocker = function(config) {
  function unblock(event) {
    try {
      
    var request = _.cloneDeep(event.request);
    var url = event.request.url;
      
    var data = {
      url: url,
      event: event,
      headers: request.headers,
      request: request
    };
    
    if(event.request.body) {
      data.stream = event.request.body
      .pipeThrough(new TextDecoderStream());
    }else{
      data.stream = new TransformStream();
    }
    config.requestMiddleware.some((middleware) => {
      middleware(data);
      return false;
    });
    
    var passthru = new TransformStream();
    if(data.request.method === 'GET' || 
       data.request.method === 'HEAD' || 
       !data.request.method) {
      
    }else{
      data.request.body = passthru.readable;
    }
    var request = new Request(data.url, data.request);
    data.stream
      .pipeThrough(new TextEncoderStream())
      .pipeTo(passthru.writable);
      
    } catch(e) {
      event.respondWith(new Response('Error: ' + e));
    }
    
    fetch(request)
    .then(response => {
      try {
        
      data.response = _.cloneDeep(response);
      data.headers = data.response.headers;
      data.stream = response.body.pipeThrough(new TextDecoderStream());
      config.responseMiddleware.some((middleware) => {
        middleware(data);
        return false;
      });
      
      var resthru = new TransformStream();
      event.respondWith(
        new Response(
          resthru.readable, data.response
        )
      );
      data.stream
        .pipeThrough(new TextEncoderStream())
        .pipeTo(resthru.writable);
      } catch(e) {
        event.respondWith(new Response('Error: ' + e));
      }
    }).catch(e => {
      event.respondWith(new Response("Error: " + e));
    });
  }
  return unblock;
}