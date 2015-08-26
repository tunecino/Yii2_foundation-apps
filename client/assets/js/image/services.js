(function(){
  'use strict';
  var services;

  RestImageQuery.$inject = ['Restangular'];
  function RestImageQuery(Restangular) {
  	// the RESTful service for retreiving data'
  	var Image = Restangular.service('images');
	return{
		getAll: (function(limit, page, attr, q) {

			page = typeof page !== 'undefined' ? page : 1;
			//attr & q are used for search inputs (ex: attr= 'name' & q= 'campaign 9')
   			attr = typeof attr !== 'undefined' ? attr : false;
   			q    = typeof q    !== 'undefined' ? q : false;

		    Image = Restangular.service('images');

		    var request = { 
		        'expand': 'tags', 
		        'per-page': limit, 
		        'page': page 
		    };

		    if (attr && q) {
		        request[attr] = q;
		        Image = Restangular.service('search', Restangular.all('images'));
		    }

		    return Image.getList(request);
		}),

		getOne: (function(id) {
		    return Restangular.all('images').get(id, {'expand': 'tags'});
		}),

		empty: (function() {
		    return Restangular.service('images');
		}),
  	};
  }

  services = {
    RestImageQuery: RestImageQuery
  };

  angular.module('ImageModule').service(services);
}());