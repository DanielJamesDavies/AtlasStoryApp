const jwt_decode = require("jwt-decode");

const User = require("../../models/User");

module.exports = async (req, res) => {
	const user = await User.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(user));
	delete newUser.password;

	res.status(200).send({
		message: "Success",
		data: { user: newUser, isAuthorizedToModify: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, newUser._id) },
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
