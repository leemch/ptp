const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// ProgressUpdate model
const ProgressUpdate = require("../../models/ProgressUpdate");

const Trainer = require("../../models/User");

// Profile model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");





//@route   GET api/progress_updates/test
//@desc    Tests progressUpdate route
//@access  Public
router.get("/test", (req, res) => res.json("progressUpdates works"));

//@route   GET api/progress_updates/
//@desc    Get progress updates
//@access  Public
router.get("/", (req, res) => {
	ProgressUpdate.find()
	.sort({date: -1})
	.then(progressUpdates => res.json(progressUpdates))
	.catch(err => res.status(404).json({noprogressUpdatesfound: "No progressUpdates found."}));
});

//@route   GET api/progress_updates/:id
//@desc    Get progress update by id
//@access  Private
router.get("/:client_id",passport.authenticate("jwt", {session: false}), (req, res) => {

if(req.user.isTrainer){
	Trainer.findById(req.user.id)
	.then(trainer => {

		if(trainer.client_list.filter(trainersClient => trainersClient.client === req.params.client_id)){
			ProgressUpdate.find({client: req.params.client_id})
			.sort({date: -1})
			.then(progress => res.json(progress))
			.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}));
		}
		else{
			return res.status(404).json({notclient: "This is not your client."});
		}


		
	})
	.catch(err => res.status(404).json({notrainer: "Trainer not found"}));
} else {
	if(req.user.id === req.params.client_id){
		ProgressUpdate.find({client: req.params.client_id})
			.sort({date: -1})
			.then(progress => res.json(progress))
			.catch(err => res.status(404).json({noupdatesfound: "No progress updates found for that client."}));
	}
	else{
		return res.status(404).json({notclient: "These are not your updates"});
	}
}
	


});

//@route   POST api/progress_updates
//@desc    Create a progress update
//@access  Private
router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
	//const {errors, isValid} = validatePostInput(req.body);
	//console.log(req.body);
	//Check validation
	//if(!isValid){
		//If any errors, send 400 with errors object
	//	return res.status(400).json(errors);
	//}

				const newProgressUpdate = new ProgressUpdate({
					client: req.user.id,
					weight: req.body.weight,
					macros: {
						fat: req.body.fat,
						protein: req.body.protein,
						carbs: req.body.carbs
					},
					notes: req.body.notes
				});
			
				newProgressUpdate.save()
				.then(progress => res.json(progress));
			
});





module.exports = router;