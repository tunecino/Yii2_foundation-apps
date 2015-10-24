(function() {
  'use strict';

  angular
  	.module('API', ['restangular'])
  	.config(restangular);


  restangular.$inject = ['RestangularProvider'];
  function restangular(RestangularProvider) {
  	RestangularProvider.setBaseUrl('http://localhost/foundapps/backend/api');
  }

})();