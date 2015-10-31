(function() {
  'use strict';

  angular
   .module('API')
   .factory('HTTPCache', HTTPCache);


  HTTPCache.$inject = ['Restangular', '$cacheFactory'];
  function HTTPCache(Restangular, $cacheFactory) {
    var service = {};
    var cache = $cacheFactory('http');

    // Creates the cache
    service.init = function() {
        console.log('cache started !');
        Restangular.setDefaultHttpFields({cache: cache});

        Restangular.setResponseInterceptor(function(response, operation) {
           if (operation === 'put' || operation === 'post' || operation === 'delete') {
               cache.removeAll();
           }
           return response;
        })
    }

    service.remove = function() {
        console.log('getting fresh data !');
        if (cache) cache.removeAll();
    }

    return service;
  }

})();


