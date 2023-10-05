const jwt_decode = require("jwt-decode");

const UserBlock = require("../../models/UserBlock");

module.exports = async (req, res) => {
	const blocked_user_id = req?.params?.id;
	if (!blocked_user_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const userBlock = await UserBlock.findOne({ user_id: user_id, blocked_user_id: blocked_user_id })
		.exec()
		.catch(() => false);
	if (!userBlock) return res.status(200).send({ message: "Success" });

	try {
		const userBlockDeleteResult = await UserBlock.deleteOne({ _id: userBlock._id });
		if (userBlockDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Failed To Unblock User" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Unblock User" }] });
	}

	res.status(200).send({ message: "Success" });
};
