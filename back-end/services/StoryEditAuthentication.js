const jwt = require("jsonwebtoken");
const Story = require("../models/Story");

module.exports = async (req, res, next) => {
	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const story = await getStory(req);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	const isOwnerOrCollaborator = getIsOwnerOrCollaborator(story, token);
	if (isOwnerOrCollaborator) return next();

	return res.status(200).send({ errors: [{ message: "Access Denied" }] });
};

async function getStory(req) {
	const storyFilter = { _id: 1, owner: 1, "data.members": 1 };
	let story_id = false;
	if (req?.body?.story_id) {
		story_id = req.body.story_id;
	} else if (req?.query?.story_id) {
		story_id = req.query.story_id;
	}
	if (!story_id) return false;

	const story = await Story.findById(story_id, storyFilter)
		.exec()
		.catch(() => false);
	if (!story) return false;

	return story;
}

function getIsOwnerOrCollaborator(story, token) {
	let user_id = false;
	try {
		user_id = jwt.verify(token, process.env.TOKEN_SECRET)?.user_id;
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });
	}
	if (!user_id) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	if (story?.owner && JSON.stringify(user_id) === JSON.stringify(story?.owner)) return true;

	if (!story?.data?.members) return false;

	const collaboratorIDs = story.data.members
		.map((member) => {
			if (!member?.user_id || member?.type !== "collaborator") return false;
			return JSON.stringify(member?.user_id);
		})
		.filter((e) => e !== false);

	if (collaboratorIDs.includes(JSON.stringify(user_id))) return true;

	return false;
}
