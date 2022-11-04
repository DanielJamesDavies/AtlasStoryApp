const jwt_decode = require("jwt-decode");

const FollowRelationship = require("../../models/FollowRelationship");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return res.status(200).send({ errors: [{ message: "Authentication Error" }] });

	const followRelationships = await FollowRelationship.find({ followerId: user_id, followingId: req.params.id, followingType: "story" });

	if (followRelationships.length === 0) return res.status(200).send({ errors: [{ message: "You Are Already Not Following This Story" }] });

	try {
		const followRelationshipDeleteResult = await FollowRelationship.deleteOne({ _id: followRelationships[0]._id });
		if (followRelationshipDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Could Not Unfollow Story" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Could Not Unfollow Story" }] });
	}

	return res.status(200).send({ message: "Success", data: {} });
};
