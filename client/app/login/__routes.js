(function() {
  'use strict';

  angular
    .module('LoginModule')
    .config(route);
  
  
  route.$inject = ['$stateProvider', '$urlRouterProvider'];
  function route($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login/login.html',
          controllerAs: '$',
          controller: 'LoginCtrl'
      })
      .state('signup', {
          url: '/signup',
          templateUrl: 'templates/login/login.html',
          controllerAs: '$',
          controller: 'LoginCtrl'
      })
      .state('recovery', {
          url: '/account-recovery/:token',
          templateUrl: 'templates/login/recovery.html',
          controllerAs: '$',
          controller: 'RecoveryCtrl'
      });
  }
  
})();