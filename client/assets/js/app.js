(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // My modules
    'SharedModule',
    'HomeModule',
    'ItemModule',

    //3rd libs
    'restangular'
  ])
    .config(config)
    .config(rest)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];  

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function rest(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://foundapps.dev/backend/api/v1');
    //RestangularProvider.setRequestSuffix('.json');
    //RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      if (operation === "getList") {
        extractedData = data.data;
        extractedData._meta = data._meta;
        extractedData._links = data._links;

      } 
      else {
        extractedData = data;
        //extractedData._link = data.links;
      }
      return extractedData;
    });
  }

  function run(Restangular, $rootScope) {
    FastClick.attach(document.body);

    //Restangular config
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
