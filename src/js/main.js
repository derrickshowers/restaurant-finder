var restaurantApp = restaurantApp || {};

require.config({
	paths: {
		jquery: 'vendor/jquery-2.1.0.min',
		backbone: 'vendor/backbone',
		underscore: 'vendor/underscore',
		bootstrap: 'vendor/bootstrap', 
		text: 'vendor/text'
	},
	shim: {
		backbone: {
			deps: ['underscore', 'jquery']
		},
		bootstrap: {
			deps: ['jquery']
		},
		app: {
			deps: ['backbone']
		}
	}
})

require(['jquery', 'underscore', 'backbone', 'bootstrap', 'app', 'helpers'], function() {
	restaurantApp.app.start();
});