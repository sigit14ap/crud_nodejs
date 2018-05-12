var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//load mongoose
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('ejs-yield'))

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



//hubungkan ke Mongodb
mongoose.connect('mongodb://localhost/crud')  
  .then(() => console.log('Berhasil terhubung dengan MongoDB'))
  .catch((err) => console.error(err));


var socketIO = require('socket.io');
var socketIOHelper = require('socket.io-helper/socketio.js');
var PORT = process.env.PORT || 8088;

var server = app.listen(function() {
  console.log('Listening');
});
var io = socketIO(server);
socketIOHelper.set(io);
var receivers = require('socket.io-receiver/receiver.js');
receivers.receivers(io);
module.exports = app;
