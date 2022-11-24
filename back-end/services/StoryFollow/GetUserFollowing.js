const jwt_decode = require("jwt-decode");

const StoryFollow = require("../../models/StoryFollow");
const Story = require("../../models/Story");
const User = require("../../models/User");

const StoryMemberAuthentication = require("../StoryMemberAuthentication");

module.exports = async (req, res) => {
	let user_id = req?.params?.id;
	if (!user_id || user_id === "me") {
		try {
			user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
		}
	}

	const storyFollows = await StoryFollow.find({ user_id })
		.exec()
		.catch(() => false);
	if (!storyFollows) return res.status(200).send({ errors: [{ message: "Failure" }] });

	const stories = (await Promise.all(storyFollows.map(async (storyFollow) => await getStory(req, storyFollow?.story_id)))).filter(
		(e) => e !== false
	);

	return res.status(200).send({ message: "Success", data: { storyFollows, stories } });
};

async function getStory(req, story_id) {
	if (!story_id) return false;

	const storyMemberAuthenticationResponse = await StoryMemberAuthentication(req, { story_id, status: () => {} }, () => true);
	if (storyMemberAuthenticationResponse !== true) return false;

	const story = await Story.findById(story_id, { _id: 1, uid: 1, owner: 1, "data.title": 1, "data.isPrivate": 1 })
		.exec()
		.catch(() => false);
	if (!story) return res.status(200).send({ errors: [{ message: "Failure" }] });

	let newStory = JSON.parse(JSON.stringify(story));

	if (newStory?.owner) {
		const owner = await User.findById(newStory.owner, { _id: 1, username: 1, "data.nickname": 1 })
			.exec()
			.catch(() => false);
		if (owner) newStory.data.owner = { _id: owner._id, username: owner?.username, nickname: owner?.data?.nickname };
	}

	return newStory;
}
