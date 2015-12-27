module.exports = function(logger)
{
    return {
        sendJson: function (req,res,data) {
            if (data) {
                logger.debug('Response at [%s] with %s', req.url, JSON.stringify(data));
                res.jsonp(data);
            }
            else {
                logger.debug('Response at [%s] with {}', req.url);
                res.jsonp({});
            }
        },
        sendForbidden: function (req,res) {
            logger.debug('Response forbidden at [%s]', req.url);
            res.status(403).jsonp({error: '403 - Forbidden'});
        },
        sendOK: function (req,res) {
            logger.debug('Response OK at [%s]', req.url);
            res.status(200).jsonp({});
        }
    };
};
