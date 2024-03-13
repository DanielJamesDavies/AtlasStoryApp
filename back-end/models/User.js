const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
	username: {
		type: String,
		required: true,
		min: 1,
		max: 32,
		index: true,
	},
	email: {
		type: String,
		required: true,
		min: 1,
		max: 255,
	},
	isPrivate: {
		type: Boolean,
		required: true,
		default: false,
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
			required: true,
			auto: true,
		},
		banner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			auto: true,
		},
		stories: {
			type: [{ type: mongoose.Schema.Types.ObjectId }],
			default: [],
		},
		followingStories: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		favouritedGenres: {
			type: [mongoose.Schema.Types.ObjectId],
			default: [],
		},
		uiTheme: {
			type: String,
			default: "dim",
		},
		fontSize: {
			type: String,
			default: "m",
		},
		isDisplayingAiAssistant: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	verified: { type: Boolean, require: true },
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
