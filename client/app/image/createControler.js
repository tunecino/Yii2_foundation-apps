(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('CreateCtrl', CreateCtrl);


	//CreateCtrl.$inject = [];
	function CreateCtrl () {
		var $ = this;
		//$.title = 'Some Title';
		$.title = _.max([4, 2, 8, 6]);
	}
  
})();