const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const StoryFollow = require("../../models/StoryFollow");

const StoryMemberAuthentication = require("../../services/StoryMemberAuthentication");

module.exports = async (req, res) => {
	if (req?.query?.uid) {
		const storyMemberAuthenticationResponse = await StoryMemberAuthentication(req, res, () => true);
		if (storyMemberAuthenticationResponse !== true) return false;

		let story = await Story.findOne({ uid: req.query.uid })
			.exec()
			.catch(() => false);
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		const isAuthorizedToEdit = getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, story);
		const isFollowingStory = await getIsFollowingStory(req?.cookies?.AtlasStoryAppToken, story);

		return res.status(200).send({ message: "Success", data: { story, isAuthorizedToEdit, isFollowingStory } });
	}
};

function getIsAuthorizedToModify(AtlasStoryAppToken, story) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (!user_id) return false;

	if (story?.owner && JSON.stringify(user_id) === JSON.stringify(story?.owner)) return true;

	if (!story?.data?.members) return false;

	const collaboratorIDs = story.data.members
		.map((member) => {
			if (!member?.user_id || member?.type !== "collaborator") return false;
			return member;
		})
		.filter((e) => e !== false);

	if (collaboratorIDs.includes(user_id)) return true;

	return false;
}

async function getIsFollowingStory(AtlasStoryAppToken, story) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (!user_id) return false;

	return (
		(
			await StoryFollow.find({ user_id, story_id: story?._id })
				.exec()
				.catch(() => [])
		).length !== 0
	);
}
