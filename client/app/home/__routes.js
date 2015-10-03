(function() {
  'use strict';

  angular
    .module('HomeModule')
    .config(route);
  
  
  route.$inject = ['$stateProvider', '$urlRouterProvider'];
  function route($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'templates/home/home.html',
      });
  }
  
})();