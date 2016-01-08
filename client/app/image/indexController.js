(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	IndexCtrl.$inject = ['$scope', 'Images','Tags','Restangular'];
	function IndexCtrl ($scope, Images, Tags, Restangular) {
		var $ = this;

		$.images = Images;
		$.tags = Tags.data.plain();

		var imagesBackup = [];

		$.tagsFilter = [];
		
		// needed by ng-option
		$.range = function(limit) { 
			//return _.range(limit).map(function (i) { return 'Page ' + (i+1) });
			var x = [];
		    for (var i = 1; i <= limit; i++) { x[i] = 'Page '+ i };
		    return x;
		}
		
		$scope.$watch('$.images.meta().$currentPage', function(current, original) {
			$.page = current.toString();
	    });

		$.updateTagFilter = function(tag_id) {
			if (tag_id === null) {
				$.tagsFilter = [];
				$.images.where({tag_id: ''});
			}
			else {
				var index = _.indexOf($.tagsFilter, tag_id);
				if (index === -1) $.tagsFilter.push(tag_id);
				else $.tagsFilter.splice(index, 1);
				$.images.where({tag_id: $.tagsFilter.join()});
			}
		}

		$.isFilteredTag = function(tag_id) {
			return _.indexOf($.tagsFilter, tag_id) > -1;
		}

		$.isRelated = function(image,tag) {
			return _.some(image.tags,'id',tag.id)
		}

		$.toggle = function(image,tag) {
			delete image.update;
			// backup first to cancel changes when needed
			if (!_.some(imagesBackup,'id',image.id)) imagesBackup.push(angular.copy(image));
			image.dirty = true;
			if ($.isRelated(image,tag)) {
				_.remove(image.tags, function(n){ return n.id === tag.id });
			}
			else image.tags.push(tag);
		}

		$.cancel = function(image) {
			rollBack(image);
			return 'image';
		}

		$.save = function(image) {
			image.update = 'start';
			var ids = _.pluck(image.tags, 'id').join();

			if(ids.length) {
				var link = Restangular.one('images', image.id).several('tags',ids);
				link.customPUT().then(function() {
					var newTags = angular.copy(image.tags);
					rollBack(image);
					image.tags = newTags;
					image.update = 'success';
				}, function(error) {
		            console.log(error);
		            rollBack(image);
		            image.update = 'fail';
		        });
		    }

		    else {
		    	var link = Restangular.one('images', image.id).all('tags');
		    	link.customDELETE().then(function(){
					rollBack(image);
					image.tags = [];
					image.update = 'success';
				}, function(error) {
		            console.log(error);
		            rollBack(image);
		            image.update = 'fail';
		        });
		    }
		}

		$.flip = function() {}

		var rollBack = function(image) {
			delete image.dirty;
			var original = _.find(imagesBackup, _.matchesProperty('id', image.id));
			if (original) {
				image.tags = original.tags;
				_.remove(imagesBackup, function(n){ return n.id === image.id });
			}
		}
	  
	}
  
})();