(function() {
  'use strict';

  angular
    .module('API')
    .service('UserService', UserService);

  UserService.$inject = ['store', 'HTTPCache'];
  function UserService(store, HTTPCache){

    var service = this,
        currentUser = null;

    service.setCurrentUser = function(user) {
        if (!user) HTTPCache.remove();
        currentUser = user;
        store.set('user', user);
        return currentUser;
    };

    service.getCurrentUser = function() {
        if (!currentUser) {
            currentUser = store.get('user');
        }
        return currentUser;
    };

    service.updateCurrentUser = function(token) {
        if (!currentUser) {
            currentUser = store.get('user');
        }
        currentUser.access_token = token.access_token;
        currentUser.expires_at = token.expires_at;
        store.set('user', currentUser);
    };

    service.isLogged = function() {
      var unix = Math.round(Date.now()/1000);
      var logged = currentUser
                   && currentUser.expires_at 
                   && currentUser.expires_at > unix;
      if (!logged) HTTPCache.remove();
      else console.log('access_token expires_in :', currentUser.expires_at - unix)
      return logged;
    };

  }
  

})();