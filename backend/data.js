
db.users.drop();
db.posts.drop();

user1Id = ObjectId();
user2Id = ObjectId();
user3Id = ObjectId();

post1Id = ObjectId();
post2Id = ObjectId();

date1 = ISODate("2015-03-18T20:30:00Z");
date2 = ISODate("2015-03-18T20:35:00Z");

db.posts.insert(
[
    {
        "_id": post1Id,
        "users": [user2Id,user3Id],
        "fromuser": "The user1",
        "timestamp": date1,
        "text": "Hello world"
    },
    {
        "_id": post2Id,
        "users": [user2Id,user3Id],
        "fromuser": "The user1",
        "timestamp": date2,
        "text": "How dow you do?"
    }
]);

db.users.insert(
[
    {
        "_id": user1Id,
        "username": "user1",
        "displayname": "The user1",
        "password": "pass",
        "email": "user1@email.com",
        "image": "",
        "following": [user2Id],
        "posts": [
            {
                "timestamp": date1,
                "text": "Hello world!"
            },
            {
                "timestamp": date2,
                "text": "How dow you do?"
            }
        ]
    },
    {
        "_id": user2Id,
        "username": "user2",
        "displayname": "The user2",
        "password": "pass",
        "email": "user2@email.com",
        "image": "",
        "following": [user1Id]
    },
    {
        "_id": user3Id,
        "username": "user3",
        "displayname": "The user3",
        "password": "pass",
        "email": "user3@email.com",
        "image": "",
        "following": [user1Id]
    }
]);