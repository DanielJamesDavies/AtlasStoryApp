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

	const storyFollow = await StoryFollow.findOne({ user_id, story_id })
		.exec()
		.catch(() => false);
	if (!storyFollow) return res.status(200).send({ message: "Success" });

	try {
		const storyFollowDeleteResult = await StoryFollow.deleteOne({ _id: storyFollow._id });
		if (storyFollowDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Failed To Unfollow Story" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Failed To Unfollow Story" }] });
	}

	return res.status(200).send({ message: "Success" });
};
