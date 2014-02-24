var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantView = Backbone.View.extend({
	
	tagName: 'li',

	render: function() {
		this.$el.html('<strong>Name:</strong> ' + this.model.get('name'));
		return this;
	}

});

restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'ul',

	initialize: function() {
		this.collection.on('reset', this.showAll, this);
	},

	render: function() {

	},

	showAll: function() {
		this.collection.forEach(this.showOne, this);
	},

	showOne: function(restaurant) {
		var restaurantView = new restaurantApp.Views.RestaurantView({ model: restaurant });
		this.$el.append(restaurantView.render().el);
	}

});