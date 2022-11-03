const mongoose = require("mongoose");

const FollowRelationshipSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	followerId: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	followingId: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	followingType: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("FollowRelationship", FollowRelationshipSchema);
