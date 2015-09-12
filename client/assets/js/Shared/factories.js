(function(){
  'use strict';
  var factories;

  Model.$inject = ['Restangular', '$q'];
  function Model(Restangular, $q) {

    var Model = function(resources) {

      var api = Restangular.all(resources);

      this.initialize = function() {

        var data = api.get(1, {'expand': this.expand});
        var self = this;

        data.then(function(response) {
          angular.extend(self, response);  
        });

      };

      this.initialize();

    };

    //console.log(Model);

    return Model;

  }


  factories = {
    Model: Model
  };


  angular.module('ImageModule').factory(factories);
}());
