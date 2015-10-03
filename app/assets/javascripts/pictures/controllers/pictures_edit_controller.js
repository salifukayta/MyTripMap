/**
 * Controller to add and delete template
 *
 * template/picture/updatePicture.html Controller
 * template/picture/deletePicture.html Controller
 */
app.controller("pictureManagerCtrl", ["$scope", "$mdDialog", "fileService", "picture", "operation",
    function ($scope, $mdDialog, fileService, picture, operation) {
        $scope.operation = operation;
        $scope.currentPicture = picture;
        $scope.isOnEdit = false;

        $scope.save = function () {
            $mdDialog.hide($scope.currentPicture);
        };

        $scope.cancel = function () {
            $mdDialog.cancel($scope.currentPicture);
        };

        $scope.selectFileUpload = function ($file) {
            $scope.currentPicture.file = $file[0];

            fileService.getPicture($scope.currentPicture.file, $scope)
                .then(function(result) {
            		$scope.currentPicture.url.medium = result;
                });

            loadImage.parseMetaData(
                $scope.currentPicture.file,
                function (data) {
                    if (data.exif !== undefined && data.exif.getAll() !== undefined
                            && data.exif.getAll()["GPSLatitude"] !== undefined) {
                        $scope.currentPicture.hasLocationInfo = true;
                    } else {
                        $scope.currentPicture.hasLocationInfo = false;
                    }
                    $scope.$apply();
                }
            );
        };

        $scope.isPickLocationActive = function () {
            return !$scope.currentPicture.hasLocationInfo && ($scope.currentPicture.file !== undefined);
        };


        $scope.pickLocation = function ($event) {
            $mdDialog.cancel({"action": "pickLocation", "currentPicture": $scope.currentPicture});
        };

        $scope.switchOnEditTitle = function () {
            $scope.isOnEdit = !$scope.isOnEdit;
        };
    }
]);

