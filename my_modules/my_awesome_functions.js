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

function validateMinPrice(minPrice){
  if(minPrice != undefined && /^[0-9]+[.]?([0-9]+)?$/.test(minPrice)){
    return parseFloat(minPrice);
  }else{
    return -Infinity;
  }
}

function validateMaxPrice(maxPrice){
  if(maxPrice != undefined && /^[0-9]+[.]?([0-9]+)?$/.test(maxPrice)){
    return parseFloat(maxPrice);
  }else{
    return Infinity;
  }
}

function prepareRegExpForTagsSearch(tags){
  let pattern = ".*";
  if(tags != undefined && tags.length > 1){
    let tempArray = tags.split(",");
    tempArray = tempArray.map(function(el){
      return encodeURIComponent(el);
    });
    pattern = new RegExp(tempArray.join("|"), "i");
  }
  return pattern;
}

module.exports = { setProperAcceptHeader, encodeStringsInJson, validateMinPrice, validateMaxPrice, prepareRegExpForTagsSearch};