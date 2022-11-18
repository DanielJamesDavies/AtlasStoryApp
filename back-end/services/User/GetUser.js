const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	if (req.query.username) {
		let user = await User.findOne({ username: req.query.username })
			.exec()
			.catch(() => false);
		if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

		const newUser = getUserWithoutPassword(user);

		return res.status(200).send({
			message: "Success",
			data: { user: newUser, isAuthorizedToEdit: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, newUser._id) },
		});
	}

	let users = await User.find()
		.exec()
		.catch(() => false);
	if (!users) return res.status(200).send({ errors: [{ message: "Users Not Found" }] });

	users = users.map((user) => getUserWithoutPassword(user));

	if (req.query.profilePicture === "true") {
		users = await Promise.all(
			users.map(async (user) => {
				let newUser = JSON.parse(JSON.stringify(user));
				const profilePicture = await Image.findOne({ _id: newUser?.data?.profilePicture });
				if (profilePicture) newUser.data.profilePicture = profilePicture;
				return newUser;
			})
		);
	}

	res.status(200).send({ message: "Success", data: { users: users } });
};

function getUserWithoutPassword(user) {
	let newUser = JSON.parse(JSON.stringify(user));
	delete newUser.data.password;
	return newUser;
}

function getIsAuthorizedToModify(AtlasStoryAppToken, user_id) {
	// Is Authorized User
	var isAuthorizedUser = false;
	try {
		isAuthorizedUser = jwt_decode(AtlasStoryAppToken)?.user_id === user_id.toString();
	} catch (error) {}

	return isAuthorizedUser;
}
