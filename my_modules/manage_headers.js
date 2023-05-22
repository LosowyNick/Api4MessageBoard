function setProperAcceptHeader(response){
    response.format({
      'text/plain': function () {
        response.set('Content-Type', 'text/plain');
        return response;
      },
    
      'text/html': function () {
        response.set('Content-Type', 'text/html');
        return response;
      },
  
      default: function () {
        response.set('Content-Type', 'application/json');
        return response;
      }
    })
  }

  module.exports = { setProperAcceptHeader };