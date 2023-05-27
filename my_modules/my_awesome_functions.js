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

function encodeStringsInJson(json){
    for(let i in json){
      if(typeof json[i] != "object"){
        if(typeof json[i] == "string"){json[i] = encodeURIComponent(json[i]);}
      }else{
        encodeStringsInJson(json[i]);
      }
    }
  }

  module.exports = { setProperAcceptHeader, encodeStringsInJson };