const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const connectDB = require('./db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const notificationRouter = require('./routes/notification');
const adminRouter = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/notifications', notificationRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // console.error(err.stack); // TODO: Remove this line in production
  res.status(err.status || 500).json({
    error: {
      message:
        req.app.get('env') === 'development'
          ? err.message
          : 'Internal Server Error',
      status: err.status || 500,
      stack: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

module.exports = app;
