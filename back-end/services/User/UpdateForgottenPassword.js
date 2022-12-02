const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const ForgotPasswordVerification = require("../../models/ForgotPasswordVerification");

module.exports = async (req, res) => {
	if (!req?.body?.username || !req?.body?.email || !req?.body?.password || !req?.body?.verificationCode)
		return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	// Get User
	const user = await User.findOne({ username: req.body.username }, { _id: 1 })
		.exec()
		.catch(() => false);
	if (!user || !user?._id) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	// Check If New Password is Valid
	const validatePasswordResponse = validatePassword(req?.body?.password);
	if (validatePasswordResponse?.errors) return res.status(200).send({ errors: validatePasswordResponse.errors });

	// Check If Verification Code is Valid
	const isValidVerificationCodeResponse = await isValidVerificationCode(user._id, req.body.email, req.body.verificationCode);
	if (isValidVerificationCodeResponse?.errors) return res.status(200).send({ errors: isValidVerificationCodeResponse.errors });

	// Delete Verification Codes
	const deleteVerificationsResponse = await deleteForgotPasswordVerifications(user._id);
	if (deleteVerificationsResponse?.errors) return res.status(200).send({ errors: deleteVerificationsResponse.errors });

	// Updated User Verified
	const updateUserPasswordResponse = await updateUserPassword(user._id, req.body.password);
	if (updateUserPasswordResponse?.errors) return res.status(200).send({ errors: updateUserPasswordResponse.errors });

	return res.status(200).send({ message: "Success" });
};

function validatePassword(password) {
	if (typeof password !== "string" || password.split("").length < 6 || password.split("").length > 255)
		return { errors: [{ message: "Invalid Password" }] };
	return {};
}

async function isValidVerificationCode(user_id, email, verificationCode) {
	const forgotPasswordVerifications = await ForgotPasswordVerification.find({ user_id, email })
		.exec()
		.catch(() => []);
	if (!forgotPasswordVerifications || forgotPasswordVerifications.length === 0)
		return { errors: [{ message: "Forgotten Password Verification Not Found." }] };

	const results = await Promise.all(
		forgotPasswordVerifications.map(async (forgotPasswordVerification) => {
			if (!forgotPasswordVerification || !forgotPasswordVerification?.verification_code) return false;
			const result = await bcrypt.compare(verificationCode, forgotPasswordVerification.verification_code);
			return result ? true : false;
		})
	);

	return results.filter((e) => e === true).length !== 0 ? {} : { errors: [{ message: "Invalid Verification Code" }] };
}

async function deleteForgotPasswordVerifications(user_id) {
	try {
		await ForgotPasswordVerification.deleteMany({ user_id });
	} catch (error) {}
	return {};
}

async function updateUserPassword(user_id, password) {
	const user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(user));

	// Hash Password
	const passwordSalt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, passwordSalt);

	newUser.data.password = hashedPassword;

	try {
		await User.findOneAndUpdate({ _id: user._id }, newUser, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "User Could Not Be Saved" }] };
	}
}
