(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('IndexCtrl', IndexCtrl);


	//IndexCtrl.$inject = [];

	function IndexCtrl () {
		var vm = this;
		vm.title = 'Some Title';
		vm.doSomething = doSomething;

		var doSomething = function () {};
	  
	}


	// MainCtrl.resolve = {
	//   doSomething: function (SomeService) {
	//     return SomeService.doSomething();
	//   }
	// };
  
})();