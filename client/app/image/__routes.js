(function() {
  'use strict';

  angular
    .module('ImageModule')
    .config(route);


  route.$inject = ['$stateProvider', '$urlRouterProvider'];
  function route($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('images', {
          url: '/images',
          templateUrl: 'templates/image/index.html',
          controllerAs: 'vm',
          controller: 'IndexCtrl',
          resolve: {
              Collection: 'Collection',
              Images: function(Collection){
                var images = new Collection('images');
                //images.select(['id','url']);
                images.with('tags');
                return images.load(2);
              }
          },
      });
  }
  
})();