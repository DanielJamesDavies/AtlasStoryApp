const jwt_decode = require("jwt-decode");

const FollowRelationship = require("../../models/FollowRelationship");

module.exports = async (req, res) => {
	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return res.status(200).send({ errors: [{ message: "Authentication Error" }] });

	let feedItems = [];
	return res.status(200).send({ message: "Success", data: { feedItems } });
};
