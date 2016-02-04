/* jshint esnext: true */
/* jslint node: true */

module.exports =
{
    server: {
        api: '/api/v1',
        limit: 10
    },
    image: 'default.png',
    mongodb: {
        connectionString: process.env.MDB || 'mongodb://localhost/chirp?autoReconnect=true'
    }
};
