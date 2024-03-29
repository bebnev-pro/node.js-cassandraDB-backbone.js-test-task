var fs = require('fs');
var express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// creating DB
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./bin/sample.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite database.');
});
db.run('CREATE TABLE IF NOT EXISTS books(primary_key INTEGER PRIMARY KEY, Descr string NULL, Name string NULL, Picture string NULL, Price number NULL);');
db.close();

//routes
var base = require('./routes/base');
var index = require('./routes/index');
var login = require('./routes/login');
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

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    console.log(username, password);
    if (username == "admin" && password == "admin") {
      return done(null, {
        username: "admin"
      });
    } else {
      return done(null, false, {
        message: 'Login, password incorrect'
      });
    }
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
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('isAuthenticated: ' + req.isAuthenticated());
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
app.get('/base', base.data);

app.get('/read', ensureAuth, read.data);

app.post('/API_LINK',
  function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    passport.authenticate('local', function(err, username, info) {

      console.log('err: ' + err + '; username: ' + username + '; info: ' + info + ';');

      if (err) {
        console.log('Passport auth error: ' + err);
        return next(err);
      }
      req.logIn(req.body.username, function(err) {
        if (err) {
          console.log('Passport login process error: ' + err);
          return next(err);
        }
        return res.send('Passport login process souccess');
      });
    })(req, res, next);

  }
);

app.put('/read/:id', ensureAuth, read.write);
app.post('/read', ensureAuth, read.write);
app.delete('/read/:id', ensureAuth, read.delete);

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