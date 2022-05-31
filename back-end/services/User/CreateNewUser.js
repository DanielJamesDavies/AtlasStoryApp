const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const uuidv4 = require("uuid")?.v4;

const User = require("../../models/User");
const UserVerification = require("../../models/UserVerification");
const Image = require("../../models/Image");

const emailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD },
});

var isEmailTransporterVerified = false;
emailTransporter.verify((error, success) => {
	if (!error && success) isEmailTransporterVerified = true;
});

module.exports = async (req, res) => {
	if (!isEmailTransporterVerified) return res.status(200).send({ errors: [{ message: "New users cannot be created at this current time." }] });

	// Validate New User Data
	let validateUserResult = await validateUser(req.body);
	if (validateUserResult.errors.length > 0) return res.status(200).send({ errors: validateUserResult.errors });

	// Hash Password
	const passwordSalt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

	const profilePictureID = new mongoose.Types.ObjectId();
	const bannerID = new mongoose.Types.ObjectId();

	// Create New User
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		username: req.body.username,
		email: req.body.email,
		data: {
			nickname: req.body.nickname,
			password: hashedPassword,
			profilePicture: profilePictureID,
			banner: bannerID,
			stories: [],
		},
		verified: false,
	});

	// User Verification
	const userVerificationResponse = await createUserVerification(user._id);
	if (!userVerificationResponse?.verificationCode) {
		return res.status(200).send({ errors: [{ message: "User Verification Could Not Be Generated" }] });
	}

	const verificationEmailResponse = await sendVerificaionEmail(req.body.username, req.body.email, userVerificationResponse.verificationCode);
	if (verificationEmailResponse?.error) {
		return res.status(200).send({ errors: [{ message: "User Verification Email Could Not Be Sent" }] });
	}

	// Save New User
	try {
		await user.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Created" }] });
	}

	// Create and Save New Profile Picture
	const profilePicture = new Image({ _id: profilePictureID, image: req.body.profilePicture });

	try {
		await profilePicture.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Profile Picture Could Not Be Created" }] });
	}

	// Create and Save New Banner
	const banner = new Image({ _id: bannerID, image: req.body.banner });

	try {
		await banner.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Banner Could Not Be Created" }] });
	}

	// Success Response
	return res.status(200).send({ message: "Success" });
};

async function validateUser(user) {
	let errors = [];

	const userSchema = Joi.object({
		username: Joi.string().min(1).max(32).required(),
		nickname: Joi.string().min(1).max(32).required(),
		email: Joi.string().min(1).max(255).required().email(),
		password: Joi.string().min(6).max(255).required(),
		profilePicture: Joi.string().min(1).required(),
		banner: Joi.string().min(1).required(),
	});

	const userValidationError = userSchema.validate(user, { abortEarly: false })?.error?.details;

	if (userValidationError) {
		let userKeysData = [
			{ key: "username", name: "Username", indefiniteArticle: "a" },
			{ key: "nickname", name: "Nickname", indefiniteArticle: "a" },
			{ key: "email", name: "Email", indefiniteArticle: "an" },
			{ key: "password", name: "Password", indefiniteArticle: "a" },
			{ key: "profilePicture", name: "Profile Picture", indefiniteArticle: "a" },
			{ key: "banner", name: "Banner", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			userValidationError.map((error) => {
				let keyData = userKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						if (error.path[0] === "profilePicture") {
							message = "Please Select " + keyData.indefiniteArticle + " " + keyData.name;
						} else {
							message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						}
						break;
					case "string.min":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Above " +
							error.context.limit +
							" Characters";
						break;
					case "string.max":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Below " +
							error.context.limit +
							" Characters";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			})
		);
	}

	// Check if username is used
	const usernameUsed = await User.findOne({
		username: user.username,
	}).exec();
	if (usernameUsed) errors.push({ attribute: "username", message: "This username is being used by another user." });

	// Check if email is used
	const emailUsed = await User.findOne({ email: user.email }).exec();
	if (emailUsed) errors.push({ attribute: "email", message: "This email is being used by another user." });

	return { errors };
}

async function createUserVerification(user_id) {
	const verificationCode = uuidv4();
	const verificationCodeSalt = await bcrypt.genSalt(10);
	const hashedVerificationCode = await bcrypt.hash(verificationCode, verificationCodeSalt);

	// Create New User
	const userVerification = new UserVerification({
		_id: new mongoose.Types.ObjectId(),
		user_id: user_id,
		verification_code: hashedVerificationCode,
	});

	try {
		await userVerification.save();
	} catch (error) {
		return {};
	}

	return { verificationCode };
}

async function sendVerificaionEmail(username, email, verificationCode) {
	const verificationLink = "https://www.atlas-story.app/verify/" + username + "/" + verificationCode;

	const message =
		"<p>To complete registering your Atlas Story App account for " +
		username +
		", please <a href='" +
		verificationLink +
		"'>click here</a> to verify your email address.</p>";

	const res = await new Promise((resolve, reject) => {
		emailTransporter
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
				reject({ error });
			});
	});
	return res;
}
