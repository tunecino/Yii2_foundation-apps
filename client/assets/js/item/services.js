(function(){
  'use strict';
  var services;

  RestItemQuery.$inject = [];
  function RestItemQuery() {
    

  }

  services = {
    RestItemQuery: RestItemQuery
  };

  angular.module('ItemModule').service(services);
}());