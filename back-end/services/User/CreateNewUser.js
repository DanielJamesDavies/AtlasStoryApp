const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	let validateUserResult = validateUser(req.body);
	if (validateUserResult?.errors) return res.status(200).send({ errors: validateUserResult.errors });

	// Check if username is used
	const usernameUsed = await User.findOne({
		username: req.body.username,
	}).exec();

	// Check if email is used
	const emailUsed = await User.findOne({ email: req.body.email }).exec();

	// If username or email is used, return error
	if (usernameUsed || emailUsed) {
		return res.status(200).send({ error: { usernameUsed: usernameUsed ? true : false, emailUsed: emailUsed ? true : false } });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const profilePictureID = new mongoose.Types.ObjectId();
	const bannerID = new mongoose.Types.ObjectId();

	// New User
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		username: req.body.username,
		nickname: req.body.nickname,
		email: req.body.email,
		password: hashedPassword,
		profilePicture: profilePictureID,
		banner: bannerID,
		stories: [],
	});

	// Create Token
	const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

	user.save()
		.then(() => {
			// New profile
			const profilePicture = new Image({ _id: profilePictureID, image: req.body.profilePicture });
			profilePicture
				.save()
				.then(() => {
					return res.status(200).send({ message: "Success", data: { token, username: user.username } });
				})
				.catch((err) => {
					return res.status(200).send({ error: err });
				});
		})
		.catch((err) => {
			return res.status(200).send({ error: err });
		});
};

function validateUser(user) {
	const userSchema = Joi.object({
		username: Joi.string().min(1).max(32).required(),
		nickname: Joi.string().min(1).max(32).required(),
		email: Joi.string().min(1).max(255).required().email(),
		password: Joi.string().min(6).max(255).required(),
		profilePicture: Joi.string().min(1).required(),
	});

	const userValidationError = userSchema.validate(user, { abortEarly: false })?.error?.details;

	if (userValidationError) {
		let userKeysData = [
			{ key: "username", name: "Username", indefiniteArticle: "a" },
			{ key: "nickname", name: "Nickname", indefiniteArticle: "a" },
			{ key: "email", name: "Email", indefiniteArticle: "an" },
			{ key: "password", name: "Password", indefiniteArticle: "a" },
			{ key: "profilePicture", name: "Profile Picture", indefiniteArticle: "a" },
		];

		return {
			errors: userValidationError.map((error) => {
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
			}),
		};
	}
	return {};
}
