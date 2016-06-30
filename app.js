/**
 * Module dependencies
 */

var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('error-handler'),
	logger = require('morgan');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

// development only
if (app.get('env') === 'development') {
  	app.use(errorHandler);
}

// production only
if (app.get('env') === 'production') {
  	// TODO
};


/**
 * Routes
 */

// JSON API
app.get('/api/name', api.name);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  	console.log('Express server listening on port ' + app.get('port'));
});