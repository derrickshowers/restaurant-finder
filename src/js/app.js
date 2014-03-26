define(['collection', 'view'], function(collection, view) {

	restaurantApp.app = new (Backbone.Router.extend({

		routes: {
			'' : 'welcome',
			':id' : 'showDetail'
		},

		initialize: function() {
			this.restaurantList = new collection.RestaurantList();
			this.restaurantListView = new view.RestaurantListView({ collection: this.restaurantList });
			this.restaurantAddEditView = new view.RestaurantAddEditView();
			$('#restaurantList').html(this.restaurantListView.el);
		},

		start: function() {

			Backbone.history.start({});
		},

		welcome: function() {
			this.restaurantList.fetch({ reset: true });
		},

		showDetail: function(id) {
			var detailView = new view.RestaurantDetailView();

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

});