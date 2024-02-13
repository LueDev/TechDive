var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//Connect to Mongo with this module and the mongoose model operations will read/write to mongoDB collections
const connectDB = require('./db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var notificationRouter = require('./routes/notification')
var adminRouter = require('./routes/admin')

// const PORT = process.env.PORT || 3000
var app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/notifications', notificationRouter )

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// app.listen(PORT, console.log("Server is running on port ", PORT))

module.exports = app;
