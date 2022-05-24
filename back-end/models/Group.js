const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	story_id: mongoose.Schema.Types.ObjectId,
	data: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("Group", GroupSchema);
