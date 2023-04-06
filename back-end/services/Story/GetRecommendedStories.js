const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const User = require("../../models/User");
const StoryFollow = require("../../models/StoryFollow");

const StoryViewAuthentication = require("../../services/StoryViewAuthentication");

module.exports = async (req, res) => {
	let stories = await Story.find({}, { _id: 1, uid: 1, owner: 1, "data.title": 1, "data.isPrivate": 1, "data.genres": 1 })
		.limit(24)
		.exec()
		.catch(() => []);

	stories = (
		await Promise.all(
			stories.map(async (story) => {
				const storyMemberAuthenticationResponse = await StoryViewAuthentication(req, { status: () => {}, story_id: story._id }, () => true);
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

	let sortedStories = await getSortedStories(req?.cookies?.AtlasStoryAppToken, stories);
	if (sortedStories !== false) stories = sortedStories;

	return res.status(200).send({ message: "Success", data: { stories } });
};

async function getSortedStories(AtlasStoryAppToken, stories) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (!user_id) return false;

	const user = await User.findById(user_id, { _id: 1, "data.favouritedGenres": 1 })
		.exec()
		.catch(() => false);
	if (!user) return false;

	return stories.sort((story1, story2) => {
		const intersection1 = user?.data?.favouritedGenres.filter(
			(e) => story1?.data?.genres.findIndex((e2) => JSON.stringify(e) === JSON.stringify(e2)) !== -1
		);
		const intersection2 = user?.data?.favouritedGenres.filter(
			(e) => story2?.data?.genres.findIndex((e2) => JSON.stringify(e) === JSON.stringify(e2)) !== -1
		);
		return intersection1?.length < intersection2?.length ? 1 : -1;
	});
}

async function getGenreIntersection(userGenres, storyGenres) {
	let user_id = false;
	try {
		user_id = jwt_decode(AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (!user_id) return 0;

	const user = await User.findById(user_id, { _id: 1, "data.favouritedGenres": 1 })
		.exec()
		.catch(() => false);
	if (!user) return 0;

	const intersection = user?.data?.favouritedGenres.filter((e) => storyGenres.findIndex((e2) => JSON.stringify(e) === JSON.stringify(e2)) !== -1);
	return intersection?.length ? intersection.length : 0;
}

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
