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
	profilePicture: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("User", UserSchema);
