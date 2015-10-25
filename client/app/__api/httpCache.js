(function() {
  'use strict';

  angular
   .module('API')
   .factory('HTTPCache', HTTPCache);


  HTTPCache.$inject = ['Restangular', '$cacheFactory'];
  function HTTPCache(Restangular, $cacheFactory) {
    var service = {};
    var cache;

    // Creates the cache
    service.init = function() {
        console.log('caching started !');
        cache = $cacheFactory('http');
        Restangular.setDefaultHttpFields({cache: cache});

        Restangular.setResponseInterceptor(function(response, operation) {
           if (operation === 'put' || operation === 'post' || operation === 'delete') {
               cache.removeAll();
           }
           return response;
        })
    }

    return service;
  }

})();


