const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: {
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
	data: {
		nickname: {
			type: String,
			require: true,
			min: 1,
			max: 32,
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
		uiTheme: {
			type: String,
			require: true,
			default: "dark",
		},
		fontSizeMultiplier: {
			type: String,
			require: true,
			default: "1",
		},
	},
	verified: { type: Boolean, require: true },
	date_created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
