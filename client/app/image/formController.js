(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('FormCtrl', FormCtrl);


	FormCtrl.$inject = ['$scope' ,'$state' ,'Image', 'imageHelpers', 'Owners', 'ConfirmAlert'];
	function FormCtrl ($scope, $state, Image, imageHelpers, Owners, ConfirmAlert) {
		var $ = this;

		$.owners = Owners.data.plain();

		$.image = Image.data || Image;
		if (typeof $.image.url !== "undefined") $.loadedImage = $.image.url;

		$.pattern = {};

		$.submitForm = function() {
			$.image.update = 'start';
			$.image.save().then(function(response){
				$.image.update = 'success';
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
				$.image.update = 'fail';
				if (_.isArray(errors.data)) {
					console.log('err',errors);
					_.each(errors.data, function(e, key) {
						$scope.form[e.field].$error['server']  = true;
						$scope.form[e.field].$error['message'] = e.message;
						$.pattern[e.field] = '(?!^'+helpers.preg_quote($.image[e.field])+'$)(^.*$)';
					});
				}
			});
		};


		$.loadImage = function() {
			$.loadedImage = null;
			delete $scope.form['url'].$error['content'];
			$scope.form.$invalid = true;
			if ($.image.url && !$scope.form.url.$error.url) {
				// let the ring loader spin untel checking if the url endpoint content is an image
				$.loadedImage = './assets/img/ring.svg';
				imageHelpers.isImage($.image.url).then(function(result) {
		            if (result) {
		            	$.loadedImage = $.image.url;
		            	$scope.form['url'].$error = {};
		            	// declare form valid only if no errors with 'name' attribute
		            	if (_.isEmpty($scope.form['name'].$error)) $scope.form.$invalid = false;
		            }
		            else {
		            	$scope.form['url'].$error['content'] = true;
		            	$.loadedImage = null;
		            }
		        });
			}      
	    };


	    $.delete = function() {
	    	if( ConfirmAlert.showPopup('Really delete this ?') ) {
	        	$.image.remove().then(function(){
	        		$state.go('images', {}, { reload: true });
	        	});
	        }
	    }
	    
	}
  
})();