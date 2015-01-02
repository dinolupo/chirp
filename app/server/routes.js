module.exports = function(app,config)
{
    var logger = require("./utils/logger");
    var mongoose = require('mongoose');
    var dataManager = require('./utils/data')(mongoose,config);
    var model = require('./models')(mongoose);

    var errorHandler = function(err,req,res){
        logger.error('Error request [%s], stack [%s]',req.url,err.stack);

        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    };

    var forbiddenHandler = function(req,res){
        logger.debug('Forbidden request [%s]',req.url);

        res.type('text/plain');
        res.status(403);
        res.send('403 - Forbidden');
    };

    // enable cross site requests
    app.use( config.server.api, require('cors')());

    app.post( config.server.api + '/authenticate', function(req, res)
    {
        logger.debug('Post request [%s]',req.url);

        var login = req.body.username;
        var pass = req.body.password;

        if( (typeof login == 'undefined') || (typeof pass == 'undefined') )
        {
            forbiddenHandler(req,res);
        }

        dataManager.open(function () {
            model.User.findOne({ username: login, password: pass })
                .limit(config.server.limit)
                .exec(function (err, data) {
                    dataManager.close();

                    if(err) errorHandler(err, req, res);

                    if(data===null) forbiddenHandler(req,res);
                    else {
                        res.json({
                            username: data.username,
                            displayname: data.displayname,
                            imageurl: config.client.website + '/images/users/' + data.imagefile,
                            email: data.email,
                            followers: data.followers,
                            following: data.following
                         });
                    }
                });
        });
    });

    // get the items posted
    app.get( config.server.api + '/public', function(req, res)
    {
        logger.debug('Get request [%s]',req.url);

        dataManager.open(function() {
            model.Chirp.find()
                .$where('this.creator == this.owner')
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    dataManager.close();

                    if (err) errorHandler(err,req,res);
                    res.json(data.map(function(o){
                       return {
                           user: o.displayname,
                           imageurl: config.client.website + '/images/users/' + o.imagefile,
                           date: o.date,
                           body: o.text
                       }
                    }));
                });
        });
    });

    // get the items posted from an user and followings
    app.get( config.server.api + '/home/:username', function(req, res)
    {
        logger.debug('Get request [%s]',req.url);

        dataManager.open(function() {
            model.Chirp.find({owner: req.params.username})
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    dataManager.close();

                    if (err) errorHandler(err,req,res);
                    res.json(data.map(function(o){
                        return {
                            user: o.displayname,
                            imageurl: config.client.website + '/images/users/' + o.imagefile,
                            date: o.date,
                            body: o.text
                        }
                    }));
                });
        });
    });

    // get the items posted from an user
    app.get( config.server.api + '/chirps/:username', function(req, res)
    {
        logger.debug('Get request [%s]',req.url);

        dataManager.open(function() {
            model.Chirp.find({creator: req.params.username})
                .$where('this.creator == this.owner')
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    dataManager.close();

                    if (err) errorHandler(err,req,res);
                    res.json(data.map(function(o){
                        return {
                            user: o.displayname,
                            imageurl: config.client.website + '/images/users/' + o.imagefile,
                            date: o.date,
                            body: o.text
                        }
                    }));
                });
        });
    });

    // todo: add save feature
    /*app.post( config.server.api + '/users', function(req,content,cb)
    {
    });*/

    // custom 404 page
    app.use(function(req, res){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

    // custom 500 page
    app.use(function(err, req, res, next){
        errorHandler(err,req,res);
    });
}
