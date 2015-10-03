/**
 * palette album Comtroller
 */
app.controller("paletteAlbumController", ['$scope', '$mdSidenav', '$log', 'dialogService', 'albumService', 'pictureService',
    function ($scope, $mdSidenav, $log, dialogService, albumService, pictureService) {

        this.loading = false;
        this.albumsList = [];
        this.selectedListAlbums = {};
        var _this = this;

        this.closeAlbums = function () {
            $mdSidenav('albums-sidenav').close()
                .then(function () {
                    $log.info("close albums-sidenav is done");
                });
        };

        this.refreshAlbums = function () {
            albumService.getAll().then(function (albums) {
                if (albums.length > 0) {
                    initSelectedAlbums(albums[albums.length - 1]);
                    albums.forEach(function (album) {
                        pictureService.getLasts(album.id, 4)
                            .then(function (lastPictures) {
                                album.lastPictures = lastPictures;
                            })
                            .catch(function (err) {
                                $log.error(err);
                            });
                    });
                }
                _this.albumsList = albums;
            })
                .catch(function (err) {
                    $log.error(err);
                });
        };
        this.refreshAlbums();

        $scope.$on('getAlbumSelected', function (event, args) {
            $scope.$broadcast('setAlbumSelected',
                {selectedListAlbums: args.selectedListAlbums}
            );
        });

        $scope.$on('notifyRefreshAlbums', function (event, args) {
            this.refreshAlbums(true);
        });

        $scope.$on('loading', function (event, args) {
            args.load;
        });

        var isInit = true;
        var initSelectedAlbums = function (album) {
            if (isInit) {
                _this.selectedListAlbums[album.id] = album;
                $scope.$emit('emitSelectedListAlbumsEvent',
                    {selectedListAlbums: _this.selectedListAlbums}
                );
                isInit = false;
            }
            ;
        };

        /**
         * Get event to refresh albums list
         */
        $scope.$on('refreshAlbumsList', function ($event, args) {
            _this.refreshAlbums(args.showThem);
        });


        /**
         * Get event for selected Albums List (get event from albumCtlr)
         * Broadcast selected album to pictureCtlr
         */
        $scope.$on('emitSelectedListAlbumsEvent', function ($event, args) {
            // Broadcast the selected album id to the pictures controller
            $scope.$broadcast('broadcastSelectedListAlbumsEvent',
                //{selectedListAlbums: selectedListAlbums[Object.getOwnPropertyNames(selectedListAlbums)]}
                {selectedListAlbums: args.selectedListAlbums}
            );
        });


        /**
         * Inform all controllers the new selected albums list
         */
        $scope.changeSelectedAlbums = function () {
            //$scope.changeSelectedAlbums = function (selectedListAlbums) {
            // Emuit the selected albums list to the toolbar controller
            $scope.$emit('emitSelectedListAlbumsEvent',
                //{selectedListAlbums: selectedlistalbums}
                {selectedListAlbums: $scope.selectedListAlbums}
            );


        }

    }]);


