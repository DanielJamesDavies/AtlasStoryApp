const mongoose = require("mongoose");

const StoryFollowSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	story_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
});

module.exports = mongoose.model("StoryFollow", StoryFollowSchema);
