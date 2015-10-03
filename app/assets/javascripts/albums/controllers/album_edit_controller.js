// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/**
 * Controller to add and delete template
 * 
 * template/album/update_album.html Controller
 * template/album/delete_album.html Controller
 */
app.controller("albumEditCtrl", ["$scope", "$mdDialog", "album", "operation", 
		function($scope, $mdDialog, album, operation) {
	$scope.currentAlbum = album;
	$scope.operation = operation;
	console.log("albumEditCtrl init " + album);
	$scope.save = function() {
		$mdDialog.hide(this.currentAlbum);
	};
	$scope.cancel = function() {
		$mdDialog.cancel(this.currentAlbum);
	};
}]);

/**
 * Controller to add and add template
 * 
 * template/album/update_album.html Controller
 */
app.controller("albumAddCtrl", ["$scope", "$mdDialog", "operation", 
		function($scope, $mdDialog, operation) {
	$scope.operation = operation;
	console.log("albumAddCtrl init ");
	$scope.save = function() {
		$mdDialog.hide(this.currentAlbum);
	};
	$scope.cancel = function() {
		$mdDialog.cancel(this.currentAlbum);
	};
}]);
