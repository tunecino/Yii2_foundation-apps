(function () {
	'use strict';
	var controllers;

	AppCtrl.$inject = ['$scope'];
	function AppCtrl($scope) {
		// This is a shared controller because its the application parent controller
	}

	controllers = {
		AppCtrl: AppCtrl
	};

	angular.module('SharedModule').controller(controllers);
})