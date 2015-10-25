(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	IndexCtrl.$inject = ['Images'];
	function IndexCtrl (Images) {
		var $ = this;
		//$.title = 'Some Title';
		$.title = _.max([4, 2, 8, 6]);

		$.images = Images;

		//$.images = Image.findAll();
		//$.images = Image.where({ expand: 'tags', 'per-page':1 });

		// $.first = function() {
		// 	//$.images = Image.where({ expand: 'tags' });
		// 	//$.images.paginate();
	  
	}
  
})();