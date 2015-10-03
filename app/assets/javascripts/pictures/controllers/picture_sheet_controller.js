/**
 * assets/template/picture/picture.html
 */
app.controller('pictureSheetCtrl', ["$scope", "$mdBottomSheet", "pictures", "dialogService", "pictureService",
		function($scope, $mdBottomSheet, pictures, dialogService, pictureService) {
	console.log("pictureSheetCtrl init");
	this.pictures = pictures;
	
	this.selectPicture = function($index) {
		console.log(pictures[$index]);
		//TODO open big picture
		$mdBottomSheet.hide(pictures[$index]);
	};
	
	this.showEdit = function($index, ev) {
		console.log("show edit");
				
		var editing = function(editPicture) {
			console.log("edit click");
			//TODO refactorisation => same method to call for add and edit
			pictureService.edit(editPicture).then(function(data) {
				console.log("edit picture success");
				pictureService.uploadPicture(editPicture).progress(function(evt) {
					console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
				}).success(function(data, status, headers, config) {
					console.error("upload picture success");
				});
			}).catch(function(err) {
				console.error(err);
			});
			
		};
		var cancelEdit = function(editPicture) {
			console.log("cancel click");
		};
		
 		var params = {
 			picture: pictures[$index],
 			operation: "Edit"
 		};
 		var templateUrl = "assets/template/picture/update_picture.html";
		dialogService.show(params, templateUrl, 'pictureManagerCtrl', editing, cancelEdit, ev);
	};
	
	this.showDelete = function($index, ev) {
		console.log("show delete");
		var deleting = function(deletePicture) {
			console.log("delete click");
			console.log(deletePicture);
			pictureService.delete(deletePicture).then(function(data) {
				console.log("delete picture success");
				console.log(data);
				removeFromArray(pictures, pictures[$index]);
			}).catch(function(err) {
				console.error(err);
			});
		};
		var cancelDelete = function(deletePicture) {
			console.log("cancel click");
		};
		
 		var params = {
 			picture: pictures[$index],
 			operation: "Delete"
 		};
 		var templateUrl = "assets/template/picture/delete_picture.html";
		dialogService.show(params, templateUrl, 'pictureManagerCtrl', deleting, cancelDelete, ev);
	};
}]);

