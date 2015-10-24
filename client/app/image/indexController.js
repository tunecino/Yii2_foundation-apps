(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	IndexCtrl.$inject = ['Images'];
	function IndexCtrl (Images) {
		var vm = this;
		//vm.title = 'Some Title';
		vm.title = _.max([4, 2, 8, 6]);

		vm.images = Images;

		//vm.images = Image.findAll();
		//vm.images = Image.where({ expand: 'tags', 'per-page':1 });

		// vm.first = function() {
		// 	//vm.images = Image.where({ expand: 'tags' });
		// 	//vm.images.paginate();
	  
	}
  
})();