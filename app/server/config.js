module.exports = {
    server: {
        port: '8080',
        api: '/api/v1',
        limit: '10'
    },
    client: {
        website: 'http://localhost:63342/chirp/app/client'
    },
    mongodb: {
        connectionString: 'mongodb://localhost/chirp'
    }
}