define(function() {

	return {
		Restaurant: Backbone.Model.extend({
			url: 'api/save',
			idAttribute: "_id",
			defaults: {
				name		: 'Unknown Name',
				city		: 'Unknown City',
				address		: 'Unknown Address',
				main_image	: 'missing-image.svg'
			},
			selected: false
		})
	}

});