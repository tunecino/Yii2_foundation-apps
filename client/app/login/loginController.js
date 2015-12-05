(function() {
  'use strict';

  angular
    .module('LoginModule')
    .controller('LoginCtrl', LoginCtrl);


	LoginCtrl.$inject = ['$scope' ,'$state', 'AuthService'];
	function LoginCtrl ($scope, $state, AuthService) {
		var $ = this;

		$.credentials = {};
		$.newUser = $state.current.name === 'signup' ;

    	function login(credentials) {
			AuthService.login(credentials)
			.then(function(response){
				$state.go('images');
			},
			function errorCallback(errors) {
				$scope.form.$invalid = true;
				_.each(errors.data, function(e, key) {
					$scope.form[e.field].$error['server']  = true;
					$scope.form[e.field].$error['message'] = e.message;
				});
			});
		};

		function signup(user) {
			AuthService.signup(user)
			.then(function(response){
				$state.go('images');
			},
			function errorCallback(errors) {
				$scope.form.$invalid = true;
				_.each(errors.data, function(e, key) {
					$scope.form[e.field].$error['server']  = true;
					$scope.form[e.field].$error['message'] = e.message;
				});
			});
		};

		$.submitForm = function() {
	        $.newUser ? signup($.credentials) : login($.credentials);
	    }
	    
	}
  
})();