const mongoose = require("mongoose");

const UserVerificationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
	email: { type: String, require: true },
	verification_code: { type: String, require: true },
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);
