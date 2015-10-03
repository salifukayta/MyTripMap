// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/**
 * template/picture/pictures.html
 */
app.directive('pictures', [function(){
	return{
		restrict: 'E',
		templateUrl: 'assets/template/picture/pictures.html',
		transclude: true,
		scope: {
			notify:'=notify',
			pictures:'=pictures'
		},
		controller: function($scope) {
			this.loading = false;
			console.log("pictures controller init");
			var palettePicturesScope = $scope;
			this.notifyRefreshPictures = function() {
				palettePicturesScope.notify = true;
			};
		},
		controllerAs: 'picturesCtrl'
	};
}]);
