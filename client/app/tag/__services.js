(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Tags', TagService);


  TagService.$inject = ['Restangular'];
  function TagService(Restangular) {
  	return Restangular.service('tags');
  }
  
})();