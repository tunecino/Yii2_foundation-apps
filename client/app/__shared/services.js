(function() {
  'use strict';

  angular
    .module('SharedModule')
    .service('ConfirmAlert', ConfirmAlert);

  ConfirmAlert.$inject = ['$window'];
  function ConfirmAlert($window){
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
  }
  

})();