var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set html as file types in views dir
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// basic express js setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize session
app.use(
  session({
    secret: 'verysecretkey',
    resave: false,
    saveUninitialized: false
  })
);

// router for guest views
app.use('/', indexRouter);
// router for user views
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// start server on port 3000
// url:  http://localhost:3000
app.listen(3000, function() {
    console.log('Server started on port 3000');
}
);

module.exports = app;
