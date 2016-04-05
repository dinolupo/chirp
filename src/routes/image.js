"use strict"

module.exports = (ctx)=>
{
    const router = require('express').Router();
    const fs = require('fs');
    const baseurl = ctx.config.server.api + '/image';

    // get items posted to public timeline
    router.get( baseurl + '/:resource',(req,res) =>
    {
        const filePath = ctx.config.server.imagepath + '/' + req.params.resource;

        fs.readFile(filePath, (err, data)=>
        {
            if(err) return ctx.helper.action.errorResult(err.message,req,res);

            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data); // Send the file data to the browser.
        });
    });

    return router;
};
