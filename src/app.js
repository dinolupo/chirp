(function() {

    var config = require('./util/config');
    var logger = require("./util/logger")();
    var helper = require("./util/helper")(logger);

    var express = require('express');

    // create the context
    var context =
    {
        config: config,
        helper: helper,
        app: express()
    };

    var bodyParser = require('body-parser');
    var multer = require('multer');
    var mongoClient = require('mongodb').MongoClient;

    context.app.use(bodyParser.json());
    context.app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    context.app.use(multer()); // for parsing multipart/form-data
    context.app.use(config.server.api,require('cors')());

    mongoClient.connect(config.mongodb.connectionString, function (err, db) {
        if (err) throw err;

        context.db = db;    // set the current db connection

        // configure static pages
        context.app.use('/', express.static(__dirname + '/static', {"dotfiles":"ignore"}));

        context.app.use(function(req,res,next) {
            logger.debug("Arrived a [%s] request at [%s].",req.method,req.url);
            next();
        });

        // configure the routes
        var routes = ['post','user'];
        routes.forEach(function(route) {
            require('./routes/'+route)(context);
        });

        // custom 404 page
        context.app.use(function(req, res) {
            helper.sendNotFound(req,res);
        });

        // custom 500 page
        context.app.use(function(err,req,res) {
            helper.sendError(err,req,res);
        });

        var port = process.env.PORT || 3000;
        context.app.listen(port, function() {
            logger.info('Server listening on port %s', port);
        });
    });

})();
