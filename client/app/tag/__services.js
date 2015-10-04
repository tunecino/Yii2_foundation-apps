(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Tag', TagModel);



  TagModel.$inject = ['ngActiveResource'];
  
  function TagModel(ngActiveResource) {
    Tag.inherits(ngActiveResource.Base);

      //Imgage.hasMany('tags');
      //Imgage.belongsTo('owner');

      Tag.api.configure(function(config) {
        config.baseURL   = "http://foundapps.dev/backend/api";
        // use something generic
        config.format  = "json";

        // don't append .format e.g. api.edmodo.com/v1/users.json
        config.appendFormat = false;

        config.resource = "tags";
      });

      Tag.validates({
          name: { required: true },
      });

      function Tag(data) {
        this.string('name');
      }

      return Tag;
  }
  
})();