var restaurantApp = restaurantApp || {};

require.config({
	paths: {
		jquery: 	'vendor/jquery-2.1.0.min',
		backbone: 	'vendor/backbone',
		underscore: 'vendor/underscore',
		bootstrap: 	'vendor/bootstrap', 
	}
})

require(['jquery', 'backbone', 'underscore', 'bootstrap', 'app'], function() {
	restaurantApp.app.start();
});