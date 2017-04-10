/**
 * Created by user on 17/03/2017.
 */

var dotenv = require('dotenv');
var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

dotenv.config();


// Internet connexion BD on mlab || Modification du port de dans le .env
mongoose.connect('mongodb://' + process.env.DB_USER +
    ':' + process.env.DB_PASSWORD +
    '@' + process.env.DB_HOST +
    ':' + process.env.DB_PORT +
    '/' + process.env.DB_NAME);

/*
mongoose.connect('mongodb://' + process.env.DB_LOCAL_HOST +
    ':' + process.env.DB_LOCAL_PORT +
    '/' + process.env.DB_NAME); */