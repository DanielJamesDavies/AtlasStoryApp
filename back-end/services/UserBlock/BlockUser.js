const mongoose = require("mongoose");
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

	const isAlreadyBlocking =
		(
			await UserBlock.find({ user_id: user_id, blocked_user_id: blocked_user_id })
				.exec()
				.catch(() => [])
		).length !== 0;

	if (isAlreadyBlocking) return res.status(200).send({ errors: [{ message: "User Is Already Blocking This User" }] });

	const userBlock = new UserBlock({ _id: new mongoose.Types.ObjectId(), user_id: user_id, blocked_user_id: blocked_user_id });

	try {
		await userBlock.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Block User" }] });
	}

	res.status(200).send({ message: "Success", data: { userBlock } });
};
