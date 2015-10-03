
/**
 * template/map/bandeau_information.html
 */
app.directive('bandeauInformation', [function(){
	return{
		restrict: 'E',
		templateUrl: 'assets/template/map/bandeau_information.html',
		scope: {
			pictureToUpload: '=',
		},
		transclude: true,
		controller: function($scope) {
			var scope = this;
			console.log("bandeauInformation init");
			
			$scope.confirmLocation = function($event) {
				console.log("notify locationRespondeReadyFromMap");
				console.log($scope.pictureToUpload);
				$scope.$emit('locationRespondeReadyFromMap',
					//TODO put this string on enum
						{ currentPicture: $scope.pictureToUpload,
							action: "confirm"}
				);
			};

			$scope.confirmAndSave = function($event) {
				console.log("notify locationRespondeReadyFromMap");
				console.log($scope.pictureToUpload);
				$scope.$emit('locationRespondeReadyFromMap',
					{ currentPicture: $scope.pictureToUpload,
						action: "save"}
				);
			}
		}
	};
}]);