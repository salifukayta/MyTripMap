
/**
 * open a dialog service
 */
app.factory("dialogService", ["$mdDialog", function($mdDialog) {
	return {
		show: function(params, urlTemplate, controller, successFunction, errorFunction, ev) {
			$mdDialog.show({
				controller: controller,
				templateUrl: urlTemplate,
				locals : params,
				targetEvent: ev,
			}).then(successFunction, errorFunction);
		}
	};
}]);