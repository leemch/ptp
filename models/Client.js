const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create schema
const ClientSchema = new Schema({

	name:{
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},

	password:{
		type: String,
		required: true
	},

	avatar:{
		type: String,
	},

	date:{
		type: Date,
		default: Date.now
	},
	current_trainer: {
		type: Schema.Types.ObjectId,
	},
	macros: {
		fat: {
			type: Number,
			default: 0
		},
		protein: {
			type: Number,
			default: 0
		},
		carbs: {
			type: Number,
			default: 0
		}
	}

});

module.exports = Client = mongoose.model("clients", ClientSchema);