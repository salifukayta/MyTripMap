'use strict';

app.factory('locationCrudService', ['$q', '$http', '$upload', '$log', 'apiRootLocation', 'apiRootUpload',
function($q, $http, $upload, $log, apiRootLocation, apiRootUpload) {
	var serviceAPI = {
        get: function(currentLocationId) {
			var deferred = $q.defer();
			$log.debug("get locations service " + JSON.stringify(currentLocationId));
			$http.get(apiRootLocation + "/"+ currentLocationId + ".json")
				.then(function(response){
					$log.info("get location success");
					deferred.resolve(response.data);
				},function(err){
					$log.error("get location fail ");
					$log.error(err);
					deferred.reject(err);
               });
            return deferred.promise;
        },
		getAll: function(albumId) { // not tested/used yet
			var deferred = $q.defer();
			$log.debug("getAll locations service by albumId=" + JSON.stringify(albumId));
			$http.get(apiRootLocation + "/" + albumId + "/locations.json")
				.then(function(response){
					$log.info("getAll locations success ");
					deferred.resolve(response.data);
				},function(err){
					$log.error("getAll locations fail: ");
					$log.error(err);
					deferred.reject(err);
               });
            return deferred.promise;
        },
        add: function(currentLocation) { //ok
            var deferred = $q.defer();
            $log.debug("add location service", JSON.stringify(currentLocation));
            $http.post(apiRootLocation, currentLocation)
                .then(function(response){
					$log.info("add location success");
                    deferred.resolve(response.data);
                },function(err){
					$log.error("add location fail: ");
					$log.error(err);
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        edit: function(currentLocation) { // not tested/used yet
            var deferred = $q.defer();
            $log.debug("edit service", JSON.stringify(currentLocation));
            $http.put(apiRootLocation + "/" + currentLocation.albumId + "/locations/" + currentLocation.id +".json", 
            		currentLocation)
				.then(function(response){
					$log.debug("edit location success :" + JSON.stringify(response));
					deferred.resolve(response.data);
				},function(err){
					$log.error("edit location fail: ");
					$log.error(err);
					deferred.reject(err);
				});
			return deferred.promise;
		},
		delete: function(currentLocation) { // not tested/used yet
			var deferred = $q.defer();
			$log.debug("delete locations service " + JSON.stringify(currentLocation.locationInfo));
            $http.delete(apiRootLocation + "/" + currentLocation.locationInfo.albumId + "/locations/" 
            			+ currentLocation.locationInfo.id +".json", currentLocation.locationInfo)
				.then(function(response){
					$log.debug("delete location success :" + JSON.stringify(response));
					deferred.resolve(response.data);
				},function(err){
					$log.error("delete location fail: ");
					$log.error(err);
					deferred.reject(err);
				});
			return deferred.promise;
		}
	};
	return serviceAPI;
}]);

