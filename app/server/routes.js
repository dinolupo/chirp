module.exports = function(app,config)
{
    var mongoose = require('mongoose');
    var dataManager = require('./data')(mongoose,config);
    var model = require('./models')(mongoose);

    var errorHandler = function(err,req,res){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    };

    // enable cross site requests
    app.use( config.server.api, require('cors')());

    app.get( config.server.api + '/users', function(req, res)
    {
        dataManager.open(function() {
            model.User.find()
                .limit(config.server.limit)
                .exec(function (err, data) {
                    if (err) errorHandler(err,req,res);
                    res.json(data);
                    dataManager.close();
                });
        });
    });

    // get the items posted
    app.get( config.server.api + '/public', function(req, res)
    {
        dataManager.open(function() {
            model.Chirp.find()
                .$where('this._creator == this._owner')
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    if (err) errorHandler(err,req,res);
                    res.json(data);
                    dataManager.close();
                });
        });
    });

    // get the items posted from an user and followings
    app.get( config.server.api + '/home/:username', function(req, res)
    {
        dataManager.open(function() {
            model.Chirp.find({_owner: req.params.username})
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    if (err) errorHandler(err,req,res);
                    res.json(data);
                    dataManager.close();
                });
        });
    });

    // get the items posted from an user
    app.get( config.server.api + '/chirps/:username', function(req, res)
    {
        dataManager.open(function() {
            model.Chirp.find({_creator: req.params.username})
                .$where('this._creator == this._owner')
                .limit(config.server.limit)
                .sort('-date')
                .exec(function (err, data) {
                    if (err) errorHandler(err,req,res);
                    res.json(data);
                    dataManager.close();
                });
        });
    });

    app.post( config.server.api + '/users', function(req,content,cb)
    {
        // todo: add save feature
    });

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
