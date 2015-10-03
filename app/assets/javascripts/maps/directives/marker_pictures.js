
/**
 * template/map/marker_picture.html
 */
app.directive('markerPictures', [function(){
	return{
		restrict: 'E',
		templateUrl: 'assets/template/map/marker_picture.html',
		scope: {
			pictures: '=pictures'
		},
		transclude: true,
	};
}]);