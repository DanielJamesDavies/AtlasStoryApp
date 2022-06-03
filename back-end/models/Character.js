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
			fullName: { type: String, default: "" },
			descriptives: { type: String, default: "" },
			represents: { type: String, default: "" },
			colour: { type: String, default: "#0044ff" },
			primaryAbility: { type: String, default: "" },
		},
		require: true,
	},
});

module.exports = mongoose.model("Character", CharacterSchema);
