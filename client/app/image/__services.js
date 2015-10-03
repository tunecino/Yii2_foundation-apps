(function() {
  'use strict';

  angular
  	.module('ImageModule')

 	.factory('Img', ['ngActiveResource', function(ngActiveResource) {

      Img.inherits(ngActiveResource.Base);

      Img.api.configure(function(config) {
        config.baseURL   = "http://foundapps.dev/backend/api";
        config.resource = "images";
      });

      function Img(data) {}

      return Img;

    }]);
  
})();