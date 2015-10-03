'use strict';

app.factory('pictureService', ['$q', '$http', '$upload', "$log", 'apiRootAlbum', 'apiRootUpload', "apiPrefixPicture",
    "locationProcessService", "locationCrudService",
    function ($q, $http, $upload, $log, apiRootAlbum, apiRootUpload, apiPrefixPicture, locationProcessService, locationCrudService) {
        var serviceAPI = {
            /*        get: function(currentPictureId) { // not used yet
             var deferred = $q.defer();
             console.log("get pictures service " + currentPictureId);
             $http.get(apiRootAlbum + "/" + currentPictureId + ".json")
             .then(function(response){
             $log("get pictures success", response);
             deferred.resolve(response.data);
             },function(err){
             $log("get pictures fail", err);
             deferred.reject(err);
             });
             return deferred.promise;
             },*/
            globalUpdate: function (newPicture) {
                var deferred = $q.defer();
                var _this = this;

                var saveData = function (newPicture, location) {
                    locationCrudService.add(location).then(function (data) {
                        $log.info("add location success");
                        newPicture.locationId = data.id;
                        _this.add(newPicture).then(function (data) {
                            // get currenty inserted picture id
                            newPicture.id = data.id;
                            // upload picture file
                            _this.uploadPicture(newPicture).progress(function (evt) {
                                $log.debug('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                            }).success(function (data, status, headers, config) {
                                console.log("upload picture success");
                                deferred.resolve(data);
                            });
                        }).catch(function (err) {
                            $log.error(err);
                            deferred.reject(err);
                        });
                    }).catch(function (err) {
                        $log.error(err);
                        deferred.reject(err);
                    });
                }

                var pictureUrlTemp = newPicture.url;
                newPicture.url = {};
                if (newPicture.newLocation !== undefined) {
                    saveData(newPicture, newPicture.newLocation);
                } else {
                    locationProcessService.parseMetadata(newPicture, saveData);
                }
                newPicture.url = pictureUrlTemp;

                return deferred.promise;
            },
            getLasts: function (idAlbum, numberGet) {
                var deferred = $q.defer();
                console.log("getAll pictures service by idAlbum=" + idAlbum);
                $http.get(apiRootAlbum + "/" + idAlbum + apiPrefixPicture + ".json?numberGet=" + numberGet)
                    .then(function (response) {
                        $log.info("getAll pictures success", response);
                        deferred.resolve(response.data);
                    }, function (err) {
                        $log.error("getAll pictures fail", err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            getAll: function (idAlbum) {
                var deferred = $q.defer();
                console.log("getAll pictures service by idAlbum=" + idAlbum);
                $http.get(apiRootAlbum + "/" + idAlbum + apiPrefixPicture + ".json")
                    .then(function (response) {
                        $log.info("getAll pictures success", response);
                        deferred.resolve(response.data);
                    }, function (err) {
                        $log.error("getAll pictures fail", err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            add: function (currentPicture) {
                var deferred = $q.defer();
                $log.info("add picture service", currentPicture);
                var pictureUrlTemp = currentPicture.url;
                currentPicture.url = {};
                $http.post(apiRootAlbum + "/" + currentPicture.albumId + apiPrefixPicture + ".json", currentPicture)
                    .then(function (response) {
                        currentPicture.url = pictureUrlTemp;
                        $log.info("add picture success");
                        deferred.resolve(response.data);
                    }, function (err) {
                        $log.error("add pictures fail", err);
                        deferred.reject(err);
                    });

                return deferred.promise;
            },
            edit: function (currentPicture) {
                var deferred = $q.defer();
                $log.info("edit picture service", currentPicture);
                var pictureUrlTemp = currentPicture.url;
                currentPicture.url = {};
                $http.put(apiRootAlbum + "/" + currentPicture.albumId + apiPrefixPicture + "/" + currentPicture.id + ".json", currentPicture)
                    .then(function (response) {
                        currentPicture.url = pictureUrlTemp;
                        $log.info("edit pictures success", response);
                        deferred.resolve(response.data);
                    }, function (err) {
                        $log.error("edit pictures fail", err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            uploadPicture: function (currentPicture) {
                console.log("upload url: " + apiRootAlbum + "/" + currentPicture.albumId + apiPrefixPicture + "/" + currentPicture.id + ".json");
                var pictureUrlTemp = currentPicture.url;
                currentPicture.url = {};
                return $upload.upload({
                    data: currentPicture,
                    method: "PUT",
//				data: currentPicture.albumId,
                    url: apiRootAlbum + "/" + currentPicture.albumId + apiPrefixPicture + "/" + currentPicture.id + ".json",
                    file: currentPicture.file, // or list of files ($files) for html5 only
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
                    //headers: {
                    //    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                    //}
                });
            },
            delete: function (currentPicture) {
                var deferred = $q.defer();
                $log.info("delete picture service", currentPicture);
                $http.delete(apiRootAlbum + "/" + currentPicture.albumId + apiPrefixPicture + "/"
                    + currentPicture.id + ".json", currentPicture)
                    .then(function (response) {
                        $log.info("delete pictures success", response);
                        deferred.resolve(response.data);
                    }, function (err) {
                        $log.error("delete pictures fail", err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        };
        return serviceAPI;
    }]);
