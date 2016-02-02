/* jshint esnext: true */

var config = require('../util/config');
var fs = require('fs');
var co = require('co');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectID;

var user1Id = ObjectId().toString();
var user2Id = ObjectId().toString();
var user3Id = ObjectId().toString();
var post1Id = ObjectId().toString();
var post2Id = ObjectId().toString();

var clearData = (db)=> {
  db.dropCollection('users');
  db.dropCollection('posts');
};

var addUsers = (db)=> {
  db.collection('users').insert(
  [
    {
        "_id": user1Id,
        "username": "dimotta",
        "displayname": "Antonio Di Motta",
        "password": "greatpass",
        "email": "antonio.dimotta@gmail.com",
        "image":"dimotta.jpg",
        "following": [user2Id,user3Id],
        "followers": [user2Id]
    },{
        "_id": user2Id,
        "username": "dinolupo",
        "displayname": "Dino Lupo",
        "password": "pass",
        "email": "dino.lupo@gmail.com",
        "image":"lupo.jpg",
        "following": [user1Id],
        "followers": [user1Id]
    },{
        "_id": user3Id,
        "username": "userdemo1",
        "displayname": "I'm not a bot :)",
        "password": "pass",
        "email": "demo1@dd.dd",
        "image":"default.png",
        "following": [user1Id],
        "followers": [user1Id,user3Id]
    }
  ]);
};

var addPosts = (db)=> {
  db.collection('posts').insert(
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
  ]);
};

var Resolver2 = (func)=> {
  return Promise.resolve(new Promise((resolve,reject)=>{
    resolve(func);
  }));
};

var Resolver = (func)=> {
  return Promise.resolve(func);
};

mongoClient.connect(config.mongodb.connectionString,{ db: { bufferMaxEntries: 0 } },(err,db)=>
{
  co(function *(){
    console.log('Database initializing...');
    yield Resolver(clearData(db));
    yield Resolver(addUsers(db));
    yield Resolver(addPosts(db));
    return true;
  })
  .then((result)=>{
    console.log("Database initialized!");
    process.exit(0);
  })
  .catch((error)=>{
    console.log("Database initialization error! -> "+error);
  });
});
