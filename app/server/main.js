
var config = require('./config');

var app = require('express')();

var bodyParser = require('body-parser');
var multer = require('multer');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var routes = require('./routes')(app,config);

var server = app.listen(config.server.port, function()
{
    console.log('Chirp server listening on port ' + config.server.port);
});