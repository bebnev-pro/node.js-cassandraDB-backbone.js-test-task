var fs = require('fs');
var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();







//routes
var base = require('./routes/base');
var addrow = require('./routes/addrow');
var index = require('./routes/index');
var addrowBase = require('./routes/addrowBase');
var getBook = require('./routes/getBook');
var deleteBook = require('./routes/deleteBook');
var login = require('./routes/login');
var page = require('./routes/page');
var model = require('./routes/model');
var read = require('./routes/read');
//restfull

// view engine setup
app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser());
app.use(express.session({ secret: 'admin' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);



// auth
passport.use('local', new LocalStrategy(
  function (username, password, done) {
    console.log(username, password);
    if (username == "admin" && password == "admin") {
      return done(null, {
        username: "admin"
      });
    }
    return done(null, false, {
      message: 'Неверный логин или пароль'
    });
  }
));
passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
});
passport.deserializeUser(function (data, done) {
  try {
    done(null, JSON.parse(data));
  } catch (e) {
    done(err)
  }
});

function ensureAuth(req, res, next) {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('результат аутентификации ' + req.isAuthenticated());
    res.render('login');
  }
}





app.get('/', ensureAuth, function(req, res) {
  res.set({
    'Content-Type': 'text/html; charset=utf8'
  });
  var file = fs.readFileSync('public/inde.html', 'utf8');
  res.send(file);
});
app.get('/page', page.data);
app.get('/base', base.data);
app.get('/addrow', ensureAuth, addrow.data);

app.get('/read', ensureAuth, read.data);


app.post('/API_LINK',
  passport.authenticate('local'),
  function(req, res) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send('ok');
  }
);


app.put('/read/:id', ensureAuth, read.write);
app.delete('/read/:id', ensureAuth, read.delete);

app.get('/getbook', ensureAuth, getBook.data);
app.get('/deleteBook', ensureAuth, deleteBook.data);
app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});

app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  } else {
    res.render('login');
  }
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/login' }));

app.post('/addrow', addrowBase.data);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;