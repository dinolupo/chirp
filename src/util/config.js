module.exports =
{
    server: {
        api: '/api/v1',
        limit: 10
    },
    image: 'default.png',
    mongodb: {
        //connectionString: process.env.MDB
        connectionString: 'mongodb://localhost/chirp?autoReconnect=true'
    }
};
