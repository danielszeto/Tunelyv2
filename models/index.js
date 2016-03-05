var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tunelyv2");
process.on('exit', function() { mongoose.disconnect(); });

module.exports.Quote = require("./album");