module.exports = function(ctx)
{
    var limit = ctx.config.limit;
    var baseurl = ctx.config.server.api;

    var posts = ctx.db.collection('posts');
    var users = ctx.db.collection('users');

    var userFields = {'_id':1,'username':1,'displayname':1,'image':1,'email':1,'following':1};

    // get the user using login and password
    ctx.app.get( baseurl + '/user/authenticate/:username/:password', function(req,res)
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

                        ctx.jsonResponse(req,res,{'result':1,'user':{
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
                ctx.jsonResponse(req,res,{'result':0});
            }
        });
    });

    // get the user using a token
    ctx.app.get( baseurl + '/user/access/:token', function(req,res)
    {
        var token = req.params.token;

        users.findOne({'username':token},{'fields':userFields},function(err, data)
        {
            if (data) {
                if (err) throw err;

                users.find({'following': data._id})
                     .toArray(function (err, items) {
                        if (err) throw err;

                        ctx.jsonResponse(req,res,{'result':1,'user':{
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
                ctx.jsonResponse(req,res,{'result':0});
            }
        });
    });
}