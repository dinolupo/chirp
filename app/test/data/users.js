db.users.drop();
var usersData =
[
    {
        username: 'antdimot',
        display: 'Antonio Di Motta',
        password: 'pass',
        email: 'antonio.dimotta@gmail.com',
        following: [
            { name: 'following1' }
        ],
        followers: []
    },
    {
        username: 'following1',
        display: 'following1',
        password: 'pass',
        email: 'following1@chirp.com',
        following: [],
        followers: [
            { name: 'antdimot' }
        ]
    }
];
db.users.insert( usersData );