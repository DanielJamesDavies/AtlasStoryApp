const jwt_decode = require("jwt-decode");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

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
			return res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!oldUser) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(oldUser));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["username"]):
			const isUsernameUsed = await User.findOne({ username: req.body.newValue })
				.exec()
				.catch((error) => {
					return res.status(200).send({ errors: [{ attribute: "username", message: "This username is being used by another user." }] });
				});
			if (isUsernameUsed)
				return res.status(200).send({ errors: [{ attribute: "username", message: "This username is being used by another user." }] });
			newUser.username = req.body.newValue;
			break;

		case JSON.stringify(["email"]):
			if (!isEmailTransporterVerified)
				return res.status(200).send({
					errors: [{ message: "Your Email Could Not Be Changed as the Email Verification Service Is Not Currently Responding" }],
				});

			const validateEmailResult = await validateEmail(req.body.newValue);
			if (validateEmailResult.errors.length > 0) return res.status(200).send({ errors: validateEmailResult.errors });

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

		case JSON.stringify(["data", "password"]):
			const validatePasswordResult = validatePassword(req.body.newValue);
			if (validatePasswordResult.errors.length > 0) return res.status(200).send({ errors: validatePasswordResult.errors });

			const passwordSalt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.newValue, passwordSalt);
			newUser.data.password = hashedPassword;
			break;

		default:
			newUser = ChangeValueInNestedObject(newUser, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await User.findOneAndReplace({ _id: user_id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { user: newUser } });
};

async function validateEmail(email) {
	let errors = [];

	const emailSchema = Joi.object({
		email: Joi.string().min(1).max(255).required().email(),
	});

	const emailValidationError = emailSchema.validate({ email }, { abortEarly: false })?.error?.details;

	if (emailValidationError) {
		errors = errors.concat(
			emailValidationError.map((error) => {
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter an Email Address";
						break;
					case "string.min":
						message = "Please Enter an Email Address That Is Above " + error.context.limit + " Characters";
						break;
					case "string.max":
						message = "Please Enter an Email Address That Is Below " + error.context.limit + " Characters";
						break;
					case "string.email":
						message = "Please Enter a Valid Email Address";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: "email", message };
			})
		);
	}

	const isEmailUsed = await User.findOne({ email })
		.exec()
		.catch((error) => {});
	if (isEmailUsed) errors.push({ attribute: "email", message: "This email is being used by another user." });

	return { errors };
}

function validatePassword(password) {
	let errors = [];

	const passwordSchema = Joi.object({
		password: Joi.string().min(6).max(255).required(),
	});

	const passwordValidationError = passwordSchema.validate({ password }, { abortEarly: false })?.error?.details;

	if (passwordValidationError) {
		errors = errors.concat(
			passwordValidationError.map((error) => {
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter a Password";
						break;
					case "string.min":
						message = "Please Enter a Password That Is Above " + error.context.limit + " Characters";
						break;
					case "string.max":
						message = "Please Enter a Password That Is Below " + error.context.limit + " Characters";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: "password", message };
			})
		);
	}

	return { errors };
}
