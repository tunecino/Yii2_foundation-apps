(function () {
	'use strict';
	
	angular.module('SharedModule', [ /* Dependencies to be shared everywhere */ ])

	.service('popupService',function($window) {
	  this.showPopup=function(message){
	    return $window.confirm(message);
	  }
	});

})