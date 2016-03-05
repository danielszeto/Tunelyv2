var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('express-helpers');
var ejs = require('ejs');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var path = require("path");

// database
mongoose.connect('mongodb://localhost/tunelyv2');
process.on('exit', function() { mongoose.disconnect(); });

// assets
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));  // accept all datatypes
// app.use(bodyParser.json());
app.use(methodOverride('_method'));

// view engine
app.set('views', path.join(__dirname, './views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Routes
var routes = require('./config/routes');
app.use(routes);
app.get('/', function (req, res) {
  res.redirect('/albums');
});


app.listen(3000, function () {
    console.log("Go to localhost:3000/");
});
