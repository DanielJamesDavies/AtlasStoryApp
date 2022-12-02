const mongoose = require("mongoose");

const ForgotPasswordVerificationSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
	user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	email: { type: String, required: true },
	verification_code: { type: String, required: true },
});

module.exports = mongoose.model("ForgotPasswordVerification", ForgotPasswordVerificationSchema);
