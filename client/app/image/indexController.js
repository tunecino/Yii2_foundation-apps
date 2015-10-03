(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	//IndexCtrl.$inject = [];

	function IndexCtrl (Img) {
		var vm = this;
		//vm.title = 'Some Title';
		vm.title = _.max([4, 2, 8, 6]);

		var image = Img.findAll();
	  
	}
  
})();