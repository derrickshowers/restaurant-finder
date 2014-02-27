var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	className: 'list-group',

	template: _.template(restaurantApp.Templates.RestaurantListTemplate),

	initialize: function() {
		this.collection.on('reset', this.show, this);
	},

	render: function(data) {
		this.$el.append(this.template(data));
	},

	show: function() {
		this.collection.forEach(function(restaurant) {
			var model = restaurantApp.app.restaurantList.get(restaurant.id);
			var data = model.toJSON();
			this.render(data);
		}, this);
	}

});

restaurantApp.Views.RestaurantDetailView = Backbone.View.extend({

	template: _.template(restaurantApp.Templates.RestaurantDetailTemplate),

	initialize: function() {

	},

	render: function(data) {
		this.$el.html(this.template(data));
	},

	swapDetails: function(id) {
		var model = restaurantApp.app.restaurantList.get(id);
		var data = model.toJSON();
		this.render(data);
	}

});