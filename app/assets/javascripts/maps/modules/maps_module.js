/**
 * Trip Map App
 */
var app = angular.module("my-trip-maps", ["google-maps".ns(), "ngAnimate", "ngMaterial", "angularFileUpload"])
.constant('apiPrefixPicture', "/pictures")
.constant('apiRootAlbum', "/api/albums")
.constant('apiRootUpload', "/api/uploads")
.constant('apiRootLocation', "/api/locations")

.config(["GoogleMapApiProvider".ns(), "$httpProvider", "$provide", function(GoogleMapApi, $httpProvider, $provide) {
	GoogleMapApi.configure({
		key : 'AIzaSyB8RMXnE6nvNAklrNaxlBWBqQoD3LZtJ9I',
		v : '3.17',
		libraries : 'weather,geometry,visualization'
	});
    $httpProvider.interceptors.push('underScoreCamelCaseInterceptor');
	$provide.decorator("$log", ["$delegate", function($delegate) {
		var defaultDebug = $delegate.debug;

		$delegate.debug = function() {
			var args = [].slice.call(arguments);
			args[0] = [new Date().toString(), ": ", args[0]].join("");
			// new Date().toString()
			// Insert a separator between the existing log message(s) and what we're adding.
            args.push(' - ');

            // Use (instance of Error)'s stack to get the current line.
            var stack = (new Error()).stack.split('\n').slice(1);

            // Throw away the first item because it is the `$log.fn()` function, 
            // but we want the code that called `$log.fn()`.
//            stack.shift();

            // We only want the top line, thanks.
            stack = stack.slice(1, 2);

            // Put it on the args stack.
            args.push(stack);
            
			defaultDebug.apply(null, args);
		};

		return $delegate;
    }]);
}]);

/**
 * Interceptor that convert from/to camelCase and under_score_case
 */
app.factory('underScoreCamelCaseInterceptor', ['$log', "$window", function($log, $window) {
    var myInterceptor = {
			'request': function(config) {
				if (config.data !== undefined && typeof config.data === 'object') {
					detectAndPutUnderScore(config.data);
				}
				return config;
			},
	
			'response': function(response) {
				if (Array.isArray(response.data)) {
					for(i in response.data) {
						detectAndDeteleUnderScore(response.data[i]);
					}
				} else if (typeof response.data === 'object'){
					detectAndDeteleUnderScore(response.data);
				}
				return response;
			}
    };
    return myInterceptor;
}]);

//FIXME to factorize all these
/**
 * Replace all under_score_case with camelCase
 * 
 * @param {Object} object
 */
var detectAndDeteleUnderScore = function (object) {
	for(key in object) {
		if (key.hasUnderScrore()) {
			replaceUnderScrore(key, object);
		}
	}
};

/**
 * Replace all camelCase with under_score_case
 * 
 * @param {Object} object
 */
var detectAndPutUnderScore = function (object) {
	for(key in object) {
		if (!key.startsWith("$") && key.hasUpperCase()) {
			replaceUpperCase(key, object);
		}
	}
};

/**
 * Method that replace the under_score_case with the camelCase of the key's object
 * 
 * @param {Object} oldKey
 * @param {Object} object
 */
var replaceUpperCase = function (oldKey, object) {
	//TODO replace all upper case and not only the first one
	var indexToUpCase = oldKey.indexOfUpperCase();
	var newKey = oldKey.replaceAt(indexToUpCase, oldKey.charAt(indexToUpCase).toLowerCase());
	newKey = newKey.insertAt(indexToUpCase, "_");

	object[newKey] = object[oldKey];
//	object[oldKey] = undefined;
//	delete object.oldKey;
};

/**
 * Method that replace the camelCase with under_score_case the of the key's object
 * 
 * @param {Object} oldKey
 * @param {Object} object
 */
var replaceUnderScrore = function (oldKey, object) {
	//TODO replace all under score case and not only the first one
	var indexToUpCase = oldKey.indexOf("_");
	var newKey = oldKey.replace("_", "");
	newKey = newKey.replaceAt(indexToUpCase, newKey.charAt(indexToUpCase).toUpperCase());
	
	object[newKey] = object[oldKey];
//	object[oldKey] = undefined;
//	delete object.oldKey;
};
