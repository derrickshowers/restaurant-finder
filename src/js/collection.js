var restaurantApp = restaurantApp || {};

restaurantApp.Collections = restaurantApp.Collections || {};
restaurantApp.Collections.RestaurantList = Backbone.Collection.extend({
	model: restaurantApp.Models.Restaurant,
	url: '/data/restaurants.json'
});