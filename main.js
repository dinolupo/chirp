// load external libraries
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var cors = require('cors')();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
// var multer = require('multer');
// app.use(multer);
// for parsing multipart/form-data

// load application libraries
var config = require('./util/config');
var logger = require('./util/logger')();
var helper = require('./util/helper')(logger);

// create the application context
var context = {
    config: config,
    util: helper,
    app: app,
    logger: logger
};

// open a mongodb connection
var mongoClient = require('mongodb').MongoClient;
mongoClient.connect(config.mongodb.connectionString, { db: { bufferMaxEntries: 0 } },
  function (err, db) {
    if(err) {
      logger.error(err.message);
      process.exit(1);
    }

    context.db = db;    // add the db connection to context

    // enable cors
    app.use(config.server.api,cors);

    // static content
    app.use('/', express.static( __dirname + '/wwwroot', { 'dotfiles':'ignore' }));

    app.use(function(req,res,next) {
      logger.debug("[%s] request at [%s].", req.method, req.url);
      next();
    });

    // load the routes
    fs.readdirSync('./routes/').forEach(function(name) {
      require('./routes/'+name)(context);
    });

    // set io connection
    io.on('connection', function(socket){
      logger.debug('Client connected');
      socket.on('disconnect', function(){
        console.log('Client disconnected');
      });
      socket.on('postmessage', function(data){
        logger.debug('Broadcast <postmessage> event from [%s]', data);
        io.emit('postmessage', data);
      });
    });

    // set not find and error behaviors
    app.use( context.util.action.notfoundResult );
    app.use( context.util.action.errorResult );

    // start server
    var port = process.env.PORT || 3000;
    http.listen(port, function() {
      logger.info('Server listening on port %s', port);
    });
});
