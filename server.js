// dependencies
var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose');

// configure server
var app = express();
var port = 3005;
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( __dirname, 'src') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// connect to the database
mongoose.connect('mongodb://user:password@ds029307.mongolab.com:29307/restaurant-finder', function(err, db) {
	if(err) {
		console.log('Error: ', err);
	} else {
		console.log('Database connected...');
	}
});

// schema
var Restaurant = new mongoose.Schema({
	id: Number,
	name: String,
	city: String,
	address: String,
	main_image: String,
	signatures: [
		{
			type: String,
			name: String
		}
	],
	specials: [
		{
			weekday: String,
			details: [
				{
					title: String,
					type: String,
					time: String,
					description: String
				}
			]
		}
	]
});

// models
var RestaurantModel = mongoose.model('Restaurant', Restaurant);

// start server
app.listen(port, function() {
	console.log('Server running on port ', port, '...');
});

// routes
app.get('/api/restaurants', function(req, res) {
	return RestaurantModel.find(function(err, restaurants) {
		if (err) {
			return console.log('Error: ', err);
		} else {
			return res.send(restaurants);
		}
	});
});

app.post('/api/restaurants', function(req, res) {
	var restaurant = new RestaurantModel({
		id: req.body.id,
		name: req.body.name,
		city: req.body.city,
		address: req.body.address,
		main_image: req.body.main_image,
		signatures: [
			{ 
				type: 'Entrée',
				name: req.body.entree
			},
			{ 
				type: 'Drink',
				name: req.body.drink
			},
		]
	});
	restaurant.save(function(err) {
		if (err) {
			return console.log('Error: ', err);
		} else {
			console.log('Created');
			return res.send(restaurant);
		}
	});
});