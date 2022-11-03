const jwt_decode = require("jwt-decode");

const FollowRelationship = require("../../models/FollowRelationship");

module.exports = async (req, res) => {
	if (!req?.query?.id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return res.status(200).send({ errors: [{ message: "Authentication Error" }] });

	const followRelationships = await FollowRelationship.find({ followerId: req.query.id, followingId: user_id, followingType: "user" });
	let isUserFollowing = followRelationships.length !== 0;

	return res.status(200).send({ message: "Success", data: { isUserFollowing } });
};
