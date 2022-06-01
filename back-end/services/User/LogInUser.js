const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = async (req, res) => {
	const validateRequestBodyResponse = validateRequestBody(req.body);
	if (validateRequestBodyResponse?.errors) return res.status(200).send({ errors: validateRequestBodyResponse.errors });

	// Check if user is valid
	const user = await User.findOne({ username: req.body.username }).exec();
	if (!user) return res.status(200).send({ errors: [{ attribute: "username", message: "There is no account with this username." }] });
	if (!user?.data?.password) return res.status(200).send({ errors: [{ message: "There is no password associated with this account." }] });
	if (!user?.verified) return res.status(200).send({ errors: [{ message: "This account is not verified." }] });

	// Check if password is correct
	const isCorrectPassword = await bcrypt.compare(req.body.password, user.data.password);
	if (!isCorrectPassword) return res.status(200).send({ errors: [{ attribute: "password", message: "Incorrect Password." }] });

	// Create token
	const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

	// Token Cookies
	let cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		expires: new Date(Math.floor(Date.now()) + 60 * 60 * 24 * 365 * 2 * 1000),
		path: "/",
	};
	res.cookie("AtlasStoryAppToken", token, cookieOptions);

	res.status(200).send({ message: "Success", data: { username: user.username } });
};

function validateRequestBody(body) {
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		password: Joi.string().min(6).required(),
	});
	const userValidationError = schema.validate(body, { abortEarly: false })?.error?.details;
	if (!userValidationError) return {};

	let userKeysData = [
		{ key: "username", name: "Username", indefiniteArticle: "a" },
		{ key: "password", name: "Password", indefiniteArticle: "a" },
	];

	return {
		errors: userValidationError.map((error) => {
			let keyData = userKeysData.find((e) => e.key === error.path[0]);
			let message = "";

			switch (error.type) {
				case "string.empty":
					message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
					break;
				case "string.min":
					message =
						"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Above " + error.context.limit + " Characters";
					break;
				case "string.max":
					message =
						"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Below " + error.context.limit + " Characters";
					break;
				default:
					message = "An Unknown Error Has Occured. Please Try Again";
					break;
			}

			return { attribute: error.path[0], message };
		}),
	};
}
