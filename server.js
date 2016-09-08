var express = require('express')
var app = express()
var https = require('https')
var fs = require("fs")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')//<---- Necesito realmente esto?
var session = require('express-session')
var mongoose = require('mongoose')

setInterval(function () {
  console.log('boo')
}, 86400000)
/********************* Global Variables && uses ***********************/
var options = {
	key: fs.readFileSync('keys/key.pem'),
  	cert: fs.readFileSync('keys/cert.pem')
}
var sessionMiddleware = session({
  secret:'S3KR3T',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))
app.use(sessionMiddleware)
/********************* Global Variables && uses ***********************/


/********************* Mongoose ***********************/
mongoose.connect('mongodb://127.0.0.1/gascon')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("we're connected to Mongo!")
})

/****             Schemas               ****/
var User = require(__dirname+'/models/user')
/****             Schemas               ****/
/********************* Mongoose ***********************/

/******** ROUTER ********/
var pets = require(__dirname+'/router/pets');
app.use('/pets', pets);

//Root : '/'
app.get('/', function (req, res) {
	if(!req.session.userID){
		res.sendFile(__dirname+"/public/login.html")
		console.log("req.session: "+req.session.id)
	}else{
		res.sendFile(__dirname+'/index.html')
		console.log("req.session: "+req.session.id)
	}
})

app.post('/login', function(req, res){
	console.log(req.body)
	User.find({ user: req.body.user }, function(err, userMongo) {
		if (err){
			console.log("DANGER: 'There was a problem Querying Mongo' : ")
			console.log(err)
			res.json({isERROR: true})
		}else if(userMongo.length < 1){
			console.log("user doesn't Exist --> do you wanna create an user?")
			res.json({isERROR: true, proponerNewAccount: true})
		}else{
			console.log(userMongo)
			if(req.body.user == userMongo[0].user && req.body.password == userMongo[0].password){
				console.log("login status: OK - req.session.id : "+req.session.id)
				req.session.userID = userMongo[0]._id
				console.log("_id: "+req.session.userID)
				res.sendFile(__dirname+"/index.html")
			}else{
				console.log("User or pass not valid")
				res.json({isERROR: true})
			}
		}
	})
})

/****  ROUTER: Users *******/
app.get('/users', function(req, res){
	User.find({}, function(err, users) {
	  if (err) throw err
	  console.log("Obteniendo todos los usuarios desde: /users")
	  res.json(users)
	})
})

app.post('/users', function(req, res){
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
	res.sendFile(__dirname+"/public/login.html")
})

app.get('/users/:_id', function(req, res){
	User.findById(req.params._id, function(err, user) {
	  if (err) throw err
	  console.log("Obteniendo usuario "+user.user+" desde: /user/:_id")
	  res.json(user)
	})
})
/******** ROUTER ********/


/********* SERVERs ***********/
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

var s = https.createServer(options, app).listen(4143, function(){
	console.log("Secure conction Established - HTTPS - SSL")
})