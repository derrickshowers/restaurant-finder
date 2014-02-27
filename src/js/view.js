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

		// check to see if model's selected property is true.
		// if so, add class 'active'
		this.collection.forEach(function(restaurant) {
			$item = $(this.template(restaurant.toJSON()));
			if (restaurant.selected) {
				$item.addClass('active');
			} else {
				$item.removeClass('active');
			}
			$template.append($item);
		}, this);

		// now let's add the childen of the jQuery template
		// object to the view's el
		this.$el.html($template.children());
	},

	// called to change the selected item on the list.
	// takes an id, changes the boolean value of 
	// model.selected, then re-renders the view
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

	render: function(id) {
		var model = restaurantApp.app.restaurantList.get(id);
		this.$el.html(this.template(model.toJSON()));
		restaurantApp.app.restaurantListView.selectedState(id);
	}

});