(function () {
  'use strict';
  var controllers;

  //ContactCtrl.$inject = ['$scope', 'MailContactQuery', 'FoundationApi'];
  ItemCtrl.$inject = ['$scope', '$http', '$filter', '$stateParams', '$state', '$controller','RestItemQuery'];
  function ItemCtrl($scope, $http, $filter, $stateParams, $state, $controller, RestItemQuery) {

      //angular.extend(this, $controller('DefaultController', {$scope: $scope, $filter: $filter, $http: $http, $stateParams: $stateParams, $state: $state}));
      
      var limit = 7;
      $scope.page = 1;

      $scope.listItems = function() {
        RestItemQuery.getAll(limit,$scope.page).then(function(items) {
          $scope.items = items;
          console.log($scope.items);
          console.log($scope.items._meta);
        });
      };

      $scope.currentItem= null;

      // $scope.listItems = function () {
      //   $scope.items = [
      //     { id: 0, name: "some hard to read french book", category:"french", price: 1.75},
      //     { id: 1, name: "one more hard to read french book", category:"french", price: 2.75},
      //     { id: 2, name: "piano tutorials", category:"music", price: 1.00},
      //     { id: 3, name: "Guarneri del Gesù violin", category:"music", price: 3900000.00}
      //   ];
      //   //to make dynamique later
      //   $scope.categories = [
      //     { id: 0, name: "french"},
      //     { id: 1, name: "music"}
      //   ];
      // }

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


  PanelCtrl.$inject = ['$scope', '$rootScope', '$http', '$filter', '$stateParams', '$state', '$controller','RestItemQuery', 'FoundationApi'];
  function PanelCtrl($scope, $rootScope, $http, $filter, $stateParams, $state, $controller, RestItemQuery, fa) {
    $scope.test = 'fuck off';
    $scope.make = function() {
      $rootScope.loading = true;
    }


  }

  controllers = {
    ItemCtrl: ItemCtrl,
    PanelCtrl: PanelCtrl
  };

  angular.module('ItemModule').controller(controllers);
}());