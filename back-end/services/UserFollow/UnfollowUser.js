const jwt_decode = require("jwt-decode");

const UserFollow = require("../../models/UserFollow");

module.exports = async (req, res) => {
	const following_user_id = req?.params?.id;
	if (!following_user_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const userFollow = await UserFollow.findOne({ follower_id: user_id, following_id: following_user_id })
		.exec()
		.catch(() => false);
	if (!userFollow) return res.status(200).send({ message: "Success" });

	try {
		const userFollowDeleteResult = await UserFollow.deleteOne({ _id: userFollow._id });
		if (userFollowDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Failed To Unfollow User" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Unfollow User" }] });
	}

	res.status(200).send({ message: "Success" });
};
