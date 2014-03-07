var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	template: _.template(restaurantApp.Templates.RestaurantListTemplate),

	events: {
		'change select'		: 'render'
	},

	initialize: function() {
		
		this.collection.on('reset change add remove', this.render, this);
		
		// adding a listener to 'new restaurant' button - outside of view
		$('#addNew').click($.proxy(this.addNew, this));

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
				this.selectedRestaurant = restaurant;
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
	},

	// called when 'New Restaurant' button is clicked. Sets up a new RestaurantAddEditView
	// view, and then renders it.
	addNew: function() {
		var newView = new restaurantApp.Views.RestaurantAddEditView({ collection: restaurantApp.app.restaurantList });
		newView.render();
	},

});

restaurantApp.Views.RestaurantDetailView = Backbone.View.extend({

	template: _.template(restaurantApp.Templates.RestaurantDetailTemplate),

	events: {
		'click #edit'		: 'edit'
	},

	initialize: function() {
		
	},

	render: function(id) {
		this.model = restaurantApp.app.restaurantList.get(id);
		this.$el.html(this.template(this.model.toJSON()));
		restaurantApp.app.restaurantListView.selectedState(id);
		$('#restaurantDetails').html(this.el);
	},

	// called when 'Edit This Restaurant' button is clicked. Sets up a new RestaurantAddEditView
	// view, associating it with the current restaurant model, and then render it.
	edit: function() {
		var newView = new restaurantApp.Views.RestaurantAddEditView({ model: this.model });
		newView.render();
	}

});

restaurantApp.Views.RestaurantAddEditView = Backbone.View.extend({

	tagName: 'form',

	addNewtemplate: _.template(restaurantApp.Templates.RestaurantAddNewTemplate),
	editTemplate: _.template(restaurantApp.Templates.RestaurantEditTemplate),

	isNew: true,

	events: {
		'click button': 	'save'
	},

	initialize: function() {
	
	},

	render: function() {

		// first, let's figure out if we're creating a new model, or updating
		// an existing.
		this.isNew = (this.model === undefined) ? true : false;
		
		// set $el with the correct template (based on if model is new or not)
		if (this.isNew) {
			this.$el.html(this.addNewtemplate());
		} else {
			this.$el.html(this.editTemplate(this.model.toJSON()));
		}

		// show it off!
		$('#restaurantDetails').html(this.el);

	},

	save: function(e) {

		var id;
		
		// no form submit - just ruins everything :)
		e.preventDefault();

		// set the id, and set the model to a new instance if it's not an update
		if (this.isNew) {
			id = this.collection.length + 1;
			this.model = new restaurantApp.Models.Restaurant();
		} else {
			id = this.model.id;
		}

		// get the user's input and store it in the model
		this.model.set({
			id: id,
			name: $('#name').val(),
			address: $('#address').val(),
			city: $('#city').val(),
			signatures: [
				{ 
					'type' : 'Entrée',
					'name' : $('#signatureEntree').val()
				},
				{ 
					'type' : 'Drink',
					'name' : $('#signatureDrink').val()
				}
			]
		});
		
		// if this is new, we'll need to add it to the collection
		if (this.isNew) {
			this.collection.add(this.model);
		}
		
		// we're done - let em know
		$('#restaurantDetails').html('<p>Cool! Your restaurant has been added/updated');
		
	}

});