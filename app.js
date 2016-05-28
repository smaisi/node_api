var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/test');
var  Book = require('./models/bookModel');



var app = express();

var port = process.env.port || 4269;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



var bookRouter = require('./Routes/bookRoutes')(Book);            
app.use('/api/Books',bookRouter);
app.use('/api/Authors',bookRouter);


// Home page request
app.get('/', function name(req,res) {
    res.send('Welcome to my API');
});

//Check on which port it listens
app.listen(port,function () {
    console.log('Running on Port:' + port);
    console.log('added line');
});

module.exports = app;