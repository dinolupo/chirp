module.exports = function(ctx)
{
    var limit = ctx.config.server.limit;
    var baseurl = ctx.config.server.api + '/post';

    var postListFields = {'username':1,'displayname':1,'timestamp':1,'text':1,'image':1};
    var userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

    // get items posted to public timeline
    ctx.app.get( baseurl + '/public', function(req,res) {
        ctx.db.collection('posts').find({},{'limit':limit,'fields': postListFields,'sort': {'timestamp':-1}})
            .toArray(function(err,data) {
                if(err) return ctx.util.action.errorResult(err.message,req,res);

                ctx.util.action.jsonResult(req,res,data);
            });
    });

    // get items posted to user timeline
    ctx.app.get( baseurl + '/home/:token', function(req,res) {
        var token = req.params.token;

        ctx.db.collection('users').findOne({'username':token},{'limit':limit,'fields':userSearchFields}, function(err, data) {
            if (data) {
                data.following.push(data._id); // add my id for showing also my posts
                ctx.db.collection('posts').find({'ownerid':{ $in:data.following}},{'fields': postListFields,'sort':{'timestamp':-1}})
                    .toArray(function (err, items) {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);

                        ctx.util.action.jsonResult(req,res,items);
                    });
            }
            else {
                ctx.util.action.okResult(req, res);
            }
        });
    });

    // get the items posted from an user
    ctx.app.get( baseurl + '/:username', function(req,res) {
        var username = req.params.username;

        ctx.db.collection('posts').find({'username': username},{'fields': postListFields,'sort': {'timestamp':-1}})
            .toArray(function (err, items) {
                if(err) return ctx.util.action.errorResult(err.message,req,res);

                ctx.util.action.jsonResult(req, res, items);
            });
    });

    // post a new message
    ctx.app.post( baseurl, function(req,res) {
        var username = req.body.username;
        var text = req.body.text;

        ctx.db.collection('users').findOne(
          {'username':username},
          {'fields':userSearchFields},
          function(err,data) {
                if(err) return ctx.util.action.errorResult(err.message,req,res);

                if (data) {
                    var newPost = {
                        "username": username,
                        "ownerid": data._id,
                        "displayname": data.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": data.image,
                        "text": text
                    };

                    ctx.db.collection('posts').save(newPost, function(err)
                    {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);

                        ctx.util.action.okResult(req,res);
                    });
                }
            });
    });
};
