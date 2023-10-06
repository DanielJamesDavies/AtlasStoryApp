const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const UserFollow = require("../../models/UserFollow");
const User = require("../../models/User");

module.exports = async (req, res) => {
	let following_user = false;
	let following_user_id = req?.params?.id;

	if (req?.params?.id) {
		following_user = await User.findById(req?.params?.id)
			.exec()
			.catch(() => false);
	} else if (req?.query?.username) {
		following_user = await User.findOne({ username })
			.exec()
			.catch(() => false);

		following_user_id = following_user?._id;
	}

	if (!following_user?._id) return res.status(200).send({ errors: [{ message: "User Not Found" }] });
	if (!following_user_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const isAlreadyFollowing =
		(
			await UserFollow.find({ follower_id: user_id, following_id: following_user_id })
				.exec()
				.catch(() => [])
		).length !== 0;

	if (isAlreadyFollowing) return res.status(200).send({ errors: [{ message: "User Is Already Following This User" }] });

	const userFollow = new UserFollow({
		_id: new mongoose.Types.ObjectId(),
		follower_id: user_id,
		following_id: following_user_id,
		status: following_user?.isPrivate ? "pending" : "confirmed",
	});

	try {
		await userFollow.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Follow User" }] });
	}

	res.status(200).send({ message: "Success", data: { userFollow } });
};
