module.exports = function(mongoose,config) {
    return {
        open: function (cb) {
            try {
                mongoose.connect(config.mongodb.connectionString);
                cb();
            }
            catch(ex)
            {
                console.log(ex);
            }
        },
        close: function (cb) {
            try {
                mongoose.connection.close();
                if(cb) cb();
            }
            catch(ex)
            {
                console.log(ex);
            }
        }
    }
}
