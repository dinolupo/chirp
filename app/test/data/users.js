db.users.drop();
var usersData =
[
    {
        username: 'antdimot',
        displayname: 'Antonio Di Motta',
        password: 'pass',
        email: 'antonio.dimotta@gmail.com',
        displayname: 'default.png',
        following: [
            { name: 'following1' }
        ],
        followers: []
    },
    {
        username: 'following1',
        displayname: 'following1 test user',
        password: 'pass',
        email: 'following1@chirp.com',
        displayname: 'default.png',
        following: [],
        followers: [
            { name: 'antdimot' }
        ]
    }
];
db.users.insert( usersData );