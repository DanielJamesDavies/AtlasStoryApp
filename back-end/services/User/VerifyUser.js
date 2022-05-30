const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const UserVerification = require("../../models/UserVerification");

module.exports = async (req, res) => {
	if (!req?.body?.username || !req?.body?.verificationCode) return;

	// Get User
	const user = await User.findOne({ username: req.body.username })
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	// Check If Verification Code is Valid
	const isValidVerificationCodeResponse = await isValidVerificationCode(user._id, req.body.verificationCode);
	if (isValidVerificationCodeResponse?.errors) return res.status(200).send({ errors: isValidVerificationCodeResponse.errors });

	// Updated User Verified
	const updateUserVerifiedResponse = await updateUserVerified(user);
	if (updateUserVerifiedResponse?.errors) return res.status(200).send({ errors: updateUserVerifiedResponse.errors });

	return res.status(200).send({ message: "Success" });
};

async function isValidVerificationCode(user_id, verificationCode) {
	const userVerification = await UserVerification.findOne({ user_id })
		.exec()
		.catch(() => {
			return { errors: [{ message: "Invalid Verification Code" }] };
		});
	if (!userVerification?.verification_code) return { errors: [{ message: "Invalid Verification Code" }] };

	const result = await bcrypt.compare(verificationCode, userVerification.verification_code);
	return result ? {} : { errors: [{ message: "Invalid Verification Code" }] };
}

async function updateUserVerified(user) {
	let newUser = JSON.parse(JSON.stringify(user));
	newUser.verified = true;

	try {
		await User.findOneAndUpdate({ _id: user._id }, newUser, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "User Could Not Be Saved" }] };
	}
}
