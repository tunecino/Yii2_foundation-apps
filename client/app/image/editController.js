(function() {
  'use strict';

  angular
    .module('ImageModule')
    .controller('EditCtrl', EditCtrl);


	EditCtrl.$inject = ['Image'];
	function EditCtrl (Image) {
		var $ = this;
		
		$.image = Image.data;
		console.log(Image);

		//$.tags = $.image.getList('tags');
		//console.log($.tags);
	}
  
})();