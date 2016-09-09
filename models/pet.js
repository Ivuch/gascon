var mongoose = require('mongoose')
var Schema = mongoose.Schema

var petSchema = new Schema({
	name: String,
	nickname: String,
	animal_group: String,
	dob: Date,
	age: Number,
	gender: String,
	created_at: Date,
	last_activity_at: Date,
	feed:[
		{
			ate: Boolean,
			done_by: { type: Schema.Types.ObjectId, ref: 'User'},
			name: String,
			time_stamp: Date
		}
	],
	drink:[
		{
			drink: Boolean,
			done_by: { type: Schema.Types.ObjectId, ref: 'User'},
			name: String,
			time_stamp: Date
		}
	],
	petMsj:[
		{
			msj: String
		}
	]
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