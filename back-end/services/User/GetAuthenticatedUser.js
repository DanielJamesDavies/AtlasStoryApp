const jwt_decode = require("jwt-decode");

const User = require("../../models/User");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	let user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(user));
	delete newUser.data.password;

	res.status(200).send({
		message: "Success",
		data: { user: newUser, isAuthorizedToEdit: true },
	});
};
