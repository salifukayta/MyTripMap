'use strict';

app.service('locationProcessService', ['$q', '$http', '$upload', '$log', 'apiRootLocation', 'apiRootUpload',
function($q, $http, $upload, $log, apiRootLocation, apiRootUpload) {
	var serviceAPI = {
		parseMetadata: function(picture, callback) {
			loadImage.parseMetaData(
				picture.file,
				function (data) {
					if (!data.imageHead) {
						return;
					}
					var location = getDegreeFromExif(data);
					$log.debug(JSON.stringify(location));
					callback(picture, location);
				},
				{
					maxMetaDataSize: 262144,
					disableImageHead: false
				}
			);
		}
	};
	return serviceAPI;
}]);

var getDegreeCoordinates = function(degMinSec) {
	var dot1Position = degMinSec.indexOf(",");
	var degAlone = degMinSec.substring(0, dot1Position);
	var minSec   = degMinSec.substring(dot1Position+1, degMinSec.length);
	var dot2Position = minSec.indexOf(",");
	var min = minSec.substring(0, dot2Position);
	var sec = minSec.substring(dot2Position+1, minSec.length);
	var deg = parseFloat(degAlone)*1 + parseFloat(min)/60 + parseFloat(sec)/3600;
	return deg;
};
	
var getDegreeFromExif = function (data) {
	var allTags = data.exif.getAll();
	var location = new Object();
	location.latitude = getDegreeCoordinates(allTags["GPSLatitude"]);
	location.longitude = getDegreeCoordinates(allTags["GPSLongitude"]);
	return location;
};