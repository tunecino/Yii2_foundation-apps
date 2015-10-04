(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('Owner', OwnerModel);



  OwnerModel.$inject = ['ngActiveResource'];
  
  function OwnerModel(ngActiveResource) {
    Owner.inherits(ngActiveResource.Base);

      //Owner.hasMany('tags');
      //Owner.belongsTo('owner');

      Owner.api.configure(function(config) {
        config.baseURL   = "http://foundapps.dev/backend/api";
        // use something generic
        config.format  = "json";

        // don't append .format e.g. api.edmodo.com/v1/users.json
        config.appendFormat = false;

        config.resource = "owners";
      });

      Owner.validates({
          name: { required: true },
      });

      function Owner(data) {
        this.string('name');
      }

      return Owner;
  }
  
})();