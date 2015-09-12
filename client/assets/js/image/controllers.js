(function () {
  'use strict';
  var controllers;

 /***
   *
   *  Image Controller
   *
  ***/

  ImageCtrl.$inject = [
    '$scope', 
    '$http', 
    '$filter', 
    '$stateParams', 
    '$state', 
    '$controller',
    'RestImageQuery',
    'popupService',
    'Images',
    'Model',
    'restmod'
  ];

  function ImageCtrl($scope, $http, $filter, $stateParams, $state, $controller, RestImageQuery, popupService, Images, Model, restmod) {

      //angular.extend(this, $controller('DefaultController', {$scope: $scope, $filter: $filter, $http: $http, $stateParams: $stateParams, $state: $state}));
      
      //console.log(Images.$pending);
      //var images = Images.$find(2);
      var images = Images.$search({ expand: 'tags', 'per-page': 1});

      var oneImage = Images.$find(1);

      console.log(oneImage);

      oneImage.$then(function(data) { 
        $scope.test =  data;
        //console.log(data.$page);
        //var tt = data;
        console.log($scope.test.title);
        

      });

      images.$then(function(data) { 
        $scope.images =  data.$encode();
        //console.log(data.$page);
        console.log(data);
      });



      // var images = Images.$collection({ expand: 'tags', 'per-page': 1});
      // images.$on('after-fetch-many', function(_response) {
      //   //var headers = _response.headers('X-Pagination-Current-Page');
      //   console.log(_response.$encode());
      // });

      // images.$fetch();

      //console.log(Images.$pending);

      //$scope.test =  images;





      //console.log(images);

      //var mm = restmod.model('/images');
      //var aa = mm.$find(1);
      //console.log(images);
      //console.log(aa.response.data);

      $scope.listImages = function() {
        RestImageQuery.getAll(limit,$scope.page).then(function(images) {
          $scope.images = images;
          //console.log($scope.images);
          //console.log($scope.images._meta);
        });
      };

      $scope.tt = function() {
        //$scope.test = Images.getOne(1);
        //Images.firstPage().then(function(data) {
        Images.test().then(function(data) {
          $scope.test = data;
          $scope.images = data;
          $scope.totalCount  = Images.totalCount  = data._meta.totalCount;
          $scope.pageCount   = Images.pageCount   = data._meta.pageCount;
          $scope.currentPage = Images.currentPage = data._meta.currentPage;
          $scope.perPage     = Images.perPage     = data._meta.perPage;

          $scope.test2 = 
            '[' + $scope.totalCount + ']' +
            '[' + $scope.pageCount + ']'+
            '[' + $scope.currentPage + ']'+
            '[' + $scope.perPage + ']' ;



          Images.totalPages = data._meta.pageCount;
          $scope.totalPages = Images.totalPages;
          //console.log(data);
          //console.log($scope.test._meta.pageCount);

        });

                  
      };

        $scope.tt2 = function() {
          var aa = new Model('images');
          //console.log(aa);
        



          $scope.test = aa.$object;
          // Model.getOne(2).then(function(data) {
          //   $scope.test = data;
          // });

                  
      };

      //$scope.tt();
      //$scope.tt2();

      $scope.currentImage= null;

      $scope.deleteImage=function(image){
        if(popupService.showPopup('Really delete this?')){
          console.log('start deleting');
          image.remove().then(function() {
              $scope.images = _.without($scope.images, _.findWhere($scope.images, {id: image.id}));
              console.log('deleted where id = '+image.id);
              $state.go('images');
          });
        }
      }

      // $scope.deleteImage = function (image) {
      //   $scope.images.splice($scope.images.indexOf(image),1);
      // }

      $scope.createImage = function (image) {
        $scope.images.push(image);
      }

      $scope.updateImage = function (image) {
        for (var i = 0; i < $scope.images.length; i++) {
          if ($scope.images[i].id == image.id) {
            $scope.images[i] = image;
            break;
          }      
        }
      }

      $scope.panelScreen = function (image) {
        //to create or edit existing image
        $scope.currentImage = image ? angular.copy(image) : null;
      }

      $scope.saveEdit = function (image) {
        if (angular.isDefined(image.id)) $scope.updateImage(image);
        else $scope.createImage(image);
        $scope.currentImage = null;
      }

      $scope.cancelEdit = function () {
        $scope.currentImage = null;
      }

      //$scope.listImages();
  }



 /***
   *
   *  Panel Controller
   *
  ***/
  
  PanelCtrl.$inject = [
    '$scope', 
    '$rootScope', 
    '$http', 
    '$filter', 
    '$stateParams', 
    '$state', 
    '$controller',
    'RestImageQuery', 
    'FoundationApi'
  ];

  function PanelCtrl($scope, $rootScope, RestImageQuery) {
    $scope.test = 'it works';
    $scope.make = function() {
      $rootScope.loading = true;
    }
  }

  controllers = {
    ImageCtrl: ImageCtrl,
    PanelCtrl: PanelCtrl
  };

  angular.module('ImageModule').controller(controllers);
}());