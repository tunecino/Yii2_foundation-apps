(function() {
  'use strict';

  angular
  	.module('API')
    .run(interceptors);


  interceptors.$inject = ['$rootScope', 'Restangular', 'HTTPCache', 'FoundationApi'];
  function interceptors($rootScope, Restangular, HTTPCache, FoundationApi) {
    
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

    Restangular.setErrorInterceptor(
      function(response, deferred, responseHandler) {

        var commonErrors = [400, 401, 403, 404, 405, 415, 429, 500];
        // more details here : http://www.yiiframework.com/doc-2.0/guide-rest-error-handling.html

        if(commonErrors.indexOf(response.status) > 0) {
          FoundationApi.publish('main-notifications', { 
            title: 'Server Error: ' + response.status, 
            content: response.statusText, 
            color: 'alert', 
            autoclose: 4000 
          });
          return false; // error handled
        }
        return true; // error not handled
      });

  }
  
})();