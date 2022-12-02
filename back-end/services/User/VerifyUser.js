const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const UserVerification = require("../../models/UserVerification");

module.exports = async (req, res) => {
	if (!req?.body?.username || !req?.body?.email || !req?.body?.verificationCode)
		return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	// Get User
	const user = await User.findOne({ username: req.body.username })
		.exec()
		.catch(() => false);
	if (!user || !user?._id) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	// Check If Verification Code is Valid
	const isValidVerificationCodeResponse = await isValidVerificationCode(user._id, req.body.email, req.body.verificationCode);
	if (isValidVerificationCodeResponse?.errors) return res.status(200).send({ errors: isValidVerificationCodeResponse.errors });

	// Delete Verification Codes
	const deleteUserVerificationsResponse = await deleteUserVerifications(user._id);
	if (deleteUserVerificationsResponse?.errors) return res.status(200).send({ errors: deleteUserVerificationsResponse.errors });

	// Updated User Verified
	const updateUserVerifiedResponse = await updateUserVerified(user._id, req.body.email);
	if (updateUserVerifiedResponse?.errors) return res.status(200).send({ errors: updateUserVerifiedResponse.errors });

	return res.status(200).send({ message: "Success" });
};

async function isValidVerificationCode(user_id, email, verificationCode) {
	const userVerification = await UserVerification.findOne({ user_id, email })
		.exec()
		.catch(() => false);
	if (!userVerification || !userVerification?.verification_code) return { errors: [{ message: "User Verified" }] };

	const result = await bcrypt.compare(verificationCode, userVerification.verification_code);
	return result ? {} : { errors: [{ message: "Invalid Verification Code" }] };
}

async function deleteUserVerifications(user_id) {
	try {
		await UserVerification.deleteMany({ user_id: user_id });
	} catch (error) {}
	return {};
}

async function updateUserVerified(user_id, email) {
	const user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(user));
	newUser.email = email;
	newUser.verified = true;

	try {
		await User.findOneAndUpdate({ _id: user._id }, newUser, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "User Could Not Be Saved" }] };
	}
}
