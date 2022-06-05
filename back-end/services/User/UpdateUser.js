const jwt_decode = require("jwt-decode");
const nodemailer = require("nodemailer");

const User = require("../../models/User");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");
const { createUserVerification, sendVerificaionEmail } = require("./UserVerification");

const emailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});

var isEmailTransporterVerified = false;
emailTransporter.verify((error, success) => {
	if (!error && success) isEmailTransporterVerified = true;
});

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"] || req?.body?.path === ["verified"])
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const oldUser = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!oldUser) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(oldUser));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["username"]):
			const isUsernameUsed = await User.findOne({ username: req.body.newValue }).exec();
			if (isUsernameUsed)
				return res.status(200).send({ errors: [{ attribute: "username", message: "This username is being used by another user." }] });
			newUser.username = req.body.newValue;
			break;
		case JSON.stringify(["email"]):
			const isEmailUsed = await User.findOne({ email: req.body.newValue }).exec();
			if (isEmailUsed)
				return res.status(200).send({ errors: [{ attribute: "email", message: "This email is being used by another user." }] });

			const userVerificationResponse = await createUserVerification(newUser._id, req.body.newValue);
			if (!userVerificationResponse?.verificationCode) {
				return res.status(200).send({ errors: [{ message: "User Verification Could Not Be Generated" }] });
			}

			const verificationEmailResponse = await sendVerificaionEmail(
				newUser.username,
				req.body.newValue,
				userVerificationResponse.verificationCode,
				emailTransporter
			);
			if (verificationEmailResponse?.error) {
				return res.status(200).send({ errors: [{ message: "User Verification Email Could Not Be Sent" }] });
			}

			break;
		default:
			newUser = ChangeValueInNestedObject(newUser, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await User.findOneAndUpdate({ _id: user_id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { user: newUser } });
};
