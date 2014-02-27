var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	className: 'list-group',

	template: _.template(restaurantApp.Templates.RestaurantListTemplate),

	initialize: function() {
		this.collection.on('reset', this.render, this);
	},

	render: function() {
		var $template = $('<div/>');
		this.collection.forEach(function(restaurant) {
			$item = $(this.template(restaurant.toJSON()));
			if (restaurant.selected) {
				$item.addClass('active');
			} else {
				$item.removeClass('active');
			}
			$template.append($item);
		}, this);
		this.$el.html($template.children());
	},

	selectedState: function(id) {
		var id = parseInt(id);
		this.collection.forEach(function(restaurant) {
			if (restaurant.id === id) {
				restaurant.selected = true;
			} else {
				restaurant.selected = false;
			}
		}, this);
		this.render();
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
		restaurantApp.app.restaurantListView.selectedState(id);
		this.render(data);
	}

});