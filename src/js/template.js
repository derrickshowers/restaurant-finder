var restaurantApp = restaurantApp || {};

restaurantApp.Templates = restaurantApp.Views || {};
restaurantApp.Templates.RestaurantListTemplate = '\
	<a class="list-group-item" href="#<%= id %>" alt="<%= name %>"><%= name %></a>\
';
restaurantApp.Templates.RestaurantDetailTemplate = '\
	<div class="clearfix">\
		<h3><%= name %></h3>\
		<ul class="address">\
			<li><%= address %></li>\
			<li><%= city %></li>\
		</ul>\
	</div>\
	<img alt="<%= name %>" height="100" width="100" src="/img/<%= main_image %>"/>\
	<h4>Favorites:</h4>\
	<ul>\
		<% _.each(favorites, function(favorite) { %> <li><%= favorite.type %>: <%= favorite.name %></li> <% }); %>\
	</ul>\
	<% if (typeof specials !== "undefined") { %>\
		<h4>Specials:</h4>\
		<ul>\
			<% _.each(specials, function(special) { %> <li><%= special.day %>:\
				<ul><% _.each(special.drinks, function(drink) { %>\
					<li><%= drink %></li>\
				<% }); %>\
				</ul>\
			</li> <% }); %>\
		</ul>\
	<% } %>\
';

restaurantApp.Templates.RestaurantAddNewTemplate = '\
	<div class="form-group">\
		<label for="exampleInputEmail1">Restaurant Name</label>\
		<input id="name" class="form-control" type="text" placeholder="Ex. Bob\' Big Boy">\
	</div>\
	<div class="form-group">\
		<label for="exampleInputEmail1">Restaurant\'s Street Address</label>\
		<input id="address" class="form-control" type="text" placeholder="Ex. 1 Infinite Loop">\
	</div>\
	<div class="form-group">\
		<label for="exampleInputEmail1">Restaurant\'s City</label>\
		<input id="city" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="exampleInputEmail1">Favorite Entrée</label>\
		<input id="favoriteEntree" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="exampleInputEmail1">Favorite Drink</label>\
		<input id="favoriteDrink" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<button type="submit" class="btn btn-success">Save It</button>\
';

restaurantApp.Templates.Controls = '\
	<button id="addNew" type="button" class="btn btn-primary">New Restaurant</button>\
';