
db.users.drop();
db.posts.drop();

user1Id = ObjectId();
user2Id = ObjectId();
user3Id = ObjectId();

db.users.insert(
[
    {
        "_id": user1Id,
        "username": "antdimot",
        "displayname": "Antonio Di Motta",
        "password": "pass",
        "email": "antonio.dimotta@gmail.com",
        "image":"dimotta.jpg",
        "following": [user2Id],
        "followers": [user2Id,user3Id]
    },
    {
        "_id": user2Id,
        "username": "imperugo",
        "displayname": "Ugo Lattanzi",
        "password": "pass",
        "email": "imperugo@gmail.com",
        "image":"imperugo.jpg",
        "following": [user1Id],
        "followers": [user1Id]
    },
    {
        "_id": user3Id,
        "username": "simonech",
        "displayname": "Simone Chiaretta",
        "password": "pass",
        "email": "simone.chiaretta@gmail.com",
        "image":"simonech.jpg",
        "following": [user1Id],
        "followers": []
    }
]);

post1Id = ObjectId();
post2Id = ObjectId();
post3Id = ObjectId();

date1 = ISODate("2015-09-13T16:30:00Z").toISOString();
date2 = ISODate("2015-09-13T16:35:00Z").toISOString();
date3 = ISODate("2015-09-13T16:37:00Z").toISOString();

db.posts.insert(
[
    {
        "_id": post1Id,
        "username": "antdimot",
        "targetusers": [user1Id,user2Id,user3Id],
        "displayname": "Antonio Di Motta",
        "image":"dimotta.jpg",
        "timestamp": date1,
        "text": "My first post using Chirp."
    },
    {
        "_id": post2Id,
        "username": "imperugo",
        "targetusers": [user1Id,user2Id],
        "displayname": "Ugo Lattanzi",
        "image":"imperugo.jpg",
        "timestamp": date2,
        "text": "Are you ready for the WEC2015?"
    },
    {
        "_id": post3Id,
        "username": "antdimot",
        "targetusers": [user1Id,user2Id,user3Id],
        "displayname": "Antonio Di Motta",
        "image":"dimotta.jpg",
        "timestamp": date3,
        "text": "I have just finished my slide."
    }
]);
