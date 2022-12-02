const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid")?.v4;

const UserVerification = require("../../models/UserVerification");

async function createUserVerification(user_id, email) {
	const verificationCode = uuidv4();
	const verificationCodeSalt = await bcrypt.genSalt(10);
	const hashedVerificationCode = await bcrypt.hash(verificationCode, verificationCodeSalt);

	// Create New User Verification
	const userVerification = new UserVerification({
		_id: new mongoose.Types.ObjectId(),
		user_id: user_id,
		email: email,
		verification_code: hashedVerificationCode,
	});

	try {
		await userVerification.save();
	} catch (error) {
		return {};
	}

	return { verificationCode };
}

async function sendVerificaionEmail(req, username, email, verificationCode) {
	if (!req?.isEmailTransporterVerified || !req?.emailTransporter) return { errors: [{ message: "Error. Please try again later." }] };

	const verificationLink = "https://www.atlas-story.app/verify/" + username + "/" + email + "/" + verificationCode;

	const message =
		"<p>To complete registering your Atlas Story App account for " +
		username +
		", please <a href='" +
		verificationLink +
		"'>click here</a> to verify your email address.</p>";

	const res = await new Promise((resolve, reject) => {
		req.emailTransporter
			.sendMail({
				from: process.env.EMAIL_ADDRESS,
				to: email,
				subject: "Verify Your Email for Your Atlas Story App Account",
				html: message,
				text: message,
			})
			.then((message) => {
				resolve({ message });
			})
			.catch((error) => {
				reject({ errors: [{ message: error }] });
			});
	});
	return res;
}

module.exports = { createUserVerification, sendVerificaionEmail };
