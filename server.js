var express = require('express')
var app = express()
var mongoose = require('mongoose')


/********************* Mongoose ***********************/
mongoose.connect('mongodb://127.0.0.1/gascon')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("we're connected to Mongo!")
})

/****             Schemas               ****/
var User = require(__dirname+'/models/user')
var Pet = require(__dirname+'/models/pet')
/****             Schemas               ****/
/********************* Mongoose ***********************/


app.use(express.static(__dirname+"/public"))

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})