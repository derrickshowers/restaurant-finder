var restaurantApp = restaurantApp || {};

require.config({
	paths: {
		jquery: 	'vendor/jquery-2.1.0.min',
		backbone: 	'vendor/backbone',
		underscore: 'vendor/underscore',
	}
})

require(['jquery', 'backbone', 'underscore', 'app'], function() {
	restaurantApp.app.start();
});