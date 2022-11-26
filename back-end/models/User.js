const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
	username: {
		type: String,
		required: true,
		min: 1,
		max: 32,
	},
	email: {
		type: String,
		required: true,
		min: 1,
		max: 255,
	},
	data: {
		nickname: {
			type: String,
			min: 1,
			max: 32,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 255,
		},
		profilePicture: {
			type: mongoose.Schema.Types.ObjectId,
			default: new mongoose.Types.ObjectId(),
		},
		banner: {
			type: mongoose.Schema.Types.ObjectId,
			default: new mongoose.Types.ObjectId(),
		},
		stories: {
			type: [{ type: mongoose.Schema.Types.ObjectId }],
			default: [],
		},
		favouritedGenres: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		uiTheme: {
			type: String,
			default: "dark",
		},
		fontSizeMultiplier: {
			type: String,
			default: "1",
		},
		connectToSpotify: { type: Boolean, default: false },
	},
	verified: { type: Boolean, require: true },
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
