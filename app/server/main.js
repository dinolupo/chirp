
var express = require('express');
var config = require('./config');
var app = express();
var routes = require('./routes')(app,config);

var server = app.listen(config.server.port, function()
{
    console.log('Chirp server listening on port ' + config.server.port);
});