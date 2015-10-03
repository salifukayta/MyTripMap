// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

/**
 * template/album/album.html
 */
app.directive('album', [function(){
	return{
		restrict: 'E',
		templateUrl: 'assets/template/album/album.html',
		scope: {
			album: '=object',
            selectedListAlbums: '=selectedListAlbums',
		},
		transclude: true,
		controller: function($scope, $log, dialogService, albumService) {
            $scope.isSelected = !angular.isUndefined($scope.selectedListAlbums[$scope.album.id]);

            /**
             * Select the album, and emit the selected List Albums Id
             *
             * @param $event
             */
            $scope.selectRow = function($event) {
                //var indexCurrentAlbum = $scope.selectedListAlbums.indexOf($scope.album);
                //console.log("indexCurrentAlbum= " + indexCurrentAlbum);
                if ($scope.isSelected) {
                    delete $scope.selectedListAlbums[$scope.album.id];
				} else if ($event.ctrlKey) {
                    $scope.selectedListAlbums[$scope.album.id] = $scope.album;
				} else {
                    $scope.selectedListAlbums = {};
                    $scope.selectedListAlbums[$scope.album.id] = $scope.album;
                }
                $scope.isSelected = !angular.isUndefined($scope.selectedListAlbums[$scope.album.id]);
                console.log("isSelected= " + $scope.isSelected);

                $scope.$emit('emitSelectedListAlbumsEvent',
                    {selectedListAlbums: $scope.selectedListAlbums}
                );
			};

			$scope.$watch('selectedListAlbums', function(newSelectedListAlbums, oldSelectedListAlbums) {
				if ( newSelectedListAlbums !== oldSelectedListAlbums ) {
					$scope.selectedListAlbums = newSelectedListAlbums;
                    $scope.isSelected = !angular.isUndefined($scope.selectedListAlbums[$scope.album.id]);
				}
			});

            $scope.showEdit = function(ev) {
				$log.info("show edit");
				var editing = function(editAlbum) {
					$log.info("edit click");
					$scope.$emit('loading', 
						{ load: true }
					);
					albumService.edit(editAlbum).then(function(editedAlbum) {
						$log.debug("edit album success: " + JSON.stringify(editedAlbum));
						$scope.$emit('loading', 
							{ load: false }
						);
					}).catch(function(err) {
						$log.error(err);
						$scope.$emit('loading', 
							{ load: false }
						);
					});
				};
				var cancelEdit = function(editAlbum) {
					$log.info("cancel click");
				};
				
		 		var params = {
		 			album: $scope.album,
					operation: "Edit"
		 		};
		 		var templateUrl = "assets/template/album/update_album.html";
				dialogService.show(params, templateUrl, 'albumEditCtrl', editing, cancelEdit, ev);
			};

            $scope.showDelete = function(ev) {
				$log.info("show delete");
				var deleting = function(deleteAlbum) {
					$log.info("save click");
					$scope.$emit('loading', 
						{ load: true }
					);
					albumService.delete(deleteAlbum).then(function(deletedAlbum) {
						$log.debug("delete album success: " + JSON.stringify(deletedAlbum));
						$scope.$emit('notifyRefreshAlbums', { } );
						$scope.$emit('loading', 
							{ load: false }
						);
					}).catch(function(err) {
						$log.error(err);
						$scope.$emit('loading', 
							{ load: false }
						);
					});
				};
				var cancelDelete = function(deleteAlbum) {
					$log.info("cancel click");
				};
				
		 		var params = {
		 			album: $scope.album,
					operation: "Delete"
		 		};
		 		var templateUrl = "assets/template/album/delete_album.html";
				dialogService.show(params, templateUrl, 'albumEditCtrl', deleting, cancelDelete, ev);
			};
		},
		controllerAs: 'albumCtrl',
		link: function(scope, element, attrs, paletteAlbumCtrl) {
			scope.paletteAlbumCtrl = paletteAlbumCtrl;
		}
	};
}]);
