/**
 * palette picture Comtroller
 */
app.controller("palettePictureController", ["$scope", "$mdBottomSheet", "$log", "dialogService", "pictureService",
    function ($scope, $mdBottomSheet, $log, dialogService, pictureService) {

        this.loading = false;
        this.picturesList = [];
        var _this = this;
        $scope.selectedListAlbums = {};

        this.refreshPictures = function (showThem) {
            $log.debug("notifying pictures list with Albums=" +  angular.toJson($scope.selectedListAlbums));
            if ($scope.selectedListAlbums !== {}) {
                _this.picturesList = [];
                for (var key in $scope.selectedListAlbums) {
                    pictureService.getAll(key)
                        .then(function (pictures) {
                            $log.info("getAll pictures success ");// + JSON.stringify(pictures));
                             _this.picturesList = _this.picturesList.concat(pictures);
                            // send pictures to map
                            $scope.$emit('picturesToMap',
                                {pictures: _this.picturesList}
                            );
                            if (showThem) {
                                _this.showPictures();
                            }
                        })
                        .catch(function (err) {
                            $log.error(err);
                        });
                }
            }
            else {
                _this.picturesList = [];
            }
        };
        this.refreshPictures(false);

        $scope.$on('locationRespondeFromMap', function (event, args) {
            $log.info("repoop album view add/update");
            if (args.action === "confirm") {
                showAdd(event, args.currentPicture);
            } else if (args.action === "save") {
                adding(args.currentPicture);
            }
        });

        /**
         * show pictures list
         *
         * @param $event
         */
        this.showPictures = function ($event) {
            $mdBottomSheet.show({
                templateUrl: 'assets/template/picture/picture.html',
                controller: 'pictureSheetCtrl',
                controllerAs: 'pictureCtrl',
                targetEvent: $event,
                locals: {"pictures": _this.picturesList}
            }).then(function (clickedItem) {
                $log.info(clickedItem.name +  "clicked!");
            });
        };

        /**
         * Get event to refresh pictures list
         */
        $scope.$on('refreshPicturesList', function ($event, args) {
            _this.refreshPictures(args.showThem);
        });

        /**
         * Get event to show pictures list
         */
        $scope.$on('showPicturesList', function ($event, args) {
            _this.showPictures($event);
        });

        /**
         * Get selected albums list event
         */
        $scope.$on('broadcastSelectedListAlbumsEvent', function($event, args) {
            $log.info("refresh pictures list after album select");
            $scope.selectedListAlbums = args.selectedListAlbums;
            _this.refreshPictures(true);
        })

    }]);