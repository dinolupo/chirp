db.chirps.drop();
var chirpsData =
    [
        {
            _creator: 'antdimot',
            _owner: 'antdimot',
            text: "This is a test chirp of Antonio Di Motta.",
            date: "2014-12-28T11:20:00"
        },
        {
            _creator: 'following1',
            _owner: 'following1',
            text: "It's a test chirp of following1.",
            date: "2014-12-28T11:22:05"
        },
        {
            _creator: 'following1',
            _owner: 'antdimot',
            text: "It's a test chirp of following1.",
            date: "2014-12-28T11:22:05"
        }
    ];
db.chirps.insert( chirpsData );