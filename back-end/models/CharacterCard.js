const mongoose = require("mongoose");

const CharacterCardSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	group_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	uid: {
		type: String,
		required: true,
		index: true,
	},
	isPrimaryCharacter: { type: Boolean, default: false },
	isBackgroundCharacter: { type: Boolean, default: false },
	character_type_id: { type: mongoose.Schema.Types.ObjectId },
	data: {
		type: {
			name: {
				type: String,
				default: "",
			},
			summaryItems: {
				type: [{ label: { type: String, default: "" }, text: { type: String, default: "" } }],
				default: [],
			},
			colour: { type: String, default: "#0044ff" },
			cardNameColour: { type: String, default: "#0088ff" },
			cardBackground: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
			cardBackgroundProperties: {
				type: {
					alignment: { type: String, default: "center" },
					position: { type: [Number], default: [0, 0] },
					scale: { type: Number, default: 1 },
				},
				default: {},
			},
			faceImage: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				auto: true,
			},
		},
	},
});

module.exports = mongoose.model("CharacterCard", CharacterCardSchema);
