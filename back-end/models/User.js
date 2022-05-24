const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	nickname: {
		type: String,
		require: true,
		min: 1,
		max: 32,
	},
	email: {
		type: String,
		require: true,
		min: 1,
		max: 255,
	},
	password: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},
	profilePicture: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	banner: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	stories: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				require: true,
			},
		],
		require: true,
	},
});

module.exports = mongoose.model("User", UserSchema);
