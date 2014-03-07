restaurantApp = restaurantApp || {};

restaurantApp.app = new (Backbone.Router.extend({

	routes: {
		'' : 'welcome',
		':id' : 'showDetail'
	},

	initialize: function() {
		this.restaurantList = new restaurantApp.Collections.RestaurantList();
		this.restaurantListView = new restaurantApp.Views.RestaurantListView({ collection: this.restaurantList });
		this.restaurantAddEditView = new restaurantApp.Views.RestaurantAddEditView();
		$('#restaurantList').html(this.restaurantListView.el);
	},

	start: function() {
		Backbone.history.start({ });
	},

	welcome: function() {
		this.restaurantList.fetch({ reset: true });
	},

	showDetail: function(id) {
		var detailView = new restaurantApp.Views.RestaurantDetailView();

		if (!this.restaurantList.length > 0) {
			this.restaurantList.fetch({ reset: true });
			this.restaurantList.on('reset', function() {
				detailView.render(id);
			});
		} else {
			detailView.render(id);
		}
	}

}));