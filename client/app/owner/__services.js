(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Owners', OwnerService);


  OwnerService.$inject = ['Restangular'];
  function OwnerService(Restangular) {
  	return Restangular.service('owners');
  }
  
})();