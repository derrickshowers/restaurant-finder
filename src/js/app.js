restaurantApp = restaurantApp || {};

restaurantApp.router = new (Backbone.Router.extend({

	routes: {
		'' : 'welcome'
	},

	initialize: function() {
		this.restaurantList = new restaurantApp.Collections.RestaurantList();
		this.restaurantListView = new restaurantApp.Views.RestaurantListView({ collection: this.restaurantList });
		$('#app').append(this.restaurantListView.el);
	},

	start: function() {
		Backbone.history.start({ pushState: true });
	},

	welcome: function() {
		this.restaurantList.fetch({ reset: true });
	}

}));