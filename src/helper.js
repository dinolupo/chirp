module.exports = function(logger)
{
    return {
        sendJson: function (req,res,data) {
            if (data) {
                //logger.debug('Result [%s] with %s', req.url, JSON.stringify(data));
                logger.debug('Result at [%s]', req.url);
                res.jsonp(data);
            }
            else {
                logger.debug('Result at [%s]', req.url);
                res.jsonp({});
            }
        },
        sendForbidden: function (req,res) {
            logger.debug('Forbidden at [%s]', req.url);
            res.status(403).jsonp({error: '403 - Forbidden'});
        },
        sendOK: function (req,res) {
            logger.debug('OK at [%s]', req.url);
            res.status(200).jsonp({});
        }
    };
};
