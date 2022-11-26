const mongoose = require("mongoose");

const StoryFollowSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: new mongoose.Types.ObjectId(),
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("StoryFollow", StoryFollowSchema);
