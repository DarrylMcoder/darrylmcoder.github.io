var decodeContent = function(config) {
  function decode(data) {
    if(true || config.processContentTypes.includes(data.headers['content-type'])) {
      data.stream = data.stream.readable.pipeThrough(
        new TransformStream({
          transform(chunk, controller){
            var updated = caesarShift(chunk, -1);
            controller.enqueue(updated);
          },
        })
      );
    }
  }
  
  return decode;
};