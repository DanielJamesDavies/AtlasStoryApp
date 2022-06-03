const jwt_decode = require("jwt-decode");

const User = require("../../models/User");

module.exports = async (req, res) => {
	if (req.query.username) {
		let user = await User.findOne({ username: req.query.username })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "User Not Found" }] });
			});
		if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

		let newUser = JSON.parse(JSON.stringify(user));
		delete newUser.password;

		return res.status(200).send({
			message: "Success",
			data: { user: newUser, isAuthorizedToEdit: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, newUser._id) },
		});
	}

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	let user = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	res.status(200).send({
		message: "Success",
		data: { user, isAuthorizedToEdit: true },
	});
};

function getIsAuthorizedToModify(AtlasStoryAppToken, user_id) {
	// Is Authorized User
	var isAuthorizedUser = false;
	try {
		isAuthorizedUser = jwt_decode(AtlasStoryAppToken)?.user_id === user_id.toString();
	} catch (error) {}

	return isAuthorizedUser;
}
