const jwt_decode = require("jwt-decode");

const UserFollow = require("../../models/UserFollow");
const UserBlock = require("../../models/UserBlock");
const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	const user_id = req?.params?.id;
	if (!user_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	let followers = await UserFollow.find({ following_id: user_id })
		.exec()
		.catch(() => false);

	try {
		var auth_user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	followers = await Promise.all(
		followers.map(async (userFollow) => {
			const authUserBlock = await UserBlock.findOne({ blocked_user_id: auth_user_id, user_id: userFollow?.follower_id })
				.exec()
				.catch(() => false);
			if (authUserBlock?._id) return false;

			const user = await User.findById(userFollow?.follower_id)
				.exec()
				.catch(() => false);

			if (user?.isPrivate && JSON.stringify(user?._id) !== JSON.stringify(auth_user_id)) {
				const authUserFollow = await UserFollow.findOne({ following_id: userFollow?.follower_id, follower_id: auth_user_id })
					.exec()
					.catch(() => false);
				if (!authUserFollow?._id) return false;
				if (authUserFollow?.status !== "confirmed") return false;
			}

			const profilePicture = await Image.findById(user?.data?.profilePicture)
				.exec()
				.catch(() => false);
			return { userFollow, user: { _id: user?._id, username: user?.username, data: { nickname: user?.data?.nickname } }, profilePicture };
		})
	);

	return res.status(200).send({ message: "Success", data: { followers } });
};
