module.exports = function(ctx)
{
    ctx.sendJson = function(req,res,data)
    {
        if(data) {
            ctx.logger.debug('Response at [%s] with %s',req.url, JSON.stringify(data));
            res.jsonp(data);
        }
        else {
            ctx.logger.debug('Response at [%s] with {}',req.url);
            res.jsonp({});
        }
    };

    // forbidden
    ctx.sendForbidden = function(req,res)
    {
        ctx.logger.debug('Response forbidden at [%s]',req.url);
        res.status(403).jsonp({ error: '403 - Forbidden' });
    };

    ctx.sendNotFound = function(req,res)
    {
        ctx.logger.debug('Response not found at [%s]',req.url);
        res.status(404).jsonp({ error: '404 - Not Found' });
    };

    ctx.sendError = function(err,req,res)
    {
        ctx.logger.debug('Response not found at [%s]',req.url);
        res.status(500).jsonp({ error: err });
    };

    ctx.sendOK = function(req,res)
    {
        ctx.logger.debug('Response OK at [%s]',req.url);
        res.status(200).jsonp({});
    };
};
