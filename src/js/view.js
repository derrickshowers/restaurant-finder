var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	template: _.template(restaurantApp.Templates.RestaurantListTemplate),

	events: {
		'change select'		: 'render'
	},

	initialize: function() {
		this.collection.on('reset', this.render, this);
	},

	render: function() {

		var selectedCity = $('#selectCity').val() || 'all',
			$template = $('<div/>');
		
		// check to see if model's selected property is true.
		// if so, add class 'active'. Also, only display restaurant
		// if it's in the selected city.
		$template.addClass('list-group');
		this.collection.forEach(function(restaurant) {
			$item = $(this.template(restaurant.toJSON()));
			if (restaurant.selected) {
				$item.addClass('active');
			} else {
				$item.removeClass('active');
			}
			if (selectedCity === 'all' || selectedCity === restaurant.get('city')) {
				$template.append($item);
			}
		}, this);

		// render the select box and choose current city
		this.$el.html(this.buildSelect());
		$('#selectCity').val(selectedCity);

		// now let's add the childen of the jQuery template
		// object to the view's el
		this.$el.append($template);
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
	},

	// build the select box by checking collection for
	// any and all cities.
	buildSelect: function() {
		var $select = $('<select/>').addClass('form-control').attr('id', 'selectCity'),
			cities = [];
		
		// loop through the models to build an array of cities
		$select.append('<option value="all">See All Cities</option>')
		this.collection.forEach(function(restaurant) {
			var city = restaurant.get('city');
			var isNew = true;
			for (var i=0; i<cities.length; i++) {
				if (cities[i] === city) {
					isNew = false;
				}
			}
			if (isNew) {
				cities.push(city);
			}
		});
		
		// add the options to the $select el
		cities.forEach(function(city) {
			var option = $('<option value="' + city + '">' + city + '</option>');
			$select.append(option);
		});

		return $select;
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