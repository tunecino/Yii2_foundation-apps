(function () {
  'use strict';
  var controllers;

  //ContactCtrl.$inject = ['$scope', 'MailContactQuery', 'FoundationApi'];
  ImageCtrl.$inject = ['$scope', '$http', '$filter', '$stateParams', '$state', '$controller','RestImageQuery', 'popupService'];
  function ImageCtrl($scope, $http, $filter, $stateParams, $state, $controller, RestImageQuery, popupService) {

      //angular.extend(this, $controller('DefaultController', {$scope: $scope, $filter: $filter, $http: $http, $stateParams: $stateParams, $state: $state}));
      
      var limit = 7;
      $scope.page = 1;

      $scope.listImages = function() {
        RestImageQuery.getAll(limit,$scope.page).then(function(images) {
          $scope.images = images;
          console.log($scope.images);
          console.log($scope.images._meta);
        });
      };

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

      $scope.listImages();
  }


  PanelCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$stateParams', '$state', '$controller','RestImageQuery', 'FoundationApi'];
  function PanelCtrl($scope, $rootScope, $http, $filter, $stateParams, $state, $controller, RestImageQuery, fa) {
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