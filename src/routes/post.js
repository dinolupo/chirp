"use strict"

module.exports = (ctx)=>
{
    const router = require('express').Router();
    const limit = ctx.config.server.limit;
    const baseurl = ctx.config.server.api + '/post';
    const userSearchFields = {'_id':1,'following':1,'displayname':1,'image':1};

    // get items posted to public timeline
    router.get( baseurl + '/public',(req,res) =>
    {
        ctx.db.collection('posts').find({'repostid':{$exists: false, $eq: null}}) // only original post
                                  .limit(limit)
                                  .sort({'timestamp':-1}) // order by timestamp desc
                                  .toArray((err,data)=> {
                if(err) return ctx.helper.action.errorResult(err.message,req,res);

                const panelcolors = ['primary','default','success','info','warning','danger'];
                const textcolors = ['white','red','blue','blue','red','blue'];

                data.forEach((element,index)=> {
                    element.text = ctx.helper.string.bodyProcess(element.text); // process the body
                    element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                    element.panelcolor = panelcolors[index % 6];
                    element.textcolor = textcolors[index % 6];
                });

                ctx.helper.action.jsonResult(req,res,data);
            });
    });

    // get items posted to user timeline
    router.get( baseurl + '/home/:username',(req,res) =>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},{'fields':userSearchFields},(err,data)=>
        {
            if (data) {
                data.following.push(data._id); // add my id for showing also my posts
                ctx.db.collection('posts').find({'ownerid':{ $in:data.following}},{'limit':limit,'sort':{'timestamp':-1}})
                    .toArray((err,items)=> {
                        if(err) return ctx.helper.action.errorResult(err.message,req,res);
                        items.forEach((element)=>
                        {
                          element.text = ctx.helper.string.bodyProcess(element.text); // process the body
                          if(element.repostid!==undefined) { // check if repost
                            element.isrepost = true;
                          }
                          else {
                            element.isrepost = false;
                          }
                          element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                          //ctx.logger.debug(element);
                        });
                        ctx.helper.action.jsonResult(req,res,items);
                    });
            }
            else {
                ctx.helper.action.okResult(req, res);
            }
        });
    });

    // get the items posted from an user
    router.get( baseurl + '/:username',(req,res) =>
    {
        ctx.db.collection('posts').find({'username': req.params.username},{'sort':{'timestamp':-1}})
            .toArray((err,items)=> {
                if(err) return ctx.helper.action.errorResult(err.message,req,res);
                ctx.helper.action.jsonResult(req, res, items);
            });
    });

    // post a new message
    router.post( baseurl,(req,res) =>
    {
        ctx.db.collection('users').findOne({'username':req.body.username}, {'fields':userSearchFields},(err,data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                var ObjectID = require('mongodb').ObjectID;
                var newPost = {
                    "_id": new ObjectID().toString(),
                    "username": req.body.username,
                    "ownerid": data._id,
                    "displayname": data.displayname,
                    "timestamp": new Date().toISOString(),
                    "image": data.image,
                    "text": req.body.text
                };
                ctx.db.collection('posts').save(newPost,(err)=>
                {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);
                    ctx.helper.action.okResult(req,res);
                });
            }
        });
    });

    // post a new message
    router.post( baseurl + '/repost',(req,res) =>
    {
        // check the user that wants to repost
        ctx.db.collection('users').findOne({'username':req.body.username},{'fields':userSearchFields},(err,user)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (user) {
                const ObjectID = require('mongodb').ObjectID;

                // check the post to repost
                ctx.db.collection('posts').findOne({'_id':req.body.id},(err,post)=>
                {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);
                    var newPost = {
                        "_id": new ObjectID().toString(),
                        "username": post.username,
                        "ownerid": user._id,
                        "repostid": post._id,
                        "repostdisplayname": user.displayname,
                        "repostusername": req.body.username,
                        "displayname": post.displayname,
                        "timestamp": new Date().toISOString(),
                        "image": post.image,
                        "text": post.text
                    };

                    ctx.db.collection('posts').save(newPost,(err)=>
                    {
                        if(err) return ctx.helper.action.errorResult(err.message,req,res);
                        ctx.helper.action.okResult(req,res);
                    });
                });
            }
        });
    });

    return router;
};
