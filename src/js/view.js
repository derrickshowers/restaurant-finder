var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	template: _.template(restaurantApp.Templates.RestaurantListTemplate),

	controls: _.template(restaurantApp.Templates.Controls),

	events: {
		'change select'		: 'render',
		'click #addNew'		: 'addNew',
	},

	initialize: function() {
		this.collection.on('reset add remove', this.render, this);
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

		// show the controls
		this.$el.html(this.controls);

		// render the select box and choose current city
		this.$el.append(this.buildSelect());
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
	},

	addNew: function() {
		var newView = new restaurantApp.Views.RestaurantAddView;
		newView.render();
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
		$('#restaurantDetails').html(this.el);
	}

});

restaurantApp.Views.RestaurantAddView = Backbone.View.extend({

	tagName: 'form',

	template: _.template(restaurantApp.Templates.RestaurantAddNewTemplate),

	events: {
		'click button': 	'save'
	},

	initialize: function() {
	
	},

	render: function(id) {
		this.$el.html(this.template());
		$('#restaurantDetails').html(this.el);
	},

	save: function(e) {
		e.preventDefault();
		var model = new restaurantApp.Models.Restaurant();
		var collection = restaurantApp.app.restaurantList;
		var id = collection.length + 1;
		model.set({
			id: id,
			name: $('#name').val(),
			address: $('#address').val(),
			city: $('#city').val(),
			favorites: [
				{ 
					'type' : 'Entrée',
					'name' : $('#favoriteEntree').val()
				},
				{ 
					'type' : 'Drink',
					'name' : $('#favoriteDrink').val()
				}
			]
		});
		collection.add(model);
		$('#restaurantDetails').html('<p>Cool! Your restaurant has been added');
	}

});