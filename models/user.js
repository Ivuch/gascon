var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	user : String,
	nickname: String,
	email: {type: String, unique: true},
	cel: Number,
	password: {type: String, required: true},
	dob: Date,
	age: Number,
	gender: String,
	dni: Number,
	created_at: Date,
	last_activity_at: Date,
	permissions:{
		admin: Boolean
	}
})

userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date()
  
  // change the updated_at field to current date
  this.last_activity_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate

  next()
})


var User = mongoose.model('User', userSchema)

module.exports = User