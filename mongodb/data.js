/* jshint esnext: true */

var config = require('../util/config');
var fs = require('fs');
var co = require('co');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;
var bcrypt = require('bcrypt');

var user1Id = ObjectId().toString();
var user2Id = ObjectId().toString();
var user3Id = ObjectId().toString();
var post1Id = ObjectId().toString();
var post2Id = ObjectId().toString();
var password;

var clearData = (db)=>
{
  return new Promise((resolve,reject)=> {
    db.dropCollection('users');
    db.dropCollection('posts');
    resolve();
  });
};

var addUsers = (db)=>
{
  return new Promise((resolve,reject)=> {
      resolve(db.collection('users').insert(
      [
        {
            "_id": user1Id,
            "username": "dimotta",
            "displayname": "Antonio Di Motta",
            "password": password,
            "email": "antonio.dimotta@gmail.com",
            "image":"dimotta.jpg",
            "following": [user2Id,user3Id],
            "followers": [user2Id]
        },{
            "_id": user2Id,
            "username": "dinolupo",
            "displayname": "Dino Lupo",
            "password": password,
            "email": "dino.lupo@gmail.com",
            "image":"lupo.jpg",
            "following": [user1Id],
            "followers": [user1Id]
        },{
            "_id": user3Id,
            "username": "userdemo1",
            "displayname": "I'm not a bot :)",
            "password": password,
            "email": "demo1@dd.dd",
            "image":"default.png",
            "following": [user1Id],
            "followers": [user1Id,user3Id]
        }
      ]));
    });
};

var addPosts = (db)=>
{
  return new Promise((resolve,reject)=> {
    resolve(db.collection('posts').insert(
    [
      {
          "_id": post1Id,
          "username": "dimotta",
          "ownerid": user1Id,
          "displayname": "Antonio Di Motta",
          "image":"dimotta.jpg",
          "timestamp": new Date("2015-09-13T16:30:00Z").toISOString(),
          "text": "My first post using Chirp."
      },{
          "_id": post2Id,
          "username": "userdemo1",
          "ownerid": user3Id,
          "displayname": "I'm not a bot :)",
          "image":"default.png",
          "timestamp": new Date("2015-09-13T16:35:00Z").toISOString(),
          "text": "Are you ready for production?"
        }
    ]));
  });
};

mongoClient.connect(config.mongodb.connectionString,{ db: { bufferMaxEntries: 0 } },(err,db)=>
{
  bcrypt.genSalt(10, (err,salt)=> {
    bcrypt.hash('pass', salt, (err, hash)=> {
      password = hash;

      co(function *(){
        console.log('Database initializing...');
        yield Promise.resolve(clearData(db));
        yield Promise.resolve(addUsers(db));
        yield Promise.resolve(addPosts(db));
      })
      .then((result)=>{
        console.log("Database initialized!");
        process.exit(0);
      })
      .catch((error)=>{
        console.log("Database initialization error! -> "+error);
      });
    });
  });
});
