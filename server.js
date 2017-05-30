////////////////////////  GASCON APP /////////////////////////////////////

var express = require('express')
var app = express()
var http = require('http')
var https = require('https')
var fs = require("fs")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')//<---- Necesito realmente esto?
var session = require('express-session')
var mongoose = require('mongoose')
var multer  = require('multer')
var upload = multer({ dest: 'tmp/' })

setInterval(function () {
  console.log('boo')
}, 86400000)

/********************* Global Variables && uses ***********************/
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

/********* SERVERS ***********/
app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
/*
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
*/
var options = {
	key: fs.readFileSync('keys/key.pem'),
  	cert: fs.readFileSync('keys/cert.pem')
}
/*
var options = {
	key: fs.readFileSync('/etc/letsencrypt/live/webdelbosque.com.ar/privkey.pem'),
  	cert: fs.readFileSync('/etc/letsencrypt/live/webdelbosque.com.ar/fullchain.pem'),
  	ca: fs.readFileSync('/etc/letsencrypt/live/webdelbosque.com.ar/chain.pem')
}
*/
var sserver = https.createServer(options, app).listen(443, function(){
	console.log("Secure conction Established - HTTPS - SSL")
})

var io = require('socket.io')(sserver)
/********* SERVERS ***********/


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

/********************* Socket.io ***********************/
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next)
})

io.on('connection', function(socket){
  console.log("a user's connected")
  var cookie_string = socket.request.headers.cookie
  console.log("socket.request.headers.cookie : "+cookie_string)
  var session = socket.request.session
  console.log("io.sockets.sockets : "+io.sockets.sockets)
  /*var connect_sid = parsed_cookies['connect.sid']
  if (connect_sid) {
    session_store.get(connect_sid, function (error, session) {
      console.log("msg emited by: "+session.userID)
	  console.log("session number: "+session.id)
	})
  }*/
  socket.on('chat message', function(msg){
  	  console.log("Usuario que emite el msg: "+session.userID)
	  console.log("msg: "+msg)
	  socket.broadcast.emit('chat message', msg)
  })
  
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
})
/********************* Socket.io ***********************/


/******** ROUTER ********/
var pets = require(__dirname+'/router/pets');
app.use('/pets', pets);

var users = require(__dirname+'/router/users');
app.use('/users', users);

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

app.get('/tlccas', function(req, res){
	res.sendFile(__dirname+"/test.html")
})

app.get('/upload', function(req, res){
	res.sendFile(__dirname+"/upload.html")
});

app.post('/upload', upload.single('pic'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("req.file: "+req.file)
  console.log(req.file)
  res.sendFile(__dirname+"/index.html")
})

app.get('/session', function(req, res){
	User.find({ _id: req.session.userID }, function(err, user) {
		if (err) {
			console.log("DANGER: 'There was a problem finding Session in SessionStorage': ")
			console.log(err)
			res.json({isERROR : true})
		}
		console.log(user)
		res.send(user)
	})
})

app.get('/endSession', function(req, res){
	req.session.destroy()
	res.sendFile(__dirname+"/public/login.html")
})

/******** ROUTER ********/

