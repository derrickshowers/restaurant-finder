var restaurantApp = restaurantApp || {};

restaurantApp.Views = restaurantApp.Views || {};
restaurantApp.Views.RestaurantView = Backbone.View.extend({
	
	tagName: 'a',

	className: 'list-group-item',

	attributes: function() {
		return {
			href: '#' + this.model.get('id'),
			alt: this.model.get('name')
		}
	},

	render: function() {
		this.$el.html(this.model.get('name'));
		return this;
	}

});

restaurantApp.Views.RestaurantListView = Backbone.View.extend({
	
	tagName: 'div',

	className: 'list-group',

	initialize: function() {
		this.collection.on('reset', this.showAll, this);
	},

	render: function() {

	},

	showAll: function() {
		this.collection.forEach(this.showOne, this);
	},

	showOne: function(restaurant) {
		var restaurantView = new restaurantApp.Views.RestaurantView({ model: restaurant });
		this.$el.append(restaurantView.render().el);
	}

});

restaurantApp.Views.RestaurantDetailView = Backbone.View.extend({
	
	tagName: 'ul',

	initialize: function() {

	},

	render: function() {

	},

	swapDetails: function(id) {
		var model = restaurantApp.app.restaurantList.get(id);
		this.$el.html(model.get('name'));
	}

});