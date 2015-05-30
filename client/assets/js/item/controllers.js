(function () {
  'use strict';
  var controllers;

  //ContactCtrl.$inject = ['$scope', 'MailContactQuery', 'FoundationApi'];
  ItemCtrl.$inject = ['$scope', '$http', '$filter', '$stateParams', '$state', '$controller'];
  function ItemCtrl($scope, $http, $filter, $stateParams, $state, $controller) {

      //angular.extend(this, $controller('DefaultController', {$scope: $scope, $filter: $filter, $http: $http, $stateParams: $stateParams, $state: $state}));
      
      $scope.currentItem= null;

      $scope.listItems = function () {
        $scope.items = [
          { id: 0, name: "some hard to read french book", category:"french", price: 1.75},
          { id: 1, name: "one more hard to read french book", category:"french", price: 2.75},
          { id: 2, name: "piano tutorials", category:"music", price: 1.00},
          { id: 3, name: "Guarneri del Gesù violin", category:"music", price: 3900000.00}
        ];
        //to make dynamique later
        $scope.categories = [
          { id: 0, name: "french"},
          { id: 1, name: "music"}
        ];
      }

      $scope.deleteItem = function (item) {
        $scope.items.splice($scope.items.indexOf(item),1);
      }

      $scope.createItem = function (item) {
        $scope.items.push(item);
      }

      $scope.updateItem = function (item) {
        for (var i = 0; i < $scope.items.length; i++) {
          if ($scope.items[i].id == item.id) {
            $scope.items[i] = item;
            break;
          }      
        }
      }

      $scope.panelScreen = function (item) {
        //to create or edit existing item
        $scope.currentItem = item ? angular.copy(item) : null;
      }

      $scope.saveEdit = function (item) {
        if (angular.isDefined(item.id)) $scope.updateItem(item);
        else $scope.createItem(item);
        $scope.currentItem = null;
      }

      $scope.cancelEdit = function () {
        $scope.currentItem = null;
      }

      $scope.listItems();
  }

  controllers = {
    ItemCtrl: ItemCtrl
  };

  angular.module('ItemModule').controller(controllers);
}());