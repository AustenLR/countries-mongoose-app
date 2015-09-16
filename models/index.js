var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/countries_app");

module.exports.Country = require("./country");