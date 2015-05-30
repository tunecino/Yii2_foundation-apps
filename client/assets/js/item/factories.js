(function(){
  'use strict';
  var factories;

  ItemSomeFactory.$inject = [];
  function ItemSomeFactory() {

  }


  factories = {
    ItemSomeFactory: ItemSomeFactory
  };


  angular.module('ItemModule').factory(factories);
}());
