const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid")?.v4;

const User = require("../../models/User");
const ForgotPasswordVerification = require("../../models/ForgotPasswordVerification");

module.exports = async (req, res) => {
	if (!req?.body?.email) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	const user = await User.findOne({ email: req.body.email })
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	const createForgotPasswordVerificationResponse = await createForgotPasswordVerification(user?._id, user?.email);
	if (!createForgotPasswordVerificationResponse || createForgotPasswordVerificationResponse?.errors)
		return res.status(200).send({ errors: createForgotPasswordVerificationResponse?.errors });

	const sendVerificaionEmailResponse = await sendVerificaionEmail(
		req,
		user?.username,
		user?.email,
		createForgotPasswordVerificationResponse?.verificationCode
	);
	if (!sendVerificaionEmailResponse || sendVerificaionEmailResponse?.errors)
		return res.status(200).send({ errors: sendVerificaionEmailResponse?.errors });

	return res.status(200).send({ message: "Success" });
};

async function createForgotPasswordVerification(user_id, email) {
	const verificationCode = uuidv4();
	if (!verificationCode) return { errors: [{ message: "Could Not Create Password Verification Code" }] };

	const verificationCodeSalt = await bcrypt.genSalt(10);
	const hashedVerificationCode = await bcrypt.hash(verificationCode, verificationCodeSalt);

	const forgotPasswordVerification = new ForgotPasswordVerification({
		_id: new mongoose.Types.ObjectId(),
		user_id: user_id,
		email: email,
		verification_code: hashedVerificationCode,
	});

	try {
		await forgotPasswordVerification.save();
	} catch (error) {
		return { errors: [{ message: "Could Not Create Password Verification Code" }] };
	}

	return { verificationCode };
}

async function sendVerificaionEmail(req, username, email, verificationCode) {
	if (!req?.isEmailTransporterVerified || !req?.emailTransporter) return { errors: [{ message: "Error. Please try again later." }] };

	const verificationLink = "https://www.atlas-story.app/change-forgotten-password/" + username + "/" + email + "/" + verificationCode;

	const message =
		"Please <a href='" +
		verificationLink +
		"'>click here</a> to reset your password on your Atlas Story App account with the username, " +
		username +
		".</p>";

	const res = await new Promise((resolve, reject) => {
		req.emailTransporter
			.sendMail({
				from: process.env.EMAIL_ADDRESS,
				to: email,
				subject: "Change Password for Your Atlas Story App Account",
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
