const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const User = require("../../models/User");
const StoryFollow = require("../../models/StoryFollow");

const StoryMemberAuthentication = require("../../services/StoryMemberAuthentication");

module.exports = async (req, res) => {
	let stories = await Story.find({}, { _id: 1, uid: 1, owner: 1, followerCount: 1, "data.title": 1, "data.isPrivate": 1 })
		.sort({ followerCount: -1 })
		.limit(12)
		.exec()
		.catch(() => []);

	stories = (
		await Promise.all(
			stories.map(async (story) => {
				const storyMemberAuthenticationResponse = await StoryMemberAuthentication(
					req,
					{ status: () => {}, story_id: story._id },
					() => true
				);
				if (storyMemberAuthenticationResponse !== true) return false;

				const isFollowingStory = await getIsFollowingStory(req?.cookies?.AtlasStoryAppToken, story?._id);
				if (isFollowingStory) return false;

				let newStory = JSON.parse(JSON.stringify(story));

				if (newStory?.owner) {
					const owner = await User.findById(newStory.owner, { _id: 1, username: 1, "data.nickname": 1 })
						.exec()
						.catch(() => false);
					if (owner) newStory.data.owner = { _id: owner._id, username: owner?.username, nickname: owner?.data?.nickname };
				}

				return newStory;
			})
		)
	).filter((e) => e !== false);

	return res.status(200).send({ message: "Success", data: { stories } });
};

async function getIsFollowingStory(AtlasStoryAppToken, story_id) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (!user_id) return false;

	return (
		(
			await StoryFollow.find({ user_id, story_id: story_id })
				.exec()
				.catch(() => [])
		).length !== 0
	);
}
