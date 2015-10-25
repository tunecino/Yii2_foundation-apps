(function() {
  'use strict';

  angular
    .module('ImageModule')
    .config(route);


  route.$inject = ['$stateProvider', '$urlRouterProvider'];
  function route($stateProvider, $urlRouterProvider) {

    var images = {
        url: '/images',
        templateUrl: 'templates/image/index.html',
        controllerAs: '$',
        controller: 'IndexCtrl',
        resolve: {
            Collection: 'Collection',
            Images: function(Collection){
              var images = new Collection('images', true);
              //images.select(['id','url']);
              images.with('tags');
              return images.load(2);
            }
        },
    };

    var edit = {
        url: '/edit/{id:[0-9]{1,4}}',
        templateUrl: 'templates/image/edit.html',
        parent: 'images',
        controllerAs: '$',
        controller: 'EditCtrl',
        resolve: {
            Collection: 'Collection',
            Image: function(Restangular, $stateParams){
              console.log('resolving id',$stateParams.id);
              return Restangular.one('images', $stateParams.id).get();
            }
        },
    };

    var add = {
        url: '/add',
        templateUrl: 'templates/image/create.html',
        parent: 'images',
        controllerAs: '$',
        controller: 'CreateCtrl'
    }

    $stateProvider
      .state('images', images)
      .state('edit', edit)
      .state('add', add);
      
  }
  
})();