var helpers = helpers || {};

helpers.parse_link_header = function(header) {
  	if (header.length == 0) throw new Error("input must not be of zero length");
  	// Split parts by comma
  	var parts = header.split(',');
  	var links = {};
  	// Parse each part into a named link
  	_.each(parts, function(p) {
        var section = p.split(';');
        if (section.length != 2) throw new Error("section could not be split on ';'");
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel=(.*)/, '$1').trim();
        links[name] = url;
  	});
  return links;
};

helpers.parse_url_params = function(url) {
  var query = url.split('?');
  return _.isUndefined(query[1]) ? {} : 
    // split out each assignment
    _.chain( query[1].split('&') )
      // Split each array item into [key, value]
      // ignore empty string if search is empty
      .map(function(item) { if (item) return item.split('='); })
      // Remove undefined in the case the search is empty
      .compact()
      // Turn [key, value] arrays into object parameters
      .object()
      // Return the value of the chain operation
      .value();
};

helpers.remove_param_from_url = function(url, param) {
  var query = url.split('?');
  return _.isUndefined(query[1]) ? query[0] : 
    query[0]+'?'+
    _.chain( query[1].split('&') )
      .map(function(item) { if (item && item.split('=')[0] !== param) return item; })
      .compact()
      .join('&')
      .value();
};

helpers.delete_properties = function(objectToClean) {
  for (var x in objectToClean) if (objectToClean.hasOwnProperty(x)) delete objectToClean[x];
};

helpers.replaceItemById = function(list, element) {
  var index = _.indexOf(list, _.find(list, { id : element.id }));
  console.log('indexfromHelper',index);
  list.splice(index, 1 , element);
  return list;
};

helpers.preg_quote = function(str, delimiter) {
  //  discuss at: http://phpjs.org/functions/preg_quote/
  // original by: booeyOH
  // improved by: Ates Goral (http://magnetiq.com)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Onno Marsman
  //   example 1: preg_quote("$40");
  //   returns 1: '\\$40'
  //   example 2: preg_quote("*RRRING* Hello?");
  //   returns 2: '\\*RRRING\\* Hello\\?'
  //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
  //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

  return String(str)
    .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
};