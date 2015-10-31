(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('FormCtrl', FormCtrl);


	FormCtrl.$inject = ['$scope' ,'$state' ,'Image', 'imageHelpers'];
	function FormCtrl ($scope, $state, Image, imageHelpers) {
		var $ = this;

		$.image = Image.data || Image;
		if (typeof $.image.url !== "undefined") $.loadedImage = $.image.url;

		$.pattern = {};
		
		$.submitForm = function() {
			$.image.save().then(function(response){
				$state.go('images', {}, { reload: true });
			},
			function errorCallback(errors) {
				_.each(errors.data, function(e, key) {
					$scope.form[e.field].$error['server']  = true;
					$scope.form[e.field].$error['message'] = e.message;
					$.pattern[e.field] = '^('+$.image[e.field]+'.+|(?!'+$.image[e.field]+').*)$';
				});
			});
		};

		$.loadImage = function() {
			$.loadedImage = null;
			delete $scope.form['url'].$error['isImage'];
			if (!$scope.form.url.$error.url) {
				imageHelpers.isImage($.image.url).then(function(result) {
		            if (result) {
		            	$.loadedImage = $.image.url;
		            	$scope.form.$invalid = false;
		            }
		            else {
		            	$scope.form['url'].$error['isImage']  = true;
		            	$scope.form.$invalid = true;
		            }
		        });
			}      
	    };
	    
	}
  
})();