/**
 * Remove the value from the array 
 */
var removeFromArray = function (arr, value) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] === value) {
		arr.splice(i, 1);
			break;
		}
	}
	return arr;
};