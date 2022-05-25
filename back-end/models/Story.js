const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	url: {
		type: String,
		require: true,
		min: 1,
		max: 64,
	},
	title: {
		type: String,
		require: true,
		min: 1,
		max: 64,
	},
	owner: {
		type: String,
		require: true,
	},
	isPrivate: {
		type: Boolean,
		require: true,
	},
	members: {
		type: [
			{
				user_id: {
					type: mongoose.Schema.Types.ObjectId,
					require: true,
				},
				canEdit: {
					type: Boolean,
					require: true,
				},
			},
		],
		require: true,
	},
	preferences: {
		accentColour: String,
	},
	icon: mongoose.Schema.Types.ObjectId,
	banner: mongoose.Schema.Types.ObjectId,
	cover: mongoose.Schema.Types.ObjectId,
	date_created: { type: Date, default: Date.now },
	description: Array,
	genres: String,
});

module.exports = mongoose.model("Story", StorySchema);
