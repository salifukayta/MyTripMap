/**
 * Return a substring with the index caracter replaced by the argument caracter
 * 
 * @param {Object} index
 * @param {Object} character
 */
String.prototype.replaceAt = function(index, stringInserted) {
    return this.substr(0, index) + stringInserted + this.substr(index+stringInserted.length);
};

/**
 * Return a new string, with the string argument inserted at the specified index
 * 
 * @param {Object} index
 * @param {Object} string
 */
String.prototype.insertAt = function (index, stringInserted) {
  if (index > 0)
    return this.substring(0, index) + stringInserted + this.substring(index, this.length);
  else
    return stringInserted + stthisring;
};

/**
 * Return the index of the first upper case character
 */
String.prototype.indexOfUpperCase = function () {
	var index = 0;
	for (var i = 0 ; i < this.length ;i++) {
    	var charact = this.charAt(i);
		if (isNaN(charact) && charact.isNsC() && charact === charact.toUpperCase()) {
			return index;
		}
		index++;
	}
	return -1;
};

/**
 * Return true if the string has the under_score character, false otherwise
 */
String.prototype.hasUnderScrore = function () {
	if(this === undefined || (this !== null && this.indexOf("_") === -1)) {
		return false;
	}
	return true;
};

/**
 * Return true if the string has a camelCase character, false otherwise
 */
String.prototype.hasUpperCase = function () {
	for (var i = 0 ; i < this.length ;i++) {
    	var charact = this.charAt(i);
		if (isNaN(charact) && charact.isNsC() && charact === charact.toUpperCase()) {
			return true;
		}
	}
	return false;
};

/**
 * isNotSpetialCaracter retur true if the character is not a spetial character, false otherwise
 */
String.prototype.isNsC = function () {
	var sChars = "_~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
		if (sChars.indexOf(this) != -1) {
			return false;
		}
	return true;
};

/**
 * Return true if the string starts with the needle passed in argument
 */
String.prototype.startsWith = function(needle) {
    return(this.indexOf(needle) == 0);
};