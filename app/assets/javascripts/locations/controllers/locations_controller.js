// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

app.controller("coordinatesController", ["$scope", "openModalService", function($scope, openModalService) {

	this.waitCoordinates = true;
	this.scopeTripMap = $scope.tripMapCtlr;
	
	this.getCoordinates = function() {
		if (this.scopeTripMap.clickCoordinates != {}) {
			this.coordinates = this.scopeTripMap.clickCoordinates;
	  	this.waitCoordinates = false;
	  	console.log(this.coordinates);
		}
	};

	this.save = function() {
		console.log("save =>");
		$scope.paletteAlbumCtrl.showClickCoordinates = false;
		//TODO passer coordinates en argument pour le service
		var successLocation = function(newLocation) {
			console.log(newAlbum);
			console.log(newLocation);
//TODO			saveLocation(newLocation, newAlbum);
		};
		var errorLocation = function(newLocation) {
			console.log('Modal dismissed close: ' + newLocation);
		};
		openModalService("add", 'assets/template/create_location.html', 'locationCtrl', successLocation, errorLocation);
	};
	this.cancel = function() {
		console.log("cancel =>");
		$scope.paletteAlbumCtrl.showClickCoordinates = false;
	};
}]);

app.controller("locationCtrl", ["$scope", "$modalInstance", function($scope, $modalInstance) {
//		console.log("locationCtrl init");
	$scope.save = function() {
		$modalInstance.close(this.newLocation);
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);

app.factory("saveLocation", ["$http", function($http) {
	return function(newLocation, newAlbum) {
		console.log(newLocation);
		var postResult = $http.post("/locations", newLocation);
		postResult.success(function(data, status, headers, config) {
			console.log("add location success");
			saveAlbum(newAlbum);
		});
		postResult.error(function(data, status, headers, config) {
			console.log("add location error");
			//TODO notif add/update error
		});
	};
}]);

