// dependencies
var express = require('express'),
	path = require('path'),
	mongodb = require('mongodb');

// configure server
var app = express();
var port = 3005;
app.use(express.static(path.join( __dirname, 'src')));

// start server
app.listen(port, function() {
	console.log('Server running on port ', port, '...');
});