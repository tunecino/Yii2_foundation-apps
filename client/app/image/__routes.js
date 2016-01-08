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
            Images: function(Collection) {
              var images = new Collection('images', true);
              images.select(['id','name','url']);
              images.with('tags');
              return images.load(6);
            },
            Restangular: 'Restangular',
            Tags: function(Restangular){
              return Restangular.all('tags').getList();
            },
        },
    };

    var edit = {
        url: '/edit/{id:[0-9]{1,4}}',
        templateUrl: 'templates/image/form.html',
        parent: 'images',
        controllerAs: '$',
        controller: 'FormCtrl',
        resolve: {
            Restangular: 'Restangular',
            Image: function(Restangular, $stateParams){
              return Restangular.one('images', $stateParams.id).get({expand:'uploader'});
            },
            Owners: function(Restangular){
              return Restangular.all('owners').getList({fields:'dns'});
            }
        },
    };

    var add = {
        url: '/add',
        templateUrl: 'templates/image/form.html',
        parent: 'images',
        controllerAs: '$',
        controller: 'FormCtrl',
        resolve: {
            Restangular: 'Restangular',
            Image: function(Restangular){
              return Restangular.one('images');
            },
            Owners: function(Restangular){
              return Restangular.all('owners').getList({fields:'dns'});
            }
        },
    }

    $stateProvider
      .state('images', images)
      .state('edit', edit)
      .state('add', add);
      
  }
  
})();