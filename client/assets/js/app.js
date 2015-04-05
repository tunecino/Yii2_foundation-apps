(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .controller('ItemCtrl', ItemCtrl)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];
  ItemCtrl.$inject = ['$scope', '$http', '$filter', '$stateParams', '$state', '$controller'];

  function ItemCtrl($scope, $http, $filter, $stateParams, $state, $controller) {

      angular.extend(this, $controller('DefaultController', {$scope: $scope, $filter: $filter, $http: $http, $stateParams: $stateParams, $state: $state}));
      // what you want now...
      $scope.test="hello";
    
  }

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
