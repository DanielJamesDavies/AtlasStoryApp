const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const UserBlock = require("../../models/UserBlock");

module.exports = async (req, res) => {
	const username = req?.query?.username;
	if (!username) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const second_user = await User.findOne({ username })
		.exec()
		.catch(() => false);
	if (!second_user?._id) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	const hasBlockedUser = (await UserBlock.findOne({ user_id: user_id, blocked_user_id: second_user?._id })
		.exec()
		.catch(() => false))
		? true
		: false;

	const hasBeenBlockedByUser = (await UserBlock.findOne({ blocked_user_id: user_id, user_id: second_user?._id })
		.exec()
		.catch(() => false))
		? true
		: false;

	return res.status(200).send({ message: "Success", data: { hasBlockedUser, hasBeenBlockedByUser } });
};
