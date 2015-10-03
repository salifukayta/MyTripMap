/**
 * Created by Salifukayta on 02/09/2015.
 */

app.controller("toolbarController", ['$scope', '$mdSidenav', '$log', 'dialogService', 'albumService', 'pictureService', function ($scope, $mdSidenav, $log, dialogService, albumService, pictureService) {

    this.loading = false;
    this.selectedListAlbums = [];
    var _this = this;

    /**
     * Return the selected albums names
     *
     * @returns {boolean}
     */
    this.selectedAlbumsNames = function() {
        var selectedAlbumsNames = "";
        for (var key in _this.selectedListAlbums) {
            selectedAlbumsNames = selectedAlbumsNames + _this.selectedListAlbums[key].name + ", ";
        }
        return selectedAlbumsNames.substring(0, selectedAlbumsNames.length - 2);
    };

    /**
     * Return true if an album is selected
     *
     * @returns {boolean}
     */
    this.hasSelectedAlbums = function() {
        return Object.getOwnPropertyNames(_this.selectedListAlbums).length > 0;
    };

    /**
     * Return true if an album is selected
     *
     * @returns {boolean}
     */
    this.hasOneSelectedAlbum = function() {
        return Object.getOwnPropertyNames(_this.selectedListAlbums).length == 1;
    };

    /**
     * Show albums in right side nav view
     */
    this.showAlbums = function () {
        $mdSidenav('albums-sidenav').toggle().then(function () {
            $log.info("toggle albums-sidenav is done");
        });
    };

    /**
     * Show dialog view to add an album
     *
     * @param $event
     */
    this.showAddAlbum = function ($event) {
        $log.info("add click");
        var adding = function (newAlbum) {
            $log.info("save click");
            _this.loading = true;
            albumService.add(newAlbum)
                .then(function (data) {
                    $log.debug("add album success: " + angular.toJson(data));
                    _this.loading = false;
                    _this.doRefreshAlbums(true);
                }).
                catch(function (err) {
                    _this.loading = false;
                    $log.error(err);
                });
        };

        var cancelAdd = function (newAlbum) {
            $log.info("cancel click");
        };

        var templateUrl = "assets/template/album/update_album.html";
        var params = {operation: "Add"};
        var templateCtrl = "albumAddCtrl";
        dialogService.show(params, templateUrl, templateCtrl, adding, cancelAdd, $event);
    };

    /**
     * Emit an event to refresh albums
     */
    this.doRefreshAlbums = function (showThem) {
        $scope.$broadcast('refreshAlbumsList', {showThem : showThem});
    };

    /**
     * Emit an event to show pictures in bottom sheet view
     *
     * @param $event
     */
    this.doShowPictures = function ($event) {
        $scope.$broadcast('showPicturesList', {});
    };

    /**
     * Show add pictures
     *
     * @param $event
     */
    this.showAddPictures = function($event) {
        $log.info("add click");

        var adding = function(newPicture) {
            $log.debug("save click " + angular.toJson(newPicture));
            _this.loading = true;
            newPicture.albumId = $scope.selectedAlbumId;

            pictureService.globalUpdate(newPicture)
                .then( function(data) {
                    _this.loading = false;
                    _this.DoRefreshPictures(true);
                }).catch(function(err) {
                    _this.loading = false;
                });
        };

        var cancelAdd = function(returnData) {
            // {"action":"pickLocation", "currentPicture": $scope.currentPicture}
            if (returnData !== undefined && returnData.action == "pickLocation") {
                // request clic location from map
                $scope.$emit('locationRequestFromMap',
                    { currentPicture: returnData.currentPicture }
                );
            } else {
                $log.info("cancel click");
            }
        };

        var templateUrl = "assets/template/picture/update_picture.html";
        var params = {
            picture: {hasLocationInfo : false, file : undefined, url : {}},
            operation: "Add"
        };
        var templateCtrl = "pictureManagerCtrl";
        dialogService.show(params, templateUrl, templateCtrl, adding, cancelAdd, $event);
    };

    /**
     * Emit an event to refresh pictures
     */
    this.DoRefreshPictures = function (showThem) {
        $scope.$broadcast('refreshPicturesList', {showThem : showThem});
    };

    /**
     * Get event for selected List Albums Id (get event from albumCtlr)
     */
    $scope.$on('emitSelectedListAlbumsEvent', function ($event, args) {
        _this.selectedListAlbums = args.selectedListAlbums;
    });

}]);
