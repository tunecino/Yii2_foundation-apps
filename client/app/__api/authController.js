(function() {
  'use strict';

  angular
    .module('API')
    .controller('AuthController', AuthController);


	AuthController.$inject = ['$state', '$rootScope', 'AuthService', 'UserService', 'FoundationApi'];
	function AuthController ($state, $rootScope, AuthService, UserService, FoundationApi) {
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

	    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if ($.currentUser && _.includes(['login','signup','recovery'], toState.name)) {
				FoundationApi.publish('main-notifications', {
					content: 'you are already logged in !',
					color: 'info', 
					autoclose: 2000
	            });
				event.preventDefault();
			}
		});
	}
  
})();