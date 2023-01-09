const mongoose = require("mongoose");

const CharacterRelationshipSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	story_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	character_ids: [mongoose.Schema.Types.ObjectId],
	relationship_type: mongoose.Schema.Types.ObjectId,
	character_1_items: { type: [{ title: { type: String, default: "" }, text: { type: [String], default: [""] } }], default: [] },
	character_2_items: { type: [{ title: { type: String, default: "" }, text: { type: [String], default: [""] } }], default: [] },
});

module.exports = mongoose.model("CharacterRelationship", CharacterRelationshipSchema);
