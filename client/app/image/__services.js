(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Images', ImageService);



  ImageService.$inject = ['Restangular'];
  function ImageService(Restangular) {
  	return Restangular.service('images');
  }
  
})();