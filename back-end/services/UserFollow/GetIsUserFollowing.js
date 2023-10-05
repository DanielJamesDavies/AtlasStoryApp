const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const UserFollow = require("../../models/UserFollow");

module.exports = async (req, res) => {
	const username = req?.query?.username;
	if (!username) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const following_user = await User.findOne({ username })
		.exec()
		.catch(() => false);
	if (!following_user?._id) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	const userFollow = await UserFollow.findOne({ follower_id: user_id, following_id: following_user?._id })
		.exec()
		.catch(() => false);

	return res.status(200).send({ message: "Success", data: { isFollowing: userFollow ? true : false } });
};
