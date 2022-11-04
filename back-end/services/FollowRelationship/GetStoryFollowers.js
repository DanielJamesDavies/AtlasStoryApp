const FollowRelationship = require("../../models/FollowRelationship");
const User = require("../../models/User");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	const followRelationships = await FollowRelationship.find({ followingId: req.params.id, followingType: "story" });
	const followerUsers = await Promise.all(
		followRelationships.map(async (followRelationship) => await User.findOne({ _id: followRelationship?.followerId }))
	);

	return res.status(200).send({ message: "Success", data: { followRelationships, followerUsers } });
};
