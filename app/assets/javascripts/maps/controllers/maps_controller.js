/**
 * Maps Comtroller
 */
app.controller("tripMapController", ["GoogleMapApi".ns(), "$scope", "locationCrudService",
		function(GoogleMapApi, $scope, locationCrudService) {

	this.loading = true;
	this.mapPictures = [];
	this.isPickLocationMode = false;
	var scope = this;
	scope.currentPicture = new Object();
		
	GoogleMapApi.then(function(maps) {
		scope.loading = false;
	});
	
	this.map = {
		center : {
			latitude : 36,
			longitude : 10
		},
		zoom : 3,
		width : '500',
		height : '500',
		events : {
			click : function(maps, eventName, arguments) {
				var clickCoordinates = new Object();
				clickCoordinates.latitude = arguments[0].latLng.lat();
				clickCoordinates.longitude = arguments[0].latLng.lng();
				console.log("click in Maps: ");
				console.log(clickCoordinates);
				if (scope.isPickLocationMode) {
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({ 'latLng': arguments[0].latLng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[1]) {
                                console.log(results[0]);
                                scope.currentPicture.newLocation.place = results[0].formatted_address;
                                scope.currentPicture.newLocation.city = results[0].address_components[0].long_name;
                                var country = results[0].address_components[results[0].address_components.length-1].long_name;
                                scope.currentPicture.newLocation.country = country;
								console.log("clic information: ");
								console.log(scope.currentPicture.newLocation);
							}
						}
					});
					scope.currentPicture.newLocation = clickCoordinates;
					scope.currentPicture.hasLocationInfo = true;

					console.log(scope.currentPicture);
					$scope.$apply();
				}
			},
		},
		options : {
			maxZoom : 20,
			minZoom : 3
		}
	};
	
	$scope.$on('picturesToMap', function (event, args) {
		//TODO à refactoriser !!!!!!!!!!!!!!!
		var mapPictures = {};
		
		args.pictures.forEach( function (picture) {
			locationCrudService.get(picture.locationId).then(function(location) {
				picture.coords = location;
			})
			.catch(function(err) {
				console.error(err);
			});
			
			picture.events = {
				dragend: function (marker, eventName, args) {
					console.log(marker);
					var lat = marker.getPosition().lat();
					var lon = marker.getPosition().lng();
					console.log("marker dragend: lat: " + lat + ", lon: " + lon);
				    picture.options = {
				    	draggable: true,
						labelContent: "lat: " + lat + ', lon: ' + lon,
						labelAnchor: "100 0",
						labelClass: "marker-labels"
					};
				}
			};
			
			picture.options = {
				draggable: true,
			};
		});
		
		$scope.mapPictures = args.pictures;
	});

	$scope.$on('locationRequestFromMap', function (event, args) {
		console.log("notify locationRequestFromMap => clic on map");
		scope.isPickLocationMode = true;
		scope.currentPicture = args.currentPicture;
	});
	
	
	$scope.$on('locationRespondeReadyFromMap', function (event, args) {
		console.log("notify locationRespondeReadyFromMap");
		scope.isPickLocationMode = false;
		$scope.$broadcast('locationRespondeFromMap', 
				{ currentPicture: args.currentPicture,
					action: args.action}
		);
	});
}]);
//exif image => https://github.com/blueimp/JavaScript-Load-Image
