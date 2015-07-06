
db.users.drop();
db.posts.drop();

user1Id = ObjectId();
user2Id = ObjectId();
user3Id = ObjectId();

post1Id = ObjectId();
post2Id = ObjectId();
post3Id = ObjectId();

date1 = ISODate("2015-03-19T20:30:00Z").toISOString();
date2 = ISODate("2015-03-18T20:35:00Z").toISOString();
date3 = ISODate("2015-03-18T15:35:00Z").toISOString();

db.posts.insert(
[
    {
        "_id": post1Id,
        "username": 'antdimot',
        "targetusers": [user1Id,user2Id,user3Id],
        "displayname": "Antonio Di Motta",
        "image":"defaultUser.png",
        "timestamp": date1,
        "text": "Hello world!"
    },
    {
        "_id": post2Id,
        "username": 'antdimot',
        "targetusers": [user1Id,user2Id,user3Id],
        "displayname": "Antonio Di Motta",
        "image":"defaultUser.png",
        "timestamp": date2,
        "text": "How dow you do?"
    },
    {
        "_id": post3Id,
        "username": 'user2',
        "targetusers": [user1Id,user2Id],
        "displayname": "The user2",
        "image":"defaultUser.png",
        "timestamp": date3,
        "text": "The life is beautiful."
    }
]);

db.users.insert(
[
    {
        "_id": user1Id,
        "username": "antdimot",
        "displayname": "Antonio Di Motta",
        "password": "pass",
        "email": "antonio.dimotta@gmail.com",
        "image":"defaultUser.png",
        "following": [user2Id],
        "followers": [user2Id,user3Id]
    },
    {
        "_id": user2Id,
        "username": "user2",
        "displayname": "The user2",
        "password": "pass",
        "email": "user2@email.com",
        "image":"defaultUser.png",
        "following": [user1Id],
        "followers": [user1Id]
    },
    {
        "_id": user3Id,
        "username": "user3",
        "displayname": "The user3",
        "password": "pass",
        "email": "user3@email.com",
        "image":"defaultUser.png",
        "following": [user1Id],
        "followers": []
    }
]);
