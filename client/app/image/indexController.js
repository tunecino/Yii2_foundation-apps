(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	//IndexCtrl.$inject = [];

	function IndexCtrl (Image) {
		var vm = this;
		//vm.title = 'Some Title';
		vm.title = _.max([4, 2, 8, 6]);

		vm.images = Image.findAll();

		vm.next = function() {
			vm.images = Image.findAll();
		}
	  
	}
  
})();