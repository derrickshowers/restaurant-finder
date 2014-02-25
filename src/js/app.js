restaurantApp = restaurantApp || {};

restaurantApp.router = new (Backbone.Router.extend({

	routes: {
		'' : 'welcome',
		':id' : 'showDetail'
	},

	initialize: function() {
		this.restaurantList = new restaurantApp.Collections.RestaurantList();
		this.restaurantListView = new restaurantApp.Views.RestaurantListView({ collection: this.restaurantList });
		$('#restaurantList').append(this.restaurantListView.el);
	},

	start: function() {
		Backbone.history.start({ });
	},

	welcome: function() {
		this.restaurantList.fetch({ reset: true });
	},

	showDetail: function(id) {
		var restaurantDetailView = new restaurantApp.Views.RestaurantDetailView({});
		restaurantDetailView.model = this.restaurantList.get({ id: id })
		restaurantDetailView.render();
	}

}));