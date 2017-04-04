/**
 * Created by user on 13/03/2017.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

//#Ionic
var localhose = require('localhose');
require('./config');

var app = express();
app.set('view engine', 'ejs');

app.use(passport.initialize());
require('./config/passport')(passport);

//#Ionic
localhose.set("api.ionic.dev");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require('./web'));

var port = process.env.PORT || 4500;

app.listen(port, function () {
    console.log(`App running on port: ${port}`);
});