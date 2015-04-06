module.exports = function(app,db,logger,config)
{
    var forbiddenResponse = function(req,res)
    {
        logger.debug('Forbidden request [%s]',req.url);
        res.type('text/plain');
        res.status(403);
        res.send('403 - Forbidden');
    };

    var jsonResponse = function(req,res,data)
    {
        if(data) {
            logger.debug('Response at [%s] with %s',req.url, JSON.stringify(data));
            res.jsonp(data);
        }
        else {
            logger.debug('Response at [%s] with {}',req.url);
            res.jsonp({});
        }
    };

    var posts = db.collection('posts');
    var users = db.collection('users');

    var userFields = {'_id':1,'username':1,'displayname':1,'image':1,'email':1,'following':1};

    // get the user using login and password
    app.get( config.server.api + '/user/authenticate/:username/:password', function(req,res)
    {
        var username = req.params.username;
        var password = req.params.password;

        users.findOne({'username':username,'password':password},{'fields':userFields},function(err,data)
        {
            if (data) {
                if(err) throw err;

                users.find({'following': data._id})
                    .toArray(function (err, items) {
                        if (err) throw err;

                        jsonResponse(req,res,{'result':1,'user':{
                            "username": data.username,
                            "displayname": data.displayname,
                            "password": data.password,
                            "email": data.email,
                            "image": data.image ,
                            "followingcount": data.following.length,
                            "followercount": items.length
                        }});
                    });
            }
            else {
                jsonResponse(req,res,{'result':0});
            }
        });
    });

    // get the user using a token
    app.get( config.server.api + '/user/access/:token', function(req,res)
    {
        var token = req.params.token;

        users.findOne({'username':token},{'fields':userFields},function(err, data)
        {
            if (data) {
                if (err) throw err;

                users.find({'following': data._id})
                    .toArray(function (err, items) {
                        if (err) throw err;

                        jsonResponse(req,res,{'result':1,'user':{
                            "username": data.username,
                            "displayname": data.displayname,
                            "password": data.password,
                            "email": data.email,
                            "image": data.image ,
                            "followingcount": data.following.length,
                            "followercount": items.length
                        }});
                    });
            }
            else {
                jsonResponse(req,res,{'result':0});
            }
        });
    });
}