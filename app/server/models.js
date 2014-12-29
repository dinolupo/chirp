module.exports =  function (mongoose)
{
    var userSchema = mongoose.Schema({
        username: { type: String, lowercase: true, trim: true },
        password: String,
        displayname: String,
        email: String,
        imagefile: String,
        following: [{ name: { type: String } }],
        followers: [{ name: { type: String } }]
    });

    var chirpSchema = mongoose.Schema({
        creator: { type: String, lowercase: true, trim: true },
        owner: { type: String, lowercase: true, trim: true },
        displayname: String,
        imagefile: String,
        date: { type: Date, default: Date.now },
        text: { type: String, trim: true }
    });

    return {
        User : mongoose.model('user', userSchema),
        Chirp: mongoose.model('chirp',chirpSchema)
    }
}
