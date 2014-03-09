var restaurantApp = restaurantApp || {};

restaurantApp.Templates = restaurantApp.Views || {};
restaurantApp.Templates.RestaurantListTemplate = '\
	<a class="list-group-item" href="#<%= id %>" alt="<%= name %>"><%= name %></a>\
';
restaurantApp.Templates.RestaurantDetailTemplate = '\
	<div class="row controls">\
		<button id="edit" type="button" class="btn btn-primary pull-right">Edit</button>\
	</div>\
	<div class="row">\
		<div class="col-md-6">\
			<img alt="<%= name %>" height="100" width="100" src="/img/<%= main_image %>"/>\
			<div class="pull-left">\
				<h3><%= name %></h3>\
				<ul class="address">\
					<li><%= address %></li>\
					<li><%= city %></li>\
				</ul>\
			</div>\
			<h4>Signatures:</h4>\
			<ul>\
				<% _.each(signatures, function(item) { %> <li><%= item.type %>: <%= item.name %></li> <% }); %>\
			</ul>\
		</div>\
		<div class="col-md-6 darkBox roundCorners">\
			<% if (typeof specials !== "undefined") { %>\
				<h4>Specials:</h4>\
				<ul class="nav nav-tabs">\
					<% _.each(specials, function(special) { %>\
						<li><a href="#<%= special.weekday %>" data-toggle="tab"><%= special.weekday %></a></li>\
					<% }); %>\
				</ul>\
				<div class="tab-content">\
					<% _.each(specials, function(special) { %>\
						<div class="tab-pane" id="<%= special.weekday %>">\
							<% _.each(special.details, function(detail) { %>\
								<ul>\
									<li><%= detail.title %></li>\
									<li><%= detail.time %></li>\
									<li><%= detail.description %></li>\
								</ul>\
							<% }); %>\
						</div>\
					<% }); %>\
				</div>\
			<% } %>\
		<div>\
	</div>\
';

restaurantApp.Templates.RestaurantAddNewTemplate = '\
	<div class="form-group">\
		<label for="name">Restaurant Name</label>\
		<input id="name" class="form-control" type="text" placeholder="Ex. Bob\' Big Boy">\
	</div>\
	<div class="form-group">\
		<label for="address">Restaurant\'s Street Address</label>\
		<input id="address" class="form-control" type="text" placeholder="Ex. 1 Infinite Loop">\
	</div>\
	<div class="form-group">\
		<label for="city">Restaurant\'s City</label>\
		<input id="city" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="signatureEntree">Signature Entrée</label>\
		<input id="signatureEntree" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="signatureDrink">Signature Drink</label>\
		<input id="signatureDrink" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<button type="submit" class="btn btn-success">Save It</button>\
';

restaurantApp.Templates.RestaurantEditTemplate = '\
	<div class="form-group">\
		<label for="name">Restaurant Name</label>\
		<input <% if (name !== undefined) { %>value="<%= name %>"<% } %> id="name" class="form-control" type="text" placeholder="Ex. Bob\' Big Boy">\
	</div>\
	<div class="form-group">\
		<label for="address">Restaurant\'s Street Address</label>\
		<input <% if (address !== undefined) { %>value="<%= address %>"<% } %> id="address" class="form-control" type="text" placeholder="Ex. 1 Infinite Loop">\
	</div>\
	<div class="form-group">\
		<label for="city">Restaurant\'s City</label>\
		<input <% if (city !== undefined) { %>value="<%= city %>"<% } %> id="city" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="signatureEntree">Signature Entrée</label>\
		<input <% if (signatures[0].name !== undefined) { %>value="<%= signatures[0].name %>"<% } %> id="signatureEntree" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<div class="form-group">\
		<label for="signatureDrink">Signature Drink</label>\
		<input <% if (signatures[1].name !== undefined) { %>value="<%= signatures[1].name %>"<% } %> id="signatureDrink" class="form-control" type="text" placeholder="Ex. San Jose">\
	</div>\
	<button type="submit" class="btn btn-success">Save It</button>\
';