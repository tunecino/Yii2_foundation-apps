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
    'ImageModule',

    //3rd libs
    'restangular',
    'restmod',
  ])
    .config(config)
    .config(rest)
    .config(restmod)
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
    // RestangularProvider.setRestangularFields({
    //   selfLink: 'self.link'
    // });
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
        extractedData.test = 'good place to store pagination data !';
      }
      return extractedData;
    });
  }

  function restmod(restmodProvider) {
     //restmodProvider.rebase('AMSApi'); // given the mixin is called MyStyleApi
     restmodProvider.rebase({
        // $config: {
        //     //style: 'AMSApi',
        //     style: 'DefaultPacker',
        //     //primaryKey: 'id',
        //     name: 'image',
        //     plural: 'images',
        //     jsonLinks: '_links'
        // },

         $hooks: {
                'after-request-error': function(response) {
                    console.log('-- error --');
                    console.log(response);
                 }
         },

         // 'Model.unpack': function(_resource, _raw) {
         //    if(_resource.$isCollection) {
         //      _resource.$page = _raw.page;
         //      return _resource.results;
         //    } else {
         //      return _raw;
         //    }
         //  }
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
