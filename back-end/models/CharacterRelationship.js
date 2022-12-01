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
});

module.exports = mongoose.model("CharacterRelationship", CharacterRelationshipSchema);
