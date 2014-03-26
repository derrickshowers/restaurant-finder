define(['model'], function(model) {

	return {
		RestaurantList: Backbone.Collection.extend({
			model: model.Restaurant,
			url: '/api'
		})
	}

});