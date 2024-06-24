require('dotenv').config();


// User schema
require('./app_api/models/users');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const roomsRouter = require('./app_server/routes/roomsRtr');
const aboutRouter = require('./app_server/routes/aboutRtr');
const newsRouter = require('./app_server/routes/newsRtr');
const mealsRouter = require('./app_server/routes/mealsRtr');
const contactRouter = require('./app_server/routes/contactRtr');
const apiRouter = require('./app_api/routes/indexRtr');
const handlebars = require('hbs');

var app = express();

// Bring in database
require('./app_api/models/db');


// Config passport
require('./app_api/config/passport');

// register handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');

// register a custom helper for comparison
handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2 ) ? options.fn(this) : options.inverse(this);
});


// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:4200' }));


// view engine setup
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/about', aboutRouter);
app.use('/news', newsRouter);
app.use('/meals', mealsRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);

// Define your routes here
/* app.get('/api/trips', (req, res) => {
  res.json({ message: 'Trips data' });
}); */

// Your other middleware and routes

/* const port = process.env.PORT || 3001; // Ensure this port is available
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); */

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

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

module.exports = app;
