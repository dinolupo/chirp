db.users.drop();
var usersData =
[
    {
        username: 'antdimot',
        display: 'Antonio Di Motta',
        password: 'pass',
        email: 'antonio.dimotta@gmail.com',
        following: [{
            username: 'following1'
        }]
    },
    {
        username: 'following1',
        display: 'following1',
        password: 'pass',
        email: 'following1@chirp.com',
        followers: [{
            username: 'antdimot'
        }]
    }
];
db.users.insert( usersData );