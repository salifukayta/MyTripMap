'use strict';

app.factory('albumService', ['$q', '$http', '$log', 'apiRootAlbum',
function($q, $http, $log, apiRootAlbum) {
	var serviceAPI = {
        get: function(currentAlbumId) { // not used yet
			var deferred = $q.defer();
			$log.debug("get service " + angular.toJson(currentAlbumId));
			$http.get(apiRootAlbum + "/" + currentAlbumId + ".json")
				.then(function(response){
					$log.debug("get success", angular.toJson(response));
					deferred.resolve(response);
				},function(err){
					$log.error("get album fail");
					deferred.reject(err);
               });
            return deferred.promise;
        },
		getLast: function() {
			var deferred = $q.defer();
			$log.info("get last album.id service");
			$http.get(apiRootAlbum + ".json")
				.then(function(response){
					$log.debug("getLast success", angular.toJson(response.data[currentPicture.data.length]));
					deferred.resolve(response.data[currentPicture.data.length].id);
				},function(err){
					$log.error("getLast album fail");
					deferred.reject(err);
               });
            return deferred.promise;
        },
		getAll: function() {
			var deferred = $q.defer();
			$log.info("getAll service");
			$http.get(apiRootAlbum + ".json")
				.then(function(response){
					$log.debug("getAll success", angular.toJson(response));
					deferred.resolve(response.data);
				},function(err){
					$log.error("getAll album fail");
					deferred.reject(err);
               });
            return deferred.promise;
        },
        add: function(currentAlbum) {
            var deferred = $q.defer();
			$log.debug("add service " + angular.toJson(currentAlbum));
            $http.post(apiRootAlbum + '.json', currentAlbum)
                .then(function(response){
					$log.info("add success");
                    deferred.resolve(response.data);
                },function(err){
					$log.info("add fail");
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        edit: function(currentAlbum){
            var deferred = $q.defer();
			$log.debug("edit service " + angular.toJson(currentAlbum));
			$http.put(apiRootAlbum + "/" + currentAlbum.id + ".json", currentAlbum)
				.then(function(response){
					$log.debug("edit success", angular.toJson(response));
					deferred.resolve(response.data);
				},function(err){
					$log.error("edit album fail");
					deferred.reject(err);
				});
			return deferred.promise;
		},
		delete: function(currentAlbum) {
			var deferred = $q.defer();
			$log.debug("delete service " + angular.toJson(currentAlbum));
			$http.delete(apiRootAlbum + "/" + currentAlbum.id + ".json")
				.then(function(response){
					$log.debug("delete success: " + angular.toJson(response));
					deferred.resolve(response.data);
				},function(err){
					$log.error("delete album fail");
					deferred.reject(err);
				});
			return deferred.promise;
		}
	};
	return serviceAPI;
}]);
