(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Image', ImageModel);



  ImageModel.$inject = ['ngActiveResource'];

  function ImageModel(ngActiveResource) {
    Image.inherits(ngActiveResource.Base);

      //Image.hasMany('tags');
      //Image.belongsTo('owner');

      Image.api.configure(function(config) {
        config.baseURL   = "http://foundapps.dev/backend/api";
        // use something generic
        config.format  = "json";

        // don't append .format e.g. api.edmodo.com/v1/users.json
        config.appendFormat = false;

        config.resource = "images";
      });

      Image.validates({
          name: { required: true },
      });

      function Image(data) {
        this.string('name');
      }

      return Image;
  }
  
})();