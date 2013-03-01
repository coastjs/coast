var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = module.exports = exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  /**
   * middleware
   */
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'static')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * routes
 * app.get
 * app.post
 * app.put
 * app.del
 */
app.get('/', require('./controllers/controllerIndex.js'));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
