const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const StoryFollow = require("../../models/StoryFollow");

module.exports = async (req, res) => {
	const story_id = req?.params?.id;
	if (!story_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const isAlreadyFollowing =
		(
			await StoryFollow.find({ user_id, story_id })
				.exec()
				.catch(() => [])
		).length !== 0;

	if (isAlreadyFollowing) return res.status(200).send({ errors: [{ message: "User Is Already Following This Story" }] });

	const storyFollow = new StoryFollow({ _id: new mongoose.Types.ObjectId(), user_id, story_id });

	try {
		await storyFollow.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Follow Story" }] });
	}

	return res.status(200).send({ message: "Success", data: { storyFollow } });
};
