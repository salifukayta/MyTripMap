// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/**
 * template/picture/picture.html
 */
app.directive('picture', [function(){
	return{
		restrict: 'E',
		templateUrl: 'assets/template/picture/picture.html',
		scope: {
			picture: '=object',
			selectedPictureId: '=selectedPictureId'
		},
		require: '^pictures',
		transclude: true,
		controller: function($scope, dialogService, pictureService) {
			$scope.isSelected = false;
			$scope.filePath = $scope.picture.url.medium;

			this.selectRow = function() {
				if ($scope.selectedPictureId === $scope.picture.id) {
					$scope.selectedPictureId = -1;
				}
				else {
					$scope.selectedPictureId = $scope.picture.id;
				}
			};

			$scope.$watch('selectedPictureId', function(selectedPictureId) {
				$scope.isSelected = $scope.selectedPictureId === $scope.picture.id;
			});
			
			this.showEdit = function(ev) {
				console.log("show edit");
				
				var editing = function(editPicture) {
					console.log("edit click");
					$scope.picturesCtrl.loading = true;
					pictureService.edit(editPicture).then(function(data) {
						console.log("edit picture success");
						$scope.picturesCtrl.loading = false;
						pictureService.uploadPicture(editPicture).progress(function(evt) {
							console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
						}).success(function(data, status, headers, config) {
							console.log("upload picture success");
							$scope.picturesCtrl.loading = false;
						});
					}).catch(function(err) {
						console.log(err);
						$scope.picturesCtrl.loading = false;
					});
					
				};
				var cancelEdit = function(editPicture) {
					console.log("cancel click");
				};
				
		 		params = {
		 			picture: $scope.picture,
		 			operation: "Edit"
		 		};
		 		var templateUrl = "assets/template/picture/update_picture.html";
				dialogService.show(params, templateUrl, 'pictureEditCtrl', editing, cancelEdit, ev);
			};
			
			this.showDelete = function(ev) {
				console.log("show delete");
				var deleting = function(deletePicture) {
					console.log("delete click");
					console.log(deletePicture);
					$scope.picturesCtrl.loading = true;
					pictureService.delete(deletePicture).then(function(data) {
						console.log("delete picture success");
						console.log(data);
						$scope.picturesCtrl.notifyRefreshPictures();
						$scope.picturesCtrl.loading = false;
					}).catch(function(err) {
						console.log(err);
						$scope.picturesCtrl.loading = false;
					});
				};
				var cancelDelete = function(deletePicture) {
					console.log("cancel click");
				};
				
		 		params = {
		 			picture: $scope.picture,
		 			operation: "Delete"
		 		};
		 		var templateUrl = "assets/template/picture/delete_picture.html";
				dialogService.show(params, templateUrl, 'pictureEditCtrl', deleting, cancelDelete, ev);
			};
			
			$scope.$on('setAlbumSelected', function (event, args) {
				$scope.selectedAlbumId = args.selectedAlbumId;
			});
		},
		controllerAs: 'pictureCtrl',
		link: function(scope, element, attrs, picturesCtrl) {
			scope.picturesCtrl = picturesCtrl; 
		}
	};
}]);

