(function() {
  'use strict';

  angular
    .module('application', [
      'ui.router',
      'ngAnimate',

      'foundation',
      //'foundation.dynamicRouting',
      //'foundation.dynamicRouting.animations'

      // API
      'ngActiveResource',
      //'ngRoute',

      // My modules
      'SharedModule',
      'HomeModule',
      //'ImageModule'
    ])
    .config(api)
    .config(config)
    .run(run);

    //api.$inject = ['ngActiveResource'];
    function api(ngActiveResource) {
      ngActiveResource.api.configure(function(config) {
        config.baseURL = "http://foundapps.dev/backend/api";
        config.format  = "json";
        config.appendFormat = false;
      });

    }


  config.$inject = ['$urlRouterProvider', '$locationProvider'];
  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }


  function run() {
    FastClick.attach(document.body);
  }

})();
