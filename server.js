"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let passport = require('passport');
let morgan = require('morgan');
let router = require('./app/router');

let config = require('./config/passport');

let port = process.env.PORT || 3000;
let app = express();

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// register logging
app.use(morgan('dev'));

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

// pass passport for configuration
passport.use('jwt', config.strategy);

// Use the passport package in our application
app.use(passport.initialize());

// connect the api routes under /api/*
app.use('/api', router);

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port, () => {
  console.log('Todo API on: http://localhost:' + port);
});


