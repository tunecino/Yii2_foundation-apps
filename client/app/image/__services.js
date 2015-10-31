(function() {
  'use strict';

  angular
  	.module('ImageModule')
    .factory('imageHelpers', imageHelpers);


  imageHelpers.$inject = ['$q'];
  function imageHelpers($q) {
  	var imageHelpers = {};
  	// credits to @dfsq : http://stackoverflow.com/questions/22423057/angular-js-isimage-check-if-its-image-by-url#answer-22423210
    imageHelpers.isImage = function(src) {
        var deferred = $q.defer();
        var image = new Image();
        image.onerror = function() {deferred.resolve(false)};
        image.onload = function() {deferred.resolve(true)};
        image.src = src;
        return deferred.promise;
    };
    return imageHelpers;
  }
  
})();