/* jshint esnext: true */
/* jslint node: true */

module.exports = (ctx)=>
{
    var limit = ctx.config.server.limit;
    var baseurl = ctx.config.server.api + '/post';

    //var postListFields = {'username':1,'displayname':1,'timestamp':1,'text':1,'image':1,'parentid':1};
    var userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

    // get items posted to public timeline
    ctx.app.get( baseurl + '/public', (req,res) => {
        ctx.db.collection('posts').find({'repostid':{$exists: false, $eq: null}}) // only original post
                                  .limit(limit)
                                  .sort({'timestamp':-1}) // order by timestamp desc
                                  .toArray((err,data)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);

                var panelcolors = ['primary','default','success','info','warning','danger'];
                var textcolors = ['white','red','blue','blue','red','blue'];

                data.forEach((element,index)=> {
                  element.text = ctx.util.string.bodyProcess(element.text); // process the body
                  element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                  element.panelcolor = panelcolors[index % 6];
                  element.textcolor = textcolors[index % 6];
                  //ctx.logger.debug(element);
                });

                ctx.util.action.jsonResult(req,res,data);
            });
    });

    // get items posted to user timeline
    ctx.app.get( baseurl + '/home/:username', (req,res) => {
        var username = req.params.username;

        ctx.db.collection('users').findOne({'username':username},{'fields':userSearchFields},(err,data)=>{
            if (data) {
                data.following.push(data._id); // add my id for showing also my posts
                ctx.db.collection('posts').find({'ownerid':{ $in:data.following}},{'limit':limit,'sort':{'timestamp':-1}})
                    .toArray((err,items)=> {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        items.forEach((element)=>{
                          element.text = ctx.util.string.bodyProcess(element.text); // process the body
                          if(element.repostid!==undefined) { // check if repost
                            element.isrepost = true;
                          }
                          else {
                            element.isrepost = false;
                          }
                          element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                          //ctx.logger.debug(element);
                        });
                        ctx.util.action.jsonResult(req,res,items);
                    });
            }
            else {
                ctx.util.action.okResult(req, res);
            }
        });
    });

    // get the items posted from an user
    ctx.app.get( baseurl + '/:username',(req,res) => {
        var username = req.params.username;

        ctx.db.collection('posts').find({'username': username},{'sort':{'timestamp':-1}})
            .toArray((err,items)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);
                ctx.util.action.jsonResult(req, res, items);
            });
    });

    // post a new message
    ctx.app.post( baseurl, (req,res) => {
        var username = req.body.username;
        var text = req.body.text;

        ctx.db.collection('users').findOne(
          {'username':username},
          {'fields':userSearchFields},
          (err,data)=> {
                if(err) return ctx.util.action.errorResult(err.message,req,res);
                if (data) {
                    var ObjectID = require('mongodb').ObjectID;
                    var newPost = {
                        "_id": new ObjectID().toString(),
                        "username": username,
                        "ownerid": data._id,
                        "displayname": data.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": data.image,
                        "text": text
                    };
                    ctx.db.collection('posts').save(newPost,(err)=>
                    {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        ctx.util.action.okResult(req,res);
                    });
                }
            });
      });
      // post a new message
      ctx.app.post( baseurl + '/repost', (req,res) => {
          var username = req.body.username;
          var id = req.body.id;

          ctx.logger.debug('Called repost with params: %s %s',username,id);

          // check the user that wants to repost
          ctx.db.collection('users').findOne(
            {'username':username},
            {'fields':userSearchFields},
            (err,user)=> {
                  if(err) return ctx.util.action.errorResult(err.message,req,res);
                  if (user) {
                      var ObjectID = require('mongodb').ObjectID;
                      // check the post to repost
                      ctx.db.collection('posts').findOne({'_id':id},(err,post)=> {
                        if(err) return ctx.util.action.errorResult(err.message,req,res);
                        var newPost = {
                            "_id": new ObjectID().toString(),
                            "username": post.username,
                            "ownerid": user._id,
                            "repostid": post._id,
                            "repostdisplayname": user.displayname,
                            "repostusername": username,
                            "displayname": post.displayname,
                            "timestamp": new Date().toISOString(),
                            "image": post.image,
                            "text": post.text
                        };

                        ctx.db.collection('posts').save(newPost,(err)=>
                        {
                            if(err) return ctx.util.action.errorResult(err.message,req,res);
                            ctx.util.action.okResult(req,res);
                        });
                      });
                  }
              });
        });
};
