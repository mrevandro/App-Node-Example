
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var routes = require('./server/routes/index');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + 'views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/client/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use('/css',express.static(path.join(__dirname, 'client/public/css')));
app.use('/js',express.static(path.join(__dirname, 'client/public/js')));
app.use('/bootstrap',express.static(path.join(__dirname, '/bower_components/bootstrap')));
app.use('/jquery',express.static(path.join(__dirname, '/bower_components/jquery/dist')));
app.use('/angular',express.static(path.join(__dirname, '/bower_components/angular')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use('/', routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;