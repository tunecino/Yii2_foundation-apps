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
				// if saved try to find obj by id in $parent images
				var obj = _.findWhere($scope.$parent.$.images,{id:response.data.id});
				// not found means is NewRecord -> just go back & update
				if (_.isUndefined(obj)) $state.go('images', {}, { reload: true });
				else {
					// object updated on server -> manually update parent collection & go back
					_.assign(obj, response.data.plain());
					$state.go('images');
				}
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
			if ($.image.url && !$scope.form.url.$error.url) {
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