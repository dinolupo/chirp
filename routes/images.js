/* jshint esnext: true */

module.exports = (ctx)=>
{
    var limit = ctx.config.server.limit;
    var baseurl = ctx.config.server.api + '/image';

    /*ctx.app.get( baseurl + '/:id', function(req,res) {
      var imageid = req.params.id;

      ctx.db.collection('images').findOne({'_id':imageid},{'name':1,'content':1},function(err,data) {
          if (data) {
            res.writeHead(200, {'Content-Type': 'image/jpg' });
            res.end(data.content,'binary');
          }
      });
    });*/
};
