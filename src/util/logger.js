module.exports = function(ctx)
{
    var winston = require('winston');
    winston.emitErrs = true;

    var logger = new winston.Logger({
        transports: [
            /*new winston.transports.File({
             level: 'info',
             filename: './log/chirp-all-logs.log',
             handleExceptions: true,
             json: true,
             maxsize: 5242880, //5MB
             maxFiles: 5,
             colorize: false
             }),*/
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: false,
                json: false,
                colorize: true,
                timestamp: true
            })
        ],
        exitOnError: false
    });


    logger.stream = {
        write: function(message, encoding){
            logger.info(message);
        }
    };

    ctx.logger = logger;
};
