'use strict';

require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const { join } = require('path');

global.requireFromRoot = (name) => require(join(__dirname, name));
global.AppError = require('./common/AppError');

const indexRouter = require('./routes/index');
const badgesRouter = require('./routes/badges');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/badges', badgesRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err, err.message, err.stack);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
