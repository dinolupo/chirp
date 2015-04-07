(function(){

    var appContext = function(){};

    require('./util/config')(appContext);
    require("./util/logger")(appContext);
    require("./util/responseGenerator")(appContext);

    var express = require('express');
    var app = express();
    appContext.app = app;

    var bodyParser = require('body-parser');
    var multer = require('multer');
    var mongoClient = require('mongodb').MongoClient;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(multer()); // for parsing multipart/form-data
    app.use(appContext.config.server.api,require('cors')());

    mongoClient.connect(appContext.config.mongodb.connectionString, function (err, db)
    {
        if (err) throw err;
        appContext.db = db;

        // configure static pages
        app.use('/', express.static(__dirname + '/static', {"dotfiles":"ignore"}));

        app.use(function(req,res,next){
            appContext.logger.debug("Arrived a [%s] request at [%s].",req.method,req.url);
            next();
        });

        // configure the routes
        var routes = ['post','user'];
        routes.forEach(function(route){
            require('./routes/'+route)(appContext);
        });

        // custom 404 page
        app.use(function(req, res) {
            appContext.sendNotFound(req,res);
        });

        // custom 500 page
        app.use(function(err,req,res,next) {
            appContext.sendError(err,req,res);
        });

        var port = process.env.PORT || 3000;
        app.listen(port, function () {
            appContext.logger.info('Server listening on port %s', port);
        });
    });

})()
