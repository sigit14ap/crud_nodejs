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

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
    socket.on('notification', function(msg){
      io.emit('notification', msg);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
  });
module.exports = app;
