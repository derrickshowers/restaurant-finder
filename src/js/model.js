var restaurantApp = restaurantApp || {};

restaurantApp.Models = restaurantApp.Models || {};
restaurantApp.Models.Restaurant = Backbone.Model.extend({
	defaults: {
		name		: 'Unknown Name',
		city		: 'Unknown City',
		address		: 'Unknown Address',
		main_image	: 'missing-image.svg'
	},
	selected: false
});