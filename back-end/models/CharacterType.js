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
			description: [String],
		},
		require: true,
	},
});

module.exports = mongoose.model("CharacterType", CharacterTypeSchema);
