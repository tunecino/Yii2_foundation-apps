(function() {
  'use strict';

  angular
    .module('API')
    .controller('AuthController', AuthController);


	AuthController.$inject = ['$state', '$rootScope', 'AuthService', 'UserService'];
	function AuthController ($state, $rootScope, AuthService, UserService) {
		var $ = this;

	    $.currentUser = UserService.getCurrentUser();
	    
	    $.logout = function() {
	        AuthService.logout()
            .then(function() {
                $state.go('login');
            });
	    }

	    $rootScope.$on('authorized', function() {
	        $.currentUser = UserService.getCurrentUser();
	    });

	    $rootScope.$on('unauthorized', function() {
	    	if ($.currentUser) $.currentUser = null;
	        $state.go('login');
	    });
	}
  
})();