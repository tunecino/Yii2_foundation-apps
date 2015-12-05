(function() {
  'use strict';

  angular
    .module('API')
    .service('AuthService', AuthService);


  AuthService.$inject = ['$rootScope', 'Restangular', 'UserService', 'ApiAuthUrl', 'ClientID'];
  function AuthService($rootScope, Restangular, UserService, ApiAuthUrl, ClientID){
    var service = this;

    service.login = function(credentials) {
      credentials.client_id = ClientID;
      return Restangular
        .withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(ApiAuthUrl);
         })
        .all('account')
        .customPOST(credentials, 'login', undefined, {})
        .then(function(response){
          var user = response.data.user;
          UserService.setCurrentUser(user);
          $rootScope.$broadcast('authorized');
        });
    };

    service.logout = function() {
      return Restangular
        .withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(ApiAuthUrl);
         })
        .all('account')
        .customGET('logout')
        .then(function(response){
          UserService.setCurrentUser(null);
          $rootScope.$broadcast('unauthorized');
        }, function(error) {
            console.log(error);
        });
    };

    service.signup = function(user) {
      user.client_id = ClientID;
      return Restangular
        .withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(ApiAuthUrl);
         })
        .all('account')
        .customPOST(user, 'signup', undefined, {})
        .then(function(response){
          console.log('inside signup',response);
          var user = response.data.user;
          UserService.setCurrentUser(user);
          $rootScope.$broadcast('authorized');
        });
    };

    service.requestResetPass = function(email) {
      email.client_id = ClientID;
      return Restangular
        .withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(ApiAuthUrl);
         })
        .all('account')
        .customPOST(email, 'req-reset-pass', undefined, {});
    };

    service.resetPass = function(data) {
      data.client_id = ClientID;
      return Restangular
        .withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(ApiAuthUrl);
         })
        .all('account')
        .customPOST(data, 'reset-pass', undefined, {});
    };

  }

      // service.login = function(credentials) {
    //   var deferred = $q.defer();
    //   Restangular.all('auth')
    //     .customPOST(credentials, 'login', undefined, {})
    //     .then(function(response){
    //       // $timeout(function() {
    //       //     console.log('sky is blue !');
    //       // }, 2000);
    //       //console.log('inside auth',response);
    //       var user = response.user;
    //       UserService.setCurrentUser(user);
    //       $rootScope.$broadcast('authorized');
    //       deferred.resolve(user);
    //       $state.go('images');
    //     }, 
    //     function errorCallback(e) {
    //         deferred.reject();
    //         console.log("Error: Resource couldn't be loaded | status code:", e.status);
    //     });
    //   return deferred.promise;
    // };

})();