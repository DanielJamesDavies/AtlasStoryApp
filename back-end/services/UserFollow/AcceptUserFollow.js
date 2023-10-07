const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const UserFollow = require("../../models/UserFollow");

module.exports = async (req, res) => {
	let following_user_id = req?.params?.id;

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const oldUserFollow = await UserFollow.findOne({ follower_id: following_user_id, following_id: user_id })
		.exec()
		.catch(() => false);
	if (!oldUserFollow) return res.status(200).send({ errors: [{ message: "User Follow Request Not Found" }] });

	let newUserFollow = JSON.parse(JSON.stringify(oldUserFollow));
	newUserFollow.status = "confirmed";

	try {
		await UserFollow.findOneAndReplace({ _id: oldUserFollow?._id }, newUserFollow, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Follow Could Not Be Saved" }] });
	}

	res.status(200).send({ message: "Success" });
};
