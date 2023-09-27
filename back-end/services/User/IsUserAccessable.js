const jwt_decode = require("jwt-decode");
const User = require("../../models/User");
const UserFollow = require("../../models/UserFollow");
const UserBlock = require("../../models/UserBlock");

module.exports = async (req, res, next) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	let user = false;
	if (req?.query?.username) {
		user = await User.findOne({username: req.query.username})
		.exec()
		.catch(() => false);
	} else if (req?.params?.id) {
		user = await User.findById(req.params.id)
		.exec()
		.catch(() => false);
	} else {
		return next();
	}
	
	if (!user || !user?._id) return res.status(200).send({ errors: [{ message: "Could Not Find User" }] });
	if (JSON.stringify(user?._id) === JSON.stringify(user_id)) return next();
	if (user?.isPrivate === false) return next();

	const userBlock = UserBlock.findOne({ blocked_user_id: user_id, user_id: user?._id });
	if (userBlock?._id) return res.status(200).send({ errors: [{ message: "You have been blocked by this user" }] });

	const userFollow = UserFollow.findOne({following_id: user_id, follower_id: user?._id });
	if (!userFollow?._id) return res.status(200).send({ errors: [{ message: "Not Following Private User" }] });
	if (userFollow?.status !== "confirmed") return res.status(200).send({ errors: [{ message: "Not Following Private User" }] });
	return next();
};