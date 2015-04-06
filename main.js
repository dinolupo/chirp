(function() {
    var config = require('./util/config');
    var express = require('express');
    var app = express();
    var logger = require("./util/logger");

    var bodyParser = require('body-parser');
    var multer = require('multer');
    var mongoClient = require('mongodb').MongoClient;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    app.use(config.server.api,require('cors')());

    mongoClient.connect(config.mongodb.connectionString, function (err, db)
    {
        if (err) throw err;

        // configure static pages
        app.use('/', express.static(__dirname + '/static', {
            "dotfiles":"ignore"
        }));

        app.use(function(req,res,next){
            logger.debug("Arrived a [%s] request at [%s].",req.method,req.url);
            next();
        });

        // configure the routes
        var routes = ['post','user'];
        routes.forEach(function(route){
            require('./routes/'+route)(app,db,logger,config);
        });

        // custom 404 page
        app.use(function(req, res) {
            logger.debug('Not found request [%s]',req.url);
            res.status(404).jsonp({ error: '404 - Not Found' });
        });

        // custom 500 page
        app.use(function(err,req,res,next) {
            logger.error('Error on request [%s], stack [%s]',req.url,err.stack);
            next(err);
        },function(err,req,res) {
            res.status(500).jsonp({ error: err });
        });

        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            logger.info('Server listening on port %s', port);
        });
    });
})();