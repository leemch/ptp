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
//@access  Public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
	.then(post => res.json(post))
	.catch(err => res.status(404).json({nopostfound: "No post found with that ID."}));
});

//@route   POST api/progress_updates/test
//@desc    Tests progressUpdate route
//@access  Public
router.post("/test", (req, res) => {
	// Set upload values
const filePath = 'PATH TO LOCAL FILE TO BE UPLOADED';
const fileName = 'FILE NAME TO UPLOAD AS';
const folderId = 'FOLDER ID TO UPLOAD TO';

// Create file upload stream
const stream = fs.createReadStream(filePath);

// Upload file
client.files.uploadFile(
  folderId, 
  fileName, 
  stream, 
  callback);

function callback(err, res) {
  // HANDLE ERROR CASE AND RESPONSE
}
});


//@route   POST api/progress_updates
//@desc    Create a progress update
//@access  Private
router.post("/:trainer_id", passport.authenticate("jwt", {session: false}), (req,res) => {
	const {errors, isValid} = validatePostInput(req.body);
	//console.log(req.body);
	//Check validation
	//if(!isValid){
		//If any errors, send 400 with errors object
	//	return res.status(400).json(errors);
	//}


	Trainer.findById(req.params.trainer_id)
	.then(trainer => {
		if(trainer){


			const clientIndex = trainer.client_list.findIndex(trainerClient => trainerClient.client == req.user.id)
			console.log(clientIndex);
			if(clientIndex > -1){
				const newProgressUpdate = {
					weight: req.body.weight,
					macros: req.body.macros,
				}
			
				trainer.client_list[clientIndex].progress_updates.unshift(newProgressUpdate);
				trainer.save().then(result = res.json(result));
			}
		}
	})


	
});





module.exports = router;