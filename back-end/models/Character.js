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
	character_type_id: mongoose.Schema.Types.ObjectId,
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
			summaryItems: {
				type: [{ label: { type: String, required: true }, value: { type: String, required: true } }],
				required: true,
				default: [],
			},
			description: { type: [String], default: [""] },
			colour: { type: String, default: "#0044ff" },
			cardBackground: mongoose.Schema.Types.ObjectId,
			overviewBackground: mongoose.Schema.Types.ObjectId,
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
