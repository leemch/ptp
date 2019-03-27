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


//@route   DELETE api/progress_updates/:id
//@desc    Delete a progress update
//@access  Private
router.delete("/:id", passport.authenticate("jwt", {session: false}), (req,res) => {
	
	Profile.findOne({user: req.user.id})
	.then(profile => {
		Post.findById(req.params.id)
		.then(post => {
			// check for post owner
			if(post.user.toString() !== req.user.id){
				return res.status(401).json({notauthorized: "User not authorized"});
			}

			// Delete
			post.remove().then( () => res.json({success: true}));
		})
		.catch(err => res.status(404).json({postnotfound: "No post found"}));
	})

});


//@route   POST api/progressUpdates/like/:id
//@desc    Like a post
//@access  Private
router.post("/like/:id", passport.authenticate("jwt", {session: false}), (req,res) => {
	
	Profile.findOne({user: req.user.id})
	.then(profile => {
		Post.findById(req.params.id)
		.then(post => {
			if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
				return	res.status(400).json({alreadyliked: "User already liked this post"});
			}

			//Add user id to the likes array
			post.likes.unshift({user: req.user.id});

			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: "No post found"}));
	})

});

//@route   POST api/progressUpdates/unlike/:id
//@desc    Unlike a post
//@access  Private
router.post("/unlike/:id", passport.authenticate("jwt", {session: false}), (req,res) => {
	
	Profile.findOne({user: req.user.id})
	.then(profile => {
		Post.findById(req.params.id)
		.then(post => {
			if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
				return	res.status(400).json({notliked: "You have not yet liked this post"});
			}

			//Get remove index
			const removeIndex = post.likes.map(item => item.user.toString())
			.indexOf(req.user.id);

			//Splice out of the array
			post.likes.splice(removeIndex, 1);

			//Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({postnotfound: "No post found"}));
	})

});


//@route   POST api/progress_updates/comment/:id
//@desc    Add comment to progress update
//@access  Private
router.post("/comment/:id", passport.authenticate("jwt", {session: false}), (req, res) => {

const {errors, isValid} = validatePostInput(req.body);

	//Check validation
	if(!isValid){
		//If any errors, send 400 with errors object
		return res.status(400).json(errors);
	}


	Post.findById(req.params.id)
	.then(post => {
		const newComment = {
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		}

		// Add to comments array
		post.comments.unshift(newComment);

		post.save().then(post => res.json(post))

	})
	.catch(err => res.status(404).json({postnotfound: "No post found"}));
});


//@route   DELETE api/progress_updates/comment/:id/:comment_id
//@desc    Remove comment from progress update
//@access  Private
router.delete("/comment/:id/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {

const {errors, isValid} = validatePostInput(req.body);



	Post.findById(req.params.id)
	.then(post => {

		// Check to see if it exists
		if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
			return res.status(404).json({commentnotexists: "comment does not exists"});
		}

		//Get remove index
		const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

		// Splice comment from array
		post.comments.splice(removeIndex, 1);

		post.save().then(post => res.json(post))

	})
	.catch(err => res.status(404).json({postnotfound: "No post found"}));
});


module.exports = router;