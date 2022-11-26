const mongoose = require("mongoose");

const UserVerificationSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
	user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	email: { type: String, required: true },
	verification_code: { type: String, required: true },
});

module.exports = mongoose.model("UserVerification", UserVerificationSchema);
