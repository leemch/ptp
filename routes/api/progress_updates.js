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

const {upload} = require("../../services/image-upload");

const singleUpload = upload.single('image');
const multipleUpload = upload.array('image',3);


const config = require("../../config/keys");
const AWS = require('aws-sdk');
const cloudFront = new AWS.CloudFront.Signer(config.CF_ACCESS_KEY, config.RSA_PRIVATE_KEY);


//@route   GET api/progress_updates/test
//@desc    Tests progressUpdate route
//@access  Public
router.get("/test", (req, res) => res.json("progressUpdates works"));

router.get("/urltest", (req, res) => res.json(getPhotoUrls('5c980b03602eba1d149749df', '07-16-2019', 3)));

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

	multipleUpload(req, res, err => {
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
		const newProgressUpdate = new ProgressUpdate({
			client: req.user.id,
			weight: req.body.weight,
			macros: {
				fat: req.body.fat,
				protein: req.body.protein,
				carbs: req.body.carbs
			},
			notes: req.body.notes,
			photos: req.body.photos

		});
	
		newProgressUpdate.save()
		.then(progress => res.json(progress));
    });

	


			
});


const getPhotoUrls = (client_id, date, numPhotos) => {

	let urls = [];

	for(let x = 0; x < numPhotos; x++){
		// Generating a signed URL
		cloudFront.getSignedUrl({
			url: 'http://d12w44ud3mpa5f.cloudfront.net/' + 'client-photos' + '/' + client_id + '/' + date + '/' + x + ".jpg",
			expires: Math.floor((new Date()).getTime() / 1000) + (5) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
		}, (err, url) => {
			if (err) throw err;
			urls.push(url);
		});
	}
	return urls;
}

//Get signed urls to photos
// Private
router.get('/photos/:client_id/:date/:num_photos',passport.authenticate("jwt", {session: false}), (req, res) => {

	res.json(getPhotoUrls(req.params.client_id, req.params.date, req.params.num_photos));
	//res.json(getPhotoUrls(req.params.client_id, req.params.date, req.params.numPhotos));
});

  



module.exports = router;