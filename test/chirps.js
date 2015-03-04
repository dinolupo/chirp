use chirp;
db.chirps.drop();
var chirpsData =
    [
        {
            creator: 'antdimot',
            owner: 'antdimot',
            displayname: 'Antonio Di Motta',
            imagefile: 'default.png',
            text: "This is a test chirp of Antonio Di Motta.",
            date: "2014-12-28T11:20:00"
        },
        {
            creator: 'following1',
            owner: 'following1',
            displayname: 'following1 test user',
            imagefile: 'default.png',
            text: "It's a test chirp of following1.",
            date: "2014-12-28T11:22:05"
        },
        {
            creator: 'following1',
            owner: 'antdimot',
            displayname: 'following1 test user',
            imagefile: 'default.png',
            text: "It's a test chirp of following1.",
            date: "2014-12-28T11:22:05"
        }
    ];
db.chirps.insert( chirpsData );