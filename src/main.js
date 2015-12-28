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

    //var multer = require('multer');
    //app.use(multer); // for parsing multipart/form-data

    var mongoClient = require('mongodb').MongoClient;

    app.use(config.server.api,require('cors')());

    mongoClient.connect(config.mongodb.connectionString, function (err, db) {
        if (err) throw err;

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

        // custom response for error 404
        /*app.use(function(req, res) {
            logger.error('Error 404 at [%s]', req.url);
            res.status(404).jsonp({
              message: '404 - Not found'
            });
        });*/

        app.use( context.util.action.notfoundResult );

        // custom response for error 500
        /*app.use(function(err,req,res) {
            logger.error('Error 500 at [%s] details [%s]', req.url, err );
            res.status(500).jsonp({
              message: '500 - Server error'
            });
        });*/

        app.use( context.util.action.errorResult );


        var port = process.env.PORT || 3000;
        app.listen(port, function() {
            logger.info('Server listening on port %s', port);
        });
    });

//})();
