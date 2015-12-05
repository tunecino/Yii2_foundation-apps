(function() {
  'use strict';

  angular
    .module('LoginModule')
    .controller('RecoveryCtrl', RecoveryCtrl);


	RecoveryCtrl.$inject = ['$scope' ,'$stateParams', 'AuthService'];
	function RecoveryCtrl ($scope, $stateParams, AuthService) {
		var $ = this;

		$.email = '';
		$.serverResponse = '';
		$.step = 'beforeRequest';

		var token = $stateParams.token.length > 42 ? $stateParams.token : false;
		if (token) $.step = 'beforeUpdate';

    	function request(email) {
			AuthService.requestResetPass({email})
			.then(function(response){
				$.step = 'afterRequest';
				$.serverResponse = response.data.success;
			},
			function errorCallback(errors) {
				console.log('errors',errors);
				$scope.form.$invalid = true;
				_.each(errors.data, function(e, key) {
					$scope.form[e.field].$error['server']  = true;
					$scope.form[e.field].$error['message'] = e.message;
				});
			});
		};

		function reset(password, token) {
			AuthService.resetPass({'password':password ,'token': token})
			.then(function(response){
				$.step = 'afterUpdate';
				$.serverResponse = response.data.success;
			},
			function errorCallback(errors) {
				$scope.form.$invalid = true;
				$scope.form['password'].$error['server']  = true;
				$scope.form['password'].$error['message'] = errors.data.message;
			});
		};

		$.submitForm = function() {
	        token ? reset($.newPassword, token) : request($.email);
	    }
	    
	}
  
})();