module.exports = function(logger)
{
    return {
        sendJson: function (req, res, data) {
            if (data) {
                logger.debug('Response at [%s] with %s', req.url, JSON.stringify(data));
                res.jsonp(data);
            }
            else {
                logger.debug('Response at [%s] with {}', req.url);
                res.jsonp({});
            }
        },

        sendForbidden: function (req, res) {
            logger.debug('Response forbidden at [%s]', req.url);
            res.status(403).jsonp({error: '403 - Forbidden'});
        },

        sendNotFound: function (req, res) {
            logger.debug('Response not found at [%s]', req.url);
            res.status(404).jsonp({error: '404 - Not Found'});
        },

        sendError: function (err, req, res) {
            logger.debug('Response not found at [%s]', req.url);
            res.status(500).jsonp({error: err});
        },

        sendOK: function (req, res) {
            logger.debug('Response OK at [%s]', req.url);
            res.status(200).jsonp({});
        }
    };
};
