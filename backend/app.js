var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fotosRouter = require('./routes/fotos');
var etiquetasRouter = require('./routes/etiquetas');

const connectDB = require('./config/mongoose.js');
connectDB();

const cors = require('cors');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fotos', fotosRouter);
app.use('/etiquetas', etiquetasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (
    req.originalUrl.startsWith('/api') ||
    req.originalUrl.startsWith('/users') ||
    req.accepts('json')
  ) {
    res.json({ error: err.message });
  } else {
    res.send('Error: ' + err.message);
  }
});

module.exports = app;
