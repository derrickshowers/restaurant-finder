restaurantApp = restaurantApp || {};

restaurantApp.app = new (Backbone.Router.extend({

	routes: {
		'' : 'welcome',
		':id' : 'showDetail'
	},

	initialize: function() {
		this.restaurantList = new restaurantApp.Collections.RestaurantList();
		this.restaurantListView = new restaurantApp.Views.RestaurantListView({ collection: this.restaurantList });
		this.restaurantDetailView = new restaurantApp.Views.RestaurantDetailView();
		this.restaurantAddView = new restaurantApp.Views.RestaurantAddView();
		$('#restaurantList').html(this.restaurantListView.el);
	},

	start: function() {
		Backbone.history.start({ });
	},

	welcome: function() {
		this.restaurantList.fetch({ reset: true });
	},

	showDetail: function(id) {
		var self = this;

		if (!this.restaurantList.length > 0) {
			this.restaurantList.fetch({ reset: true });
			this.restaurantList.on('reset', function() {
				self.restaurantDetailView.render(id);
			});
		} else {
			this.restaurantDetailView.render(id);
		}
	}

}));