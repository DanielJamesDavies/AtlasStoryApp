const jwt_decode = require("jwt-decode");

const StoryFollow = require("../../models/StoryFollow");
const Story = require("../../models/Story");

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

	res.status(200).send({ message: "Success" });

	await updateStoryFollowerCount(story_id);
};

async function updateStoryFollowerCount(story_id) {
	const story = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!story) return false;

	let newStory = JSON.parse(JSON.stringify(story));

	const storyFollows = (
		await StoryFollow.find({ story_id })
			.exec()
			.catch(() => [])
	)?.length;
	let storyFollowersCount = storyFollows ? storyFollows : 0;

	newStory.followerCount = storyFollowersCount;

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return false;
	}
	return true;
}
