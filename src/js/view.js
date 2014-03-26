define(['template', 'model'], function(template, model) {

	var RestaurantListView = Backbone.View.extend({
		
		tagName: 'div',

		template: _.template(template.RestaurantListTemplate),

		events: {
			'change select'				: 'render',
			'click a'					: 'refresh'
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
			this.collection.forEach(function(restaurant) {
				if (restaurant.get('urlName') === id) {
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
			var newView = new RestaurantAddEditView({ collection: restaurantApp.app.restaurantList });
			newView.render();
		},

		refresh: function(e) {

			// hmmm... this is a bit messy, but the only way I could think of to get the id and
			// pass it to the router. This is to allow the user to click the same restaurant and
			// re-render it.
			var href = e.target.href;
			var id = href.match('#!/([a-zA-Z0-9-]+)')[1];
			restaurantApp.app.showDetail(id);
		}

	});
	
	var RestaurantDetailView = Backbone.View.extend({

		template: _.template(template.RestaurantDetailTemplate),

		events: {
			'click #edit'		: 'edit',
			'click #addSpecial' : 'addSpecial'
		},

		initialize: function() {
			
		},

		render: function(id) {
			this.model = restaurantApp.app.restaurantList.findWhere({ urlName: id })
			this.$el.html(this.template(this.model.toJSON()));
			restaurantApp.app.restaurantListView.selectedState(id);
			$('#restaurantDetails').html(this.el);
		},

		// called when 'Edit This Restaurant' button is clicked. Sets up a new RestaurantAddEditView
		// view, associates it with the current restaurant model, and then renders it.
		edit: function() {
			var newView = new RestaurantAddEditView({ model: this.model });
			newView.render();
		},

		// called when 'Add A Special' button is clicked. Sets up a new RestaurantAddSpecialView
		// view, associates it with the current restaurant model, and then renders it.
		addSpecial: function() {
			var newView = new RestaurantAddSpecialView({ model: this.model });
			newView.render();
		}

	});

	var RestaurantAddEditView = Backbone.View.extend({

		tagName: 'form',

		addNewtemplate: _.template(template.RestaurantAddNewTemplate),
		editTemplate: _.template(template.RestaurantEditTemplate),

		isNew: true,

		events: {
			'click button': 	'save'
		},

		initialize: function() {
			
		},

		render: function() {
			
			// set $el with the correct template (based on if model is new or not)
			if (this.model === undefined) {
				this.$el.html(this.addNewtemplate());
			} else {
				this.$el.html(this.editTemplate(this.model.toJSON()));
			}

			// show it off!
			$('#restaurantDetails').html(this.el);

		},

		save: function(e) {
			
			// no form submit - just ruins everything :)
			e.preventDefault();

			// check input to make sure everything is valid. if it isn't, add an event
			// listener that keeps checking. if it is, remove the listener.
			if (!dsHelpers.validateForm(this.el)) {
				var formEl = this.el;
				this.$el.on('keypress', function() {
					dsHelpers.validateForm(formEl)
				});
				return;
			}
			this.$el.unbind('keypress');

			// set the id, and set the model to a new instance if it's not an update
			if (this.model === undefined) {
				this.model = new model.Restaurant();
			}

			// figure out url friendly name
			var urlName = $('#name').val().replace(/\ /g,'-').replace(/[^\w\s]/gi,'').toLowerCase();


			// get the user's input and store it in the model
			this.model.save({
				name: $('#name').val(),
				address: $('#address').val(),
				city: $('#city').val(),
				urlName: urlName,
				signatures: [
					{ 
						type : 'Entrée',
						name : $('#signatureEntree').val()
					},
					{ 
						type : 'Drink',
						name : $('#signatureDrink').val()
					}
				]
			});

			if (this.model.isNew()) {
				this.collection.add(this.model);
			}
			
			// we're done - let em know
			$('#restaurantDetails').html('<p>Cool! Your restaurant has been added/updated');
			
		}

	});

	var RestaurantAddSpecialView = Backbone.View.extend({

		tagName: 'form',

		template: _.template(template.RestaurantAddSpecialTemplate),

		events: {
			'click button': 	'save'
		},

		initialize: function() {
		
		},

		render: function() {
			
			this.$el.html(this.template(this.model.toJSON()));
			$('#restaurantDetails').html(this.el);

		},

		save: function(e) {
			
			// no form submit - just ruins everything :)
			e.preventDefault();

			// check input to make sure everything is valid. if it isn't, add an event
			// listener that keeps checking. if it is, remove the listener.
			if (!dsHelpers.validateForm(this.el)) {
				var formEl = this.el;
				this.$el.on('keypress', function() {
					dsHelpers.validateForm(formEl)
				});
				return;
			}
			this.$el.unbind('keypress');

			// get the user's input and store it in the model
			var day = $('#day').val()
			var specialsObject = {
				title : $('#title').val(),
				type : $('#type').val(),
				time : $('#time').val(),
				description : $('#description').val()
			}

			var specials = this.model.get('specials');
			for (var i=0; i<specials.length; i++) {
				if (day === specials[i].weekday) {
					specials[i].details.push(specialsObject);
				}
			}

			this.model.set(specials);
			
			// we're done - let em know
			$('#restaurantDetails').html('<p>Voilà! Your special has been added.');
			
		}

	});

	return {
		RestaurantListView: RestaurantListView,
		RestaurantDetailView: RestaurantDetailView,
		RestaurantAddEditView: RestaurantAddEditView,
		RestaurantAddSpecialView: RestaurantAddSpecialView
	}

});