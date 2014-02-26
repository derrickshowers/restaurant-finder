var restaurantApp = restaurantApp || {};

restaurantApp.Tempaltes = restaurantApp.Views || {};
restaurantApp.Tempaltes.RestaurantDetailTemplate = '\
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
';