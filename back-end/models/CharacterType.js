const mongoose = require("mongoose");

const CharacterTypeSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	url: {
		type: String,
		required: true,
	},
	data: {
		type: {
			name: {
				type: String,
				require: true,
			},
			colour: {
				type: String,
				require: true,
			},
		},
		require: true,
	},
});

module.exports = mongoose.model("CharacterType", CharacterTypeSchema);
