(function(){
  'use strict';
  var services;

  RestItemQuery.$inject = ['Restangular'];
  function RestItemQuery(Restangular) {
  	// the RESTful service for retreiving data'
  	var Item = Restangular.service('items');
	return{
		getAll: (function(limit, page, attr, q) {
		    Item = Restangular.service('items');
		    page = (typeof page === 'undefined') ? 1 : page;
		    //attr & q are used for search inputs (ex: attr= 'name' & q= 'campaign 9')
		    attr = (typeof attr === 'undefined') ? false : attr;
		    q = (typeof q === 'undefined') ? false : q;
		    var request = { 
		        'expand': 'tag', 
		        'per-page': limit, 
		        'page': page 
		    };
		    if (attr && q) {
		        request[attr] = q;
		        Item = Restangular.service('search', Restangular.all('items'));
		    }
		    return Item.getList(request);
		}),

		getOne: (function(id) {
		    return Restangular.all('items').get(id, {'expand': 'tag'});
		}),

		empty: (function() {
		    return Restangular.service('items');
		}),
  	};
  }

  services = {
    RestItemQuery: RestItemQuery
  };

  angular.module('ItemModule').service(services);
}());