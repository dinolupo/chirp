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

    var postListFields = {'displayname':1,'timestamp':1,'text':1,'image':1};
    var userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

    // get items posted on public timeline
    app.get( config.server.api + '/post/public', function(req,res)
    {
        posts.find({},{'limit':config.limit,'fields': postListFields,'sort': {'timestamp':-1}})
            .toArray(function(err,data) {
                if(err) throw err;

                jsonResponse(req,res,data);
            });
    });

    // get items posted on user timeline
    app.get( config.server.api + '/post/home/:token', function(req,res)
    {
        var token = req.params.token;

        users.findOne({'username':token},{'limit':config.limit,'fields':{'_id': 1}},function(err, data)
        {
            if (data) {
                posts.find({'targetusers': data._id},{'fields': postListFields,'sort':{'timestamp':-1}})
                    .toArray(function (err, items) {
                        if (err) throw err;

                        jsonResponse(req,res,items);
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

                            sonResponse(req, res, items);
                        });
                }
                else {
                    jsonResponse(req, res);
                }
            });
    });

    // post a new message
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

                    posts.save(newPost,function(err)
                    {
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