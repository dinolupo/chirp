module.exports = function(logger)
{
    var actionResults = {
        jsonResult: function (req,res,data) {
            //logger.debug('Result [%s] with %s', req.url, JSON.stringify(data));
            logger.debug('Response with data at [%s]', req.url);
            res.status(200).jsonp(data);
        },
        forbiddenResult: function (req,res) {
            logger.warn('Forbidden at [%s]', req.url);
            res.status(403).jsonp({ message: '403 - Forbidden' });
        },
        notfoundResult : function(req, res) {
            logger.warn('Error 404 at [%s]', req.url);
            res.status(404).jsonp({ message: '404 - Not found' });
        },
        errorResult: function(err,req,res) {
            logger.error('Error 500 at [%s] details [%s]', req.url, err );
            res.status(500).jsonp({ message: '500 - Server error' });
        },
        okResult: function (req,res) {
            logger.debug('OK at [%s]', req.url);
            res.sendStatus(200);
        }
    };

    return {
        action: actionResults
    };
};
