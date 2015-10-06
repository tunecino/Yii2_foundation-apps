(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	IndexCtrl.$inject = ['Images', 'Tags', 'Owners'];
	function IndexCtrl (Images, Tags, Owners) {
		var vm = this;
		//vm.title = 'Some Title';
		vm.title = _.max([4, 2, 8, 6]);

		//vm.images = Image.findAll();
		//vm.images = Image.where({ expand: 'tags', 'per-page':1 });

		vm.next = function() {
			//vm.images = Image.where({ expand: 'tags' });
			//vm.images.paginate();
			vm.images = Images.getList();
		}
	  
	}
  
})();