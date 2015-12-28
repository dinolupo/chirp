var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var config = require('./config');
var logger = require('./logger')();
var util = require('./util')(logger);

// create the context
var context = {
    config: config,
    util: util,
    app: app
};

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(config.server.api,require('cors')());
// var multer = require('multer');
// app.use(multer);
// for parsing multipart/form-data

var mongoClient = require('mongodb').MongoClient;

mongoClient.connect(config.mongodb.connectionString, { db: { bufferMaxEntries: 0 } },
  function (err, db) {
    if(err) {
      logger.error(err.message);
      process.exit(1);
    }

    context.db = db;    // add the db connection to context

    // configure static pages
    app.use('/', express.static( __dirname + '/public', { 'dotfiles':'ignore' }));

    app.use(function(req,res,next) {
      logger.debug("[%s] request at [%s].", req.method, req.url);
      next();
    });

    // configure the routes
    fs.readdirSync('./routes/').forEach(function(name) {
      require('./routes/'+name)(context);
    });

    // set io connection
    io.on('connection', function(socket){
      logger.info('a user connected');
    });

    app.use( context.util.action.notfoundResult );
    app.use( context.util.action.errorResult );

    var port = process.env.PORT || 3000;
    http.listen(port, function() {
      logger.info('Server listening on port %s', port);
    });
});
