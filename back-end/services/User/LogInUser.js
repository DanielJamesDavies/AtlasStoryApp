const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

module.exports = async (req, res) => {
	// Login Input Validation
	const schema = Joi.object({
		username: Joi.string().min(1).required(),
		password: Joi.string().min(6).required(),
	});
	const validationError = schema.validate(req.body).error;
	if (validationError) return res.status(200).send({ error: validationError });

	// Check if user with username exists
	const user = await User.findOne({
		username: req.body.username,
	}).exec();
	if (!user) return res.status(200).send({ error: "There is no account with this username." });

	// Check if password is correct
	const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
	if (!isCorrectPassword) return res.status(200).send({ error: "Incorrect Password." });

	// Create token
	const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

	// Token Cookies
	let cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
		expires: new Date(Math.floor(Date.now()) + 60 * 60 * 24 * 365 * 1000),
		path: "/",
	};
	res.cookie("AtlasStoryAppToken", token, cookieOptions);

	res.status(200).send({ message: "Success", data: { username: user.username } });
};
