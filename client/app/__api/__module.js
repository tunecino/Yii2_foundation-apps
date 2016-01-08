(function() {
  'use strict';

  angular
  	.module('API', ['restangular','angular-locker'])

    .constant('AppName', 'demo')
    .constant('ClientID', 'public_web_abc123')
    .constant('ApiBaseUrl', 'http://localhost/foundapps/backend/api')
    .constant('ApiAuthUrl', 'http://localhost/foundapps/backend/auth')
    .constant('AuthRoutes', ['images','tags','owners'])

    .config(restangular)
  	.config(angularLocker);


  restangular.$inject = ['RestangularProvider','$httpProvider', 'ApiBaseUrl'];
  function restangular(RestangularProvider, $httpProvider, ApiBaseUrl) {
    RestangularProvider.setBaseUrl(ApiBaseUrl);
    RestangularProvider.setFullResponse(true);
    RestangularProvider.setDefaultHttpFields({'withCredentials': true});
  }

  angularLocker.$inject = ['lockerProvider','AppName'];
  function angularLocker(lockerProvider,AppName) {
    lockerProvider.defaults({
        driver: 'session',
        namespace: AppName,
        separator: '.',
        eventsEnabled: false
    });
  }

})();