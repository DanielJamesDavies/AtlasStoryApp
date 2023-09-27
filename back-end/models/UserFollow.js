const mongoose = require("mongoose");

const UserFollowSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	follower_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	following_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "pending"
	}
});

module.exports = mongoose.model("UserFollow", UserFollowSchema);
