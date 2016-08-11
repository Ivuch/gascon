var mongoose = require('mongoose')
var Schema = mongoose.Schema

var petSchema = new Schema({
	name : String,
	lastName: String,
	nickname: String,
	email: {type: String, required: true, unique: true},
	cel: {type: Number, required: true},
	password: {type: String, required: true},
	age: Number,
	gender: String,
	created_at: Date,
	last_activity_at: Date,
})

petSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date()
  
  // change the updated_at field to current date
  this.last_activity_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate

  next()
})


var Pet = mongoose.model('Pet', petSchema)

module.exports = Pet