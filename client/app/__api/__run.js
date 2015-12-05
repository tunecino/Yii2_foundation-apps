(function() {
  'use strict';

  angular
  	.module('API')
    .run(interceptors);


  interceptors.$inject = ['$rootScope', 'Restangular', 'HTTPCache', 'FoundationApi', 'UserService'];
  function interceptors($rootScope, Restangular, HTTPCache, FoundationApi, UserService) {
    
  /** AUTHENTICATION **/
    Restangular.addRequestInterceptor(
      function(element, operation, what, url) {
        var currentUser = UserService.getCurrentUser(),
            access_token = currentUser ? currentUser.access_token : null;

        if (access_token === null) HTTPCache.remove();
        Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + access_token});

        return element;
    });

    // Restangular.addErrorInterceptor(
    //   function(response, deferred, responseHandler) {
    //       if (response.status === 401) {
    //           $rootScope.$broadcast('unauthorized');
    //           return false; // error handled
    //       }
    //     return true; // error not handled
    //   });

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

    // Restangular.addErrorInterceptor(
    //   function(response, deferred, responseHandler) {
    //     console.log('errorS',pendingRequests);
    //     pendingRequests--;
    //     if (pendingRequests == 0) {
    //         $rootScope.loading = false;
    //     }
    //     console.log('errorE:',pendingRequests);
    //     return true; // error not handled
    //   });

    Restangular.addErrorInterceptor(
      function(response, deferred, responseHandler) {

        pendingRequests--;
        if (pendingRequests == 0) {
            $rootScope.loading = false;
        }
        
        /** AUTHENTICATION **/
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
            return false; // error handled
        }

        var commonErrors = [400, 403, 404, 405, 415, 429, 500];
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