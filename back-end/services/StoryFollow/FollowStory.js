const mongoose = require("mongoose");
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

	res.status(200).send({ message: "Success", data: { storyFollow } });

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
