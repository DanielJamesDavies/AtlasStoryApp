const mongoose = require("mongoose");

const CharacterSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	story_id: mongoose.Schema.Types.ObjectId,
	group_id: mongoose.Schema.Types.ObjectId,
	data: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("Character", CharacterSchema);
