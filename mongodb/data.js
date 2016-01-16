
db.users.drop();
db.posts.drop();

user1Id = ObjectId().valueOf();
user2Id = ObjectId().valueOf();

db.users.insert(
[
    {
        "_id": user1Id,
        "username": "antdimot",
        "displayname": "Antonio Di Motta",
        "password": "greatpass",
        "email": "antonio.dimotta@gmail.com",
        "image":"dimotta.jpg",
        "following": [user2Id],
        "followers": [user2Id]
    },
    {
        "_id": user2Id,
        "username": "userdemo1",
        "displayname": "I'm not a bot :)",
        "password": "pass",
        "email": "demo1@dd.dd",
        "image":"default.png",
        "following": [user1Id],
        "followers": [user1Id]
    }
]);

post1Id = ObjectId().valueOf();
post2Id = ObjectId().valueOf();

date1 = ISODate("2015-09-13T16:30:00Z").toISOString();
date2 = ISODate("2015-09-13T16:35:00Z").toISOString();

db.posts.insert(
[
    {
        "_id": post1Id,
        "username": "antdimot",
        "ownerid": user1Id,
        "displayname": "Antonio Di Motta",
        "image":"dimotta.jpg",
        "timestamp": date1,
        "text": "My first post using Chirp."
    },
    {
        "_id": post2Id,
        "username": "userdemo1",
        "ownerid": user2Id,
        "displayname": "I'm not a bot :)",
        "image":"default.png",
        "timestamp": date2,
        "text": "Are you ready for production?"
    }
]);
