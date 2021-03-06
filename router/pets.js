var express = require('express');
var router = express.Router();

/****  ROUTER: Pets *******/
var Pet = require('../models/pet')
var User = require('../models/user')

router.get('/', function(req, res){
	Pet.find({}, function(err, pets) {
	  if (err) throw err
	  console.log("Obteniendo todas las mascotas desde: /pets")
	  res.json(pets)
	})
})

router.post('/', function(req, res) {
	console.log(req.body)
	var pet = new Pet({
		name : req.body.name,
		nickname: req.body.nickname,
		animal_group: req.body.animal_group,
		dob: req.body.dob,
		gender: req.body.gender
	})
	pet.save(function(err){
		if(err) console.log(err)
		else console.log("Pet "+pet.name+" created successfully!")
	})
	res.json(pet)
})

router.get('/:pet_id', function(req, res){
	Pet.findById(req.params.pet_id, function(err, pet) {
	  if (err) throw err
	  console.log("Obteniendo mascota "+pet.name+" desde: /pets/"+pet._id)
	  res.json(pet)
	})
})

router.put('/:pet_id', function(req, res){
	 Pet.findById(req.params.pet_id, function(err, pet) {
        if (err) throw err  //res.send(err)

        // update the pet info
        pet.name = req.body.name
      
        pet.save(function(err) {
            if (err) throw err
            res.json({ message: 'Pet updated!' })
		})
	})
})

router.delete('/:pet_id', function(req, res){
	Pet.remove({_id: req.params.pet_id}, function(err, pet) {
            if (err) res.send(err)
           	console.log('Successfully deleted')
            res.json({ message: 'Successfully deleted' })
        })
})

router.put('/drink/:pet_id', function(req, res){
	 Pet.findById(req.params.pet_id, function(err, pet) {
        if (err) throw err  //res.send(err)
        // update the pet info
        pet.diary.push
        var lunch = {
        				day: new Date(),
						lunch:{
							ate: true,
							done_by: req.session.userID,
							time_stamp: new Date()
						}
					}
        pet.save(function(err) {
            if (err) throw err
            res.json({ message: 'Pet updated!' })
		})
	})
})

router.put('/feed/:pet_id', function(req, res){
	var userName = ''
	 User.findById(req.session.userID, function(err, user) {
	  if (err) throw err
	  console.log("Obteniendo usuario "+user.user+" desde: /users/:_id")
	  userName = user.user
	})
	 Pet.findById(req.params.pet_id, function(err, pet) {
        if (err) throw err  //res.send(err)
        // update the pet info
        var o = {
			ate: true,
			done_by: req.session.userID,
			name: userName,
			time_stamp: new Date()
		}
		pet.feed.push(o)
		console.log(pet)
        pet.save(function(err) {
            if (err) throw err
            res.json({ message: 'comió!!' })
		})
	})
})
//Router: PET


/******************************************************/
//EXTRA
//Uncomment any below to disblock new functionalities!

// middleware that is specific to this router
/*
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
*
*/

/*****************************************************/

module.exports = router;