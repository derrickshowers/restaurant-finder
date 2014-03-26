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
	urlName: String,
	signatures: [],
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
app.get('/api', function(req, res) {
	return RestaurantModel.find(function(err, restaurants) {
		if (err) {
			return console.log('Error: ', err);
		} else {
			return res.send(restaurants);
		}
	});
});

app.get('/api/:id', function(req, res) {
	console.log(req.params.id);
});

app.post('/api/save', function(req, res) {
	var restaurant = new RestaurantModel({
		name: req.body.name,
		city: req.body.city,
		address: req.body.address,
		main_image: req.body.main_image,
		urlName: req.body.urlName,
		signatures: req.body.signatures
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

app.put('/api/save', function(req, res) {
	RestaurantModel.findById(req.body._id, function(err, restaurant) {
		if (err) {
			console.log('Error: ', err);
		} else {
			restaurant.name = req.body.name;
			restaurant.city = req.body.city;
			restaurant.address = req.body.address;
			restaurant.main_image = req.body.main_image;
			restaurant.urlName = req.body.urlName;

			restaurant.save(function(err) {
				if (err) {
					console.log('Error: ', err);
				} else {
					console.log('Restaurant Updated');
					return res.send(restaurant);
				}
			});
		}
	});
});

app.delete('/api/delete/:id', function(req, res) {
	RestaurantModel.findById(req.params.id, function(err, restaurant) {
		if (err) {
			console.log('Error: ', err);
		} else {
			restaurant.remove(function(err) {
				if (err) {
					console.log('Error: ', err);
				} else {
					console.log('Restaurant Removed');
					return res.send('');
				}
			});
		}
	});
});