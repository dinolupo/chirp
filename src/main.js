//(function() {
    var config = require('./config');
    var logger = require('./logger')();
    var util = require('./util')(logger);

    var fs = require('fs');
    var express = require('express');
    var app = express();

    // create the context
    var context =
    {
        config: config,
        util: util,
        app: app
    };

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    // var multer = require('multer');
    // app.use(multer);
    // for parsing multipart/form-data

    var mongoClient = require('mongodb').MongoClient;

    app.use(config.server.api,require('cors')());

    mongoClient.connect(config.mongodb.connectionString, { db: { bufferMaxEntries: 0 } },
      function (err, db) {
        if(err) {
          logger.error(err.message);
          process.exit(1);
        }

        context.db = db;    // set the current db connection

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

        app.use( context.util.action.notfoundResult );

        app.use( context.util.action.errorResult );

        var port = process.env.PORT || 3000;
        app.listen(port, function() {
            logger.info('Server listening on port %s', port);
        });
    });

//})();
