var express = require('express');
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
var read = require('./routes/read');
var getBook = require('./routes/getBook');
var deleteBook = require('./routes/deleteBook');

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', index.list);
app.get('/base', base.data);
app.get('/addrow', addrow.data);
app.get('/read', read.data);
app.get('/getbook', getBook.data);
app.get('/deleteBook', deleteBook.data);

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
