var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();

mongoose.connect('mongodb://localhost:27017/GodIt');

app.use('/app', express.static(__dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.listen('3000', function (){
    console.log("Server is running");
});