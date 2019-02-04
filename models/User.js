const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({

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
	isTrainer: {
		type: Boolean,
		default: true
	},

	avatar:{
		type: String,
	},

	date:{
		type: Date,
		default: Date.now
	},
	clients: [
		{
			client: {
				type: Schema.Types.ObjectId,
				ref: "clients",
			},
			macros: {
				fat: {
					type: String
				},
				protein: {
					type: String
				},
				carbs: {
					type: String
				}
			},
			progress_updates: [
				{
					date:{
						type: Date,
						default: Date.now,
					},
					weight:{
						type: String,
					},
					macros:{
						fat: {
							type: String
						},
						protein: {
							type: String
						},
						carbs: {
							type: String
						}
					}
				}
			]
		}
	]

});

module.exports = User = mongoose.model("users", UserSchema);