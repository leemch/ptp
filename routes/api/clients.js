const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load client model
const Client = require("../../models/Client");
const Trainer = require("../../models/User");

//@route   GET api/clients/test
//@desc    Tests clients router
//@access  Public

router.get("/test", (req, res) => res.json("Clients works"));


//@route   POST api/clients/macros
//@desc    Sets clients current macros from trainer
//@access  Private

router.post("/macros", passport.authenticate("jwt", {session: false}), (req, res) => {
	const client_id = req.user.id;
	const trainer_id = req.user.current_trainer;



	Trainer.findById(trainer_id)
	.then(trainer => {
		const clientIndex = trainer.client_list.findIndex(trainersClient => trainersClient.client == client_id);
		console.log(clientIndex);
		const newMacros = {
			fat: req.body.fat,
			protein: req.body.protein,
			carbs: req.body.carbs
		}
		
		trainer.client_list[clientIndex].macros = newMacros;
		trainer.save().then(macros => res.json(newMacros));
	})
	.catch(err => console.error(err))

});


//@route   GET api/clients/macros
//@desc    Gets current macros from trainer
//@access  Private

router.get("/macros", passport.authenticate("jwt", {session: false}), (req, res) => {
	const client_id = req.user.id;
	const trainer_id = req.user.current_trainer;

	Trainer.findById(trainer_id)
	.then(trainer => {
		const clientInfo = trainer.client_list.filter(trainersClient => trainersClient.client == client_id);

		const macros = {
			fat: clientInfo[0].macros.fat ? clientInfo[0].macros.fat : "",
			protein: clientInfo[0].macros.protein ? clientInfo[0].macros.protein : "",
			carbs: clientInfo[0].macros.carbs ? clientInfo[0].macros.carbs : ""
		}
		
		res.json(macros);
	});

});




module.exports = router;