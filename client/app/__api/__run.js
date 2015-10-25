(function() {
  'use strict';

  angular
  	.module('API')
    .run(interceptors);


  interceptors.$inject = ['$rootScope', 'Restangular', 'HTTPCache'];
  function interceptors($rootScope, Restangular, HTTPCache) {
  /** ENABLE CACHING **/
    HTTPCache.init();

  /** PENDING REQUESTS & LOADER TRACKER **/
    var pendingRequests = 0;

    Restangular.addRequestInterceptor(
      function(element, operation, what, url) {
        if (pendingRequests == 0) {
          $rootScope.loading = true;
        }
        pendingRequests++;
        return element;
    });

    Restangular.addResponseInterceptor(
      function(data, element, operation, what, url) {
        pendingRequests--;
        if (pendingRequests == 0) {
          $rootScope.loading = false;
        }
        return data;
    });

    Restangular.addErrorInterceptor(
      function(response, deferred, responseHandler) {
        pendingRequests--;
        if (pendingRequests == 0) {
            $rootScope.loading = false;
        }
        return true; // error not handled
      });
  }
  
})();