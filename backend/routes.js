module.exports = function(app,db,logger,config)
{
    var users = db.collection('users');
    var posts = db.collection('posts');

    var forbiddenResponse = function(req,res)
    {
        logger.debug('Forbidden request [%s]',req.url);

        res.type('text/plain');
        res.status(403);
        res.send('403 - Forbidden');
    };

    var jsonResponse = function(req,res,data)
    {
        logger.debug('Json response [%s]',req.url);

        if(data) {
            res.jsonp(data);
        }
        else {
            res.jsonp({});
        }
    }

    /*app.post( config.server.api + '/authenticate', function(req, res)
    {
        var login = req.body.username;
        var pass = req.body.password;
        if( (typeof login == 'undefined') || (typeof pass == 'undefined') )
        {
            forbiddenHandler(req,res);
        }
    });*/

    // get items posted
    app.get( config.server.api + '/public', function(req, res)
    {
        posts.find({},{'fields':{'_id':0,'users':0}})
            .toArray(function(err,data) {
                if(err) throw err;

                jsonResponse(req,res,data);
            });
    });

    // get items posted from an user and followings
    app.get( config.server.api + '/home/:username', function(req, res)
    {
        var username = req.params.username;

        users.findOne({'uname': username}, {'fields': {'_id': 1}},
            function(err, data) {
                if (data) {
                    posts.find({'users': data._id},{'fields': {'fromuser': 1, 'timestamp': 1, 'text': 1}})
                        .toArray(function (err, items) {
                            if (err) throw err;

                            jsonResponse(req, res, items);
                        });
                }
                else {
                    jsonResponse(req, res);
                }
            });
    });

    // get the items posted from an user
    /*app.get( config.server.api + '/chirps/:username', function(req, res)
    {
    });*/

    // todo: add save feature
    /*app.post( config.server.api + '/users', function(req,content,cb)
    {
    });*/
}
