
var config = require('./config');
var app = require('express')();
var logger = require("./utils/logger");

//logger.debug("Overriding 'Express' logger");
//app.use(require('morgan')({ "stream": logger.stream }));

var bodyParser = require('body-parser');
var multer = require('multer');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var routes = require('./routes')(app,config);

var server = app.listen(config.server.port, function()
{
    logger.info( 'Chirp server listening on port %s', config.server.port);
});