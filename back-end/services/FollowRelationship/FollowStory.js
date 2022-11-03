const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const FollowRelationship = require("../../models/FollowRelationship");

module.exports = async (req, res) => {
	if (!req?.query?.id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return res.status(200).send({ errors: [{ message: "Authentication Error" }] });

	const followRelationships = await FollowRelationship.find({ followerId: user_id, followingId: req.query.id, followingType: "story" });

	if (followRelationships.length !== 0) return res.status(200).send({ errors: [{ message: "You Are Already Following This Story" }] });

	const followRelationship = new FollowRelationship({
		_id: new mongoose.Types.ObjectId(),
		followerId: user_id,
		followingId: req.query.id,
		followingType: "story",
	});

	try {
		await followRelationship.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Could Not Follow Story" }] });
	}

	return res.status(200).send({ message: "Success", data: { followRelationship } });
};
