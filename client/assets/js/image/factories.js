(function(){
  'use strict';
  var factories;

  //Images.$inject = ['restmod'];

  function Images (restmod) {
    return restmod.model('images', 'DefaultPacker')
    //   , 'PagedModel', function() {
    //   this.define('pageHeader', 'X-Pagination-Current-Page');
    // })
    .mix({
      $config: {
       //style: 'DefaultPacker',
        //name: 'image', 
        plural: 'images',
        primaryKey: 'id',
        jsonMeta: '_meta',
        //jsonLinks: '_links',
        urlPrefix: 'http://foundapps.dev/backend/api/v1/'
      }
    });
  }




 //  function Images(Restangular, $q) {

 //  	var service = {};

 //  	var api = Restangular.all('images');

 //  	service.expand = 'tags';

	

	// service.totalCount = 0;
	// service.pageCount = 0;
	// service.currentPage = 0;
	// service.perPage = 2;


 //  	service.getOne = function(id) {
 //  		return api.get(id, {'expand': this.expand});
 //  	};

 //  	service.firstPage = function() {
 //  		this.currentPage = 1;
 //  		return api.getList({'expand': this.expand, 'per-page': this.perPage, 'page': this.currentPage});
 //  	};

 //  	service.lastPage = function() {
 //  		if (this.pageCount < 2) return this.firstPage();
 //  		this.currentPage = this.pageCount;
 //  		return api.getList({'expand': this.expand, 'per-page': this.perPage, 'page': this.currentPage});
 //  	};

 //  	service.test = function() {
 //  		var newResDeferred = $q.defer();
 //        api.getList({'expand': this.expand, 'per-page': this.perPage, 'page': this.currentPage})
 //        .then(function(result){
 //            var newRes = result;
 //            newRes.newlyCreatedProp = 'newlyCreatedProp';
 //            newResDeferred.resolve(newRes);
 //        });
 //        return newResDeferred.promise;
 //  	};

  	

 //  	// service.nextPage = function() {
 //  	// 	return totalPages;
 //  	// }

 //  	// service.setTotalPages = function(total) {
 //  	// 	totalPages = total;
 //  	// }

 //  	return service;
 //  }


  factories = {
    Images: Images
  };


  angular.module('ImageModule').factory(factories);
}());
