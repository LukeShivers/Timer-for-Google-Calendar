var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Use express
var app = express();


// Use dependencies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// Import routes
var oauthRouter = require('./routes/oauth');
var requestsRouter = require('./routes/requests');
var calendarRouter = require('./routes/calendar');


// Handle CORS
app.options('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', ['X-Requested-With','Content-Type', 'credentials']);
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.status(200);
  next();
})


// Use routes
app.use('/oauth', oauthRouter);
app.use('/requests', requestsRouter);
app.use('/calendar', calendarRouter);


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


module.exports = app;