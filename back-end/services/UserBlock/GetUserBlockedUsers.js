const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const UserBlock = require("../../models/UserBlock");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	let blockedUsers = await UserBlock.find({ user_id })
		.exec()
		.catch(() => false);
	if (!blockedUsers) return res.status(200).send({ errors: [{ message: "Blocked Users Not Found" }] });

	blockedUsers = await Promise.all(
		blockedUsers?.map(async (userBlock) => {
			let user = await User.findById(userBlock?.blocked_user_id)
				.exec()
				.catch(() => false);
			if (!user) return { _id: userBlock?.blocked_user_id };
			return { _id: userBlock?.blocked_user_id, username: user?.username, data: { nickname: user?.data?.nickname } };
		})
	);

	return res.status(200).send({ message: "Success", data: { blockedUsers } });
};
