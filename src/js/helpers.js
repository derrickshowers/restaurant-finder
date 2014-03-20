var dsHelpers = dsHelpers || {};

(function() {
	'use strict';

	/*
	*  This is made to work specifically with Bootstrap. Accepts a form element,
	*  and then validates whatever is set in the 'shouldBeValid' variable. Returns
	*  false if there are invalid values, as well as adding the 'has-error' class
	*  to the parent node (in Bootstrap, this is the 'form-control' div).
	*/
	function validateForm(formEl) {

		// will change this to false if there's anything invalid
		var validForm = true;

		// set form element to validate
		var shouldBeValid = ['input', 'textarea'];

		// get all children element of form based on what should be valid
		var formElements = allChildren(formEl, shouldBeValid);

		// let's check the values
		for (var i=0; i<formElements.length; i++) {
			if(formElements[i].value === '') {
				formElements[i].parentNode.classList.add('has-error');
				validForm = false;
			} else {
				formElements[i].parentNode.classList.remove('has-error')
			}
		}

		// return true or false based on if there's an error
		return validForm;

	}
	dsHelpers.validateForm = validateForm;
	
	/*
	*  This is a function to grab all children of the element passed in that match
	*  types contained in the array passed as the second argument.
	*/

	function allChildren(element, types) {

		if (types === undefined) return null;
		var des = [];

		(function populateArray(el) {
				for (var i=0; i<el.childNodes.length; i++) {
				
				for (var j=0; j<types.length; j++) {
					if (types[j].toUpperCase() === el.childNodes[i].tagName) {
						des.push(el.childNodes[i]);
					}
				}
				
				if (el.childNodes[i].childNodes.length > 0)
					populateArray(el.childNodes[i])
			}
		})(element);

		return des;
		
	}
	dsHelpers.allChildren = allChildren;

})();