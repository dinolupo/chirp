/* jshint esnext: true */
/* jslint node: true */

module.exports = (logger)=>
{
  var actionResults = {
    jsonResult: (req,res,data)=> {
        logger.debug('Response with data at [%s]',req.url);
        res.status(200).jsonp(data);
    },
    forbiddenResult: (req,res)=> {
        logger.warn('Forbidden at [%s]',req.url);
        res.status(403).jsonp({ message: '403 - Forbidden' });
    },
    notfoundResult: (req,res)=> {
        logger.warn('Error 404 at [%s]',req.url);
        res.status(404).jsonp({ message: '404 - Not found' });
    },
    errorResult: (err,req,res)=> {
        logger.error('Error 500 at [%s] details [%s]',req.url,err);
        res.status(500).jsonp({ message: '500 - Server error' });
    },
    okResult: (req,res)=> {
        logger.debug('OK at [%s]',req.url);
        res.sendStatus(200);
    }
  };

  var stringProcess = {
    bodyProcess: (text)=> {
      var regexp = /@[a-z0-9]*/ig;
      var matches = text.match(regexp);
      if(matches) {
        var result = text;
        matches.forEach((element)=>{
          var textref = '<a href="/#/info/'+element.substring(1)+'">'+element+'</a>';
          //logger.debug( "%s -> %s",element,textref);
          result = result.replace(element,textref);
        });
        return result;
      }
      else {
        return text;
      }
    }
  }

  return {
      action: actionResults,
      string: stringProcess
  };
};
