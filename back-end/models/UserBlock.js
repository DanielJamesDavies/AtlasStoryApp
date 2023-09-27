const mongoose = require("mongoose");

const UserBlockSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	blocked_user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("UserBlock", UserBlockSchema);
