module.exports =  function (mongoose)
{
    var userSchema = mongoose.Schema({
        username: { type: String, lowercase: true, trim: true },
        password: String,
        display: String,
        email: String,
        following: [{ name: { type: String, lowercase: true, trim: true } }],
        followers: [{ name: { type: String, lowercase: true, trim: true } }]
    });

    var chirpSchema = mongoose.Schema({
        _creator: { type: String, ref: 'user' },
        _owner: { type: String, ref: 'user' },
        date: { type: Date, default: Date.now },
        text: String
    });

    return {
        User : mongoose.model('user', userSchema),
        Chirp: mongoose.model('chirp',chirpSchema)
    }
}
