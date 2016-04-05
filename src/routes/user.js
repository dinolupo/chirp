"use strict"

module.exports = (ctx)=>
{
    const router = require('express').Router();
    const bcrypt = require('bcrypt');   
    const baseurl = ctx.config.server.api + '/user';

    // get the user using login and password
    router.get( baseurl + '/authenticate/:username/:password',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err,data)=> {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                bcrypt.compare(req.params.password, data.password, (err, resbcrypt)=> {
                    if (resbcrypt === true) {
                        ctx.helper.action.jsonResult(req,res,{
                            "username": data.username,
                            "displayname": data.displayname,
                            "password": data.password,
                            "email": data.email,
                            "image": data.image,
                            "summary": data.summary,
                            "followingcount": data.following.length,
                            "followercount": data.followers.length,
                            "imagepath": ctx.config.server.api + '/image/' + data.image
                        });
                    } else { // check password failed
                        ctx.helper.action.forbiddenResult(req,res);
                    }
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    });

    // get the user using a username
    router.get( baseurl + '/access/:username', (req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err, data)=>{
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                ctx.helper.action.jsonResult(req,res,{
                    "username": data.username,
                    "displayname": data.displayname,
                    "password": data.password,
                    "email": data.email,
                    "image": data.image,
                    "summary": data.summary,
                    "followingcount": data.following.length,
                    "followercount": data.followers.length,
                    "imagepath": ctx.config.server.api + '/image/' + data.image
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    });

    // get the following of a user
    router.get( baseurl + '/following/:username',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err, data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                ctx.db.collection('users').find({'followers':data._id}).toArray((err,items)=> {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);

                    items.forEach((element)=> {
                        element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                        //ctx.logger.debug(element);
                    });

                    ctx.helper.action.jsonResult(req, res, items);
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    });

    // get the followers of a user
    router.get( baseurl + '/followers/:username',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err,data)=> {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (data) {
                ctx.db.collection('users').find({'following':data._id}).toArray((err,items)=> {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);

                    items.forEach((element)=> {
                      element.imagepath = ctx.config.server.api + '/image/' + element.image; // added image resource api
                      //ctx.logger.debug(element);
                    });

                    ctx.helper.action.jsonResult(req, res, items);
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    });

    // sign up a new user
    router.post( baseurl,(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.body.username},(err,data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            if(data) { // username already existing
                ctx.helper.action.forbiddenResult(req,res);
            }
            else {
                bcrypt.genSalt(10, (err,salt)=>
                {
                    bcrypt.hash(req.body.password, salt, (err, hash)=> {
                        // Store hash in your password DB.
                        const user = {
                            "username": req.body.username,
                            "displayname": req.body.displayname,
                            "password": hash,
                            "email": req.body.email,
                            "image": ctx.config.image,
                            "summary": req.body.summary,
                            "following": [],
                            "followers": []
                        };

                        ctx.db.collection('users').save(user,(err)=> {
                            if(err) return ctx.helper.action.errorResult(err.message,req,res);
                            ctx.helper.action.okResult(req,res);
                        });

                    });
                });
            }
        });
    });

    // follow an user
    router.post( baseurl + '/follow',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.body.username1},(err,user1)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);
            if (user1) {
                ctx.db.collection('users').findOne({'username':req.body.username2},(err,user2)=>
                {
                    if(err) return ctx.helper.action.errorResult(err.message,req,res);

                    // check if already follow
                    if(user2) {
                        let found = false;
                        for (var i = 0; i < user1.following.length; i++) {
                            if(user1.following[i]===user2._id) {
                              found = true;
                              break;
                            }
                        }

                        if( found ) {
                            ctx.logger.debug('[%s] already follow [%s]',user1.username,user2.username);
                            ctx.helper.action.forbiddenResult(req,res);
                            return;
                        }

                        ctx.db.collection('users')
                            .updateOne({_id:user1._id},{$push: {following:user2._id }})
                            .then(()=>{
                              ctx.db.collection('users')
                                    .updateOne({_id:user2._id},{$push: {followers:user1._id }});
                            });
                        ctx.helper.action.okResult(req,res);
                    }
                    else {
                        ctx.helper.action.forbiddenResult(req,res);
                    }
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    } );

    // follow an user
    router.post( baseurl + '/unfollow',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.body.username1},(err,user1)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            if (user1) {
                ctx.db.collection('users').findOne({'username':req.body.username2},(err,user2)=>{
                if(err) return ctx.helper.action.errorResult(err.message,req,res);

                // check if already follow
                if(user2) {
                  let found = false;
                  for (var i = 0; i < user1.following.length; i++) {
                    if(user1.following[i]===user2._id)
                    {
                      found = true;
                      break;
                    }
                  }

                  if( !found ) {
                    ctx.logger.debug('[%s] does not follow [%s]',user1.username,user2.username);
                    ctx.helper.action.forbiddenResult(req,res);
                    return;
                  }

                  ctx.db.collection('users')
                        .updateOne({_id:user1._id},{$pull: {following: user2._id }})
                        .then(()=>{
                          ctx.db.collection('users')
                                .updateOne({_id:user2._id},{$pull: {followers: user1._id }});
                        });
                  ctx.helper.action.okResult(req,res);
                }
                else {
                    ctx.helper.action.forbiddenResult(req,res);
                }
              });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    } );

    // get the user info
    router.get( baseurl + '/info/:username',(req,res)=>
    {
        ctx.db.collection('users').findOne({'username':req.params.username},(err,data)=>{
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            if(data) {
                ctx.helper.action.jsonResult(req,res,{
                    "username": data.username,
                    "displayname": data.displayname,
                    "email": data.email,
                    "image": data.image,
                    "summary": data.summary,
                    "followingcount": data.following.length,
                    "followercount": data.followers.length,
                    "imagepath": ctx.config.server.api + '/image/' + data.image
                });
            }
            else {
                ctx.helper.action.forbiddenResult(req,res);
            }
        });
    });

    return router;
};
