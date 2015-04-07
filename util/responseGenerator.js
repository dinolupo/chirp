module.exports = function(ctx)
{
    ctx.jsonResponse = function(req,res,data)
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
}


