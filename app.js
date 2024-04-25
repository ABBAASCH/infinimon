var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./db');

var app = express();

app.get('/db', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM querytest');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Using html engine instead of jade
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Make a get to the db
app.get('/db', async (req, res) => {
    try {
        const client = await db.connect();
        const result = await client.query('SELECT * FROM querytest');
        const results = { 'results': (result) ? result.rows : null };
        // return json results
        res.json(results);
        //res.render('db', results);
        client.release();
        console.log('Client released');
        console.log(results);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.listen(3000, function() {
    console.log('Server started on port 3000');
}
);

module.exports = app;
