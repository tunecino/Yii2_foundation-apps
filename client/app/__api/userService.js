(function() {
  'use strict';

  angular
    .module('API')
    .service('UserService', UserService);

  UserService.$inject = ['locker', 'HTTPCache'];
  function UserService(locker, HTTPCache){

    var service = this,
        currentUser = null,
        driver = 'session';

    service.setCurrentUser = function(user) {
        if (!user) {
          HTTPCache.remove();
          currentUser = null;
          locker.driver(driver).clean();
        }
        else {
          currentUser = user;
          locker.driver(driver).put('user', user);
        }
        return currentUser;
    };

    service.getCurrentUser = function() {
        if (!currentUser) {
            currentUser = locker.driver(driver).get('user');
            if (!currentUser) {
              service.switchDriver('local');
              currentUser = locker.driver(driver).get('user');
            }
        }
        return currentUser;
    };

    service.switchDriver = function(newDriver) {
      if (driver !== newDriver) {
        locker.empty();
        driver = newDriver;
      }
    };

    service.updateCurrentUser = function(token) {
        if (!currentUser) {
            currentUser = service.getCurrentUser();
        }
        currentUser.access_token = token.access_token;
        currentUser.expires_at = token.expires_at;
        service.setCurrentUser(currentUser);
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