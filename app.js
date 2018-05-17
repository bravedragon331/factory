var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var express      = require('express');
var exphbs       = require('express-handlebars');
var favicon      = require('serve-favicon');
var flash        = require('connect-flash');
var logger       = require('morgan');
var passport     = require('passport');
var path         = require('path');
var session      = require('express-session');

var dashboard = require('./routes/dashboard');

var i18n = require("i18n");
i18n.configure({
  locales:['eng', 'kor', 'spa'],
  directory: __dirname + '/locales'
});

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up favicon, logging, parsing, static files
// Uncomment after placing your favicon in public/images/
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);
app.use(function (req, res, next) {
  if(req.body.lang){
    i18n.setLocale([req, res.locals], req.body.lang);
    res.cookie('language', req.body.lang, {
      maxAge: 900000,
      httpOnly: true
    });
  };
  i18n.setLocale([req, res.locals], req.cookies.language);
  next()
})

// Set up passport strategies and message passing
require('./config/passport')(passport);
app.use(session({
  secret: 'projectsecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
  if(req.body.remember){
    console.log('Remember');
    req.session.cookie.maxAge = 3600000 * 30;    
  }
  next();
})
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

global.appRoot = path.resolve(__dirname);

// Set up routes and pass in configured passport
require('./routes/index.js')(app);
require('./routes/auth.js')(app, passport);

app.use('/dashboard', dashboard);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
