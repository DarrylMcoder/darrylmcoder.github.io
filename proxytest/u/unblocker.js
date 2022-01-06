var unblocker = function(config) {
  function unblock(event) {
    try {
      var request = {...event.request};
      var url = request.url;
      var headers = {...event.request.headers};
      if(event.request.body) {
        var stream = event.request.body
        .pipeThrough(
          new TextDecoderStream(
          )
        );
      }else{
        var stream = new TransformStream();
      }
      
      var data = {
        event: event,
        url: url,
        request: request,
        headers: headers,
        stream: stream
      };
      
      config.requestMiddleware.forEach(
        middleware => {
        middleware(data);
      });
      
      var reqthru = new TransformStream();
      var reqInit = data.request;
      reqInit.headers = data.headers;
      if(data.request.method === 'GET' || 
         data.request.method === 'HEAD') {
        delete reqInit.body;
      }else{
        reqInit.body = reqthru.readable;
      }
      data.stream.readable
      .pipeThrough(new TextEncoderStream())
      .pipeTo(reqthru.writable);
      
      //just for testing
      var test = 'Data: '; 
      test += JSON.stringify(data);
      test += 'reqInit: ';
      test += JSON.stringify(reqInit);
      test += 'Request: ';
      test += JSON.stringify(request);
      returnError(test, event);
      var newReq = new Request(reqInit.url, reqInit);
      
    } catch(e) {
      returnError(e,event);
    }
    
    fetch(newReq)
    .then(res => {
      try {
        
      
      var response = {...res};
      var headers = {...res.headers};
      response.headers = headers;
      var contentType = headers['content-type'];
      
      data.remoteResponse = res;
      data.response = response;
      data.headers = headers;
      data.contentType = contentType;
      data.stream = res.body.pipeThrough(new TextDecoderStream());
      
      config.responseMiddleware.forEach(
        middleware => {
        middleware(data);
      });
      
      var resthru = new TransformStream();
      var resInit = data.response;
      resInit.headers = data.headers;
      data.stream.readable
      .pipeThrough(new TextEncoderStream())
      .pipeTo(resthru.writable);
      
      var finalResponse = new Response(resthru.readable, resInit);
      event.respondWith(finalResponse);
      
      } catch(e) {
        returnError(e, event);
      }
      
    }).catch(e => returnError(e, event));
    
  }
  
  return unblock;
};

function returnError(error, event) {
  event.respondWith(new Response(error));
}