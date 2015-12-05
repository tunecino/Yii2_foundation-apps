(function() {
  'use strict';

  angular
  	.module('API', ['restangular','angular-storage'])
    .constant('ClientID', 'public_web_abc123')
    .constant('ApiBaseUrl', 'http://localhost/foundapps/backend/api')
    .constant('ApiAuthUrl', 'http://localhost/foundapps/backend/auth')
  	.config(restangular);


  restangular.$inject = ['RestangularProvider','$httpProvider', 'ApiBaseUrl'];
  function restangular(RestangularProvider, $httpProvider, ApiBaseUrl) {
    RestangularProvider.setBaseUrl(ApiBaseUrl);
    RestangularProvider.setFullResponse(true);
    RestangularProvider.setDefaultHttpFields({'withCredentials': true});
  }

})();