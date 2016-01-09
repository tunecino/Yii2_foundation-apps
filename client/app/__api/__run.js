(function() {
  'use strict';

  angular
  	.module('API')
    .run(interceptors);


  interceptors.$inject = ['$rootScope', 'Restangular', 'HTTPCache', 'FoundationApi', 'UserService', 'AuthService', 'AuthRoutes', '$http'];
  function interceptors($rootScope, Restangular, HTTPCache, FoundationApi, UserService, AuthService, AuthRoutes, $http) {

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

    /** AUTHENTICATION request interceptor **/
    Restangular.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
      if (_.include(AuthRoutes,route)) {
          var currentUser = UserService.getCurrentUser(),
              access_token = currentUser && UserService.isLogged() ? currentUser.access_token : null;
          headers.Authorization = 'Bearer ' + access_token;
      }
      return { element:element, params:params, headers:headers, httpConfig:httpConfig };
    });

    Restangular.addErrorInterceptor(
      function(response, deferred, responseHandler) {

        pendingRequests--;
        if (pendingRequests == 0) {
            $rootScope.loading = false;
        }
        
        /** AUTHENTICATION response interceptor **/
        if (response.status === 401) {

          if (UserService.getCurrentUser()) {
              console.log('new access_token sould be requested');
              var refresh = AuthService.refresh(response.config.url);
              if (refresh) refresh.then(function(access_token) {
                  response.config.headers.Authorization = 'Bearer ' + access_token;
                  $http(response.config).then(responseHandler, deferred.reject);
              });
          }

          else $rootScope.$broadcast('unauthorized');
          return false; // error handled
        }

        var commonErrors = [400, 403, 404, 405, 415, 429, 500, 503];
        // more details here : http://www.yiiframework.com/doc-2.0/guide-rest-error-handling.html

        if(commonErrors.indexOf(response.status) > 0) {
          if (response.status === 403) {
            FoundationApi.publish('main-notifications', { 
              title: response.data.name,
              content: response.data.message,
              color: 'alert', 
              autoclose: 5000 
            });
            return true; // error not handled
          }
          else FoundationApi.publish('main-notifications', { 
            title: 'Server Error: ' + response.status, 
            content: response.statusText, 
            color: 'alert', 
            autoclose: 5000 
          });
          return false; // error handled
        }
        return true; // error not handled
      });

  }
  
})();