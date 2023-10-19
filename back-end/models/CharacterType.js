const mongoose = require("mongoose");

const CharacterTypeSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	data: {
		type: {
			name: {
				type: String,
				default: "Character Type",
			},
			colour: {
				type: String,
				default: "#0044ff",
			},
			description: { type: [String], default: [""] },
		},
	},
});

module.exports = mongoose.model("CharacterType", CharacterTypeSchema);
