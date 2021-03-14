const express = require('express');
const charRoutes = require('./routes/charRoute');
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
var path = require('path') 


const app = express();

//Template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

//public 
app.use(express.static(path.join(__dirname, 'public')));
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 
app.use('/', charRoutes);
app.use('/:name', charRoutes);

module.exports = app;
