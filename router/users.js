var express = require('express');
var app = express.Router();

/****  ROUTER: Users *******/
var User = require('../models/user')

app.get('/', function(req, res){
	User.find({}, function(err, users) {
	  if (err) throw err
	  console.log("Obteniendo todos los usuarios desde: /users")
	  res.json(users)
	})
})

app.post('/', function(req, res){
	console.log(req.body)
	var user = new User({
		user : req.body.user,
		nickname: req.body.nickname,
		email: req.body.email,
		cel: req.body.cel,
		password: req.body.password
	})
	user.save(function(err){
		if(err) console.log(err)
		console.log("User "+user.name+" created successfully!")
	})
	res.sendFile(__dirname+"/../public/login.html")
})

app.get('/:_id', function(req, res){
	User.findById(req.params._id, function(err, user) {
	  if (err) throw err
	  console.log("Obteniendo usuario "+user.user+" desde: /users/:_id")
	  res.json(user)
	})
})

module.exports = app;