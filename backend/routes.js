module.exports = function(app,db,logger,config)
{
    var users = db.collection('users');
    var posts = db.collection('posts');

    var postListFields = {'displayname':1,'timestamp':1,'text':1,'image':1};
    var userListFields = {'username':1,'displayname':1,'image':1,'email':1};
    var userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

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
    app.get( config.server.api + '/public', function(req,res)
    {
        posts.find({},{'limit':config.limit,'fields': postListFields,'sort': {'timestamp':-1}})
            .toArray(function(err,data) {
                if(err) throw err;

                jsonResponse(req,res,data);
            });
    });

    // get items posted from an user and followings
    app.get( config.server.api + '/home/:username', function(req,res)
    {
        var username = req.params.username;

        users.findOne({'username': username}, {'limit':config.limit,'fields': {'_id': 1}},
            function(err, data) {
                if (data) {
                    posts.find({'targetusers': data._id},{'fields': postListFields,'sort': {'timestamp':-1}})
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
    app.get( config.server.api + '/post/:username', function(req,res)
    {
        var username = req.params.username;

        users.findOne({'username': username}, {'limit':config.limit,'fields': {'_id': 1}},
            function(err, data) {
                if (data) {
                    posts.find({'sourceuser': data._id},{'fields': postListFields,'sort': {'timestamp':-1}})
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

    // post a new post
    app.post( config.server.api + '/post', function(req,res)
    {
        var username = req.body.username;
        var text = req.body.text;

        users.findOne(  {'username':username},{'fields':userSearchFields},
            function(err,data) {
                if (data) {
                    var newPost = {
                        "sourceuser": data._id,
                        "targetusers": data.following,
                        "displayname": data.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": data.image,
                        "text": text
                    };

                    newPost.targetusers.push(data._id);

                    posts.save(newPost,function(err,result){
                        if(err) throw err;

                        jsonResponse(req,res,{'result':1});
                    });
                }
                else {
                    jsonResponse(req,res,{'result':0});
                }
            });
    });
}
