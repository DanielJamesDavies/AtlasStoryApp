const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	group_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	url: {
		type: String,
		require: true,
	},
	isPrimaryCharacter: {
		type: Boolean,
		require: true,
	},
	data: {
		type: {
			name: {
				type: String,
				require: true,
			},
			fullName: String,
			descriptives: String,
			represents: String,
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
