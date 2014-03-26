define(function() {

	return {
		Restaurant: Backbone.Model.extend({
			url: 'api/save',
			idAttribute: '_id',
			defaults: {
				name		: 'Unknown Name',
				city		: 'Unknown City',
				address		: 'Unknown Address',
				main_image	: 'missing-image.svg',
				specials : [
					{
						'weekday' : 'Su',
						'details' : []
					},
					{
						'weekday' : 'Mo',
						'details' : []
					},
					{
						'weekday' : 'Tu',
						'details' : []
					},
					{
						'weekday' : 'We',
						'details' : []
					},
					{
						'weekday' : 'Th',
						'details' : []
					},
					{
						'weekday' : 'Fr',
						'details' : []
					},
					{
						'weekday' : 'Sa',
						'details' : []
					}
				]
			},
			selected: false
		})
	}

});