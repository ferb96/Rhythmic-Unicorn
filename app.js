// Connect to the database
require('./api/db.js');

// all the requires
//var jsonfile = require('jsonfile');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
//var request = require('request');

// this is the whole app
var app = express();

var routes = require('./api/index.js');

// this server gonna run on this port
app.set('port', 8080);

// logging out all the access
app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});

// Connect to Spotify
app.locals.spotify = require('./api/spot.js')();

// global variables
app.locals.spotifyy = {
	id64: 'ZWM1NDQ5ZjEwYTUzNGRmZDgwODkwY2Y5NmEzMmEzNWU6MWM0NmQ0ZjVmMzAxNDZhNzk4Nzc3YTE3MzcyZjYzZmU=',
	token: 'nowaythisisgoingtowork',
	expire: 0
};

// global variables
//app.locals.spotify = {};

// static directory
app.use(express.static(path.join(__dirname, 'html')));
// node modules
app.use('/node_modules', express.static(path.join(__dirname,'/node_modules')));
// enable parser so it can read POST
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(bodyParser.json());


//var ctrl = require('./api/controllers.js');

// Ad routing 
app.use('/api', routes);

// app.
// 	route('/api/getSpotifyToken').
// 	get(ctrl.getToken);

// app. 
// 	route('/api/addSong').
// 	get(ctrl.songsAddOne);

// Listen for requests
var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
	console.log("Magic happens on port " + port);
});
