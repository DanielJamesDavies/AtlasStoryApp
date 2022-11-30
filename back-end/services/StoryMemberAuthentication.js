const jwt = require("jsonwebtoken");
const Story = require("../models/Story");

module.exports = async (req, res, next) => {
	const storyFilter = { _id: 1, owner: 1, "data.members": 1 };
	let story = false;
	if (req?.query?.story_id) {
		story = await Story.findById(req.query.story_id, storyFilter)
			.exec()
			.catch(() => false);
	} else if (req?.query?.story_uid) {
		story = await Story.findOne({ uid: req.query.story_uid }, storyFilter)
			.exec()
			.catch(() => false);
	} else if (req?.body?.story_id) {
		story = await Story.findById(req.body.story_id, storyFilter)
			.exec()
			.catch(() => false);
	} else if (req?.body?.story_uid) {
		story = await Story.findOne({ uid: req.body.story_uid }, storyFilter)
			.exec()
			.catch(() => false);
	} else if (res.story_id) {
		story = await Story.findById(res.story_id, storyFilter)
			.exec()
			.catch(() => false);
	}
	if (!story) return res?.status(200)?.send({ errors: [{ message: "Story Not Found" }] });

	if (!story?.data?.isPrivate) return next();

	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res?.status(200)?.send({ errors: [{ message: "Access Denied" }] });

	let user_id = false;
	try {
		user_id = jwt.verify(token, process.env.TOKEN_SECRET)?.user_id;
	} catch (error) {
		return res?.status(200)?.send({ errors: [{ message: "Access Denied" }] });
	}
	if (!user_id) return res?.status(200)?.send({ errors: [{ message: "Access Denied" }] });

	if (story?.owner && JSON.stringify(user_id) === JSON.stringify(story?.owner)) return next();

	if (!story?.data?.members) return res?.status(200)?.send({ errors: [{ message: "Access Denied" }] });
	const memberIDs = story.data.members
		.map((member) => {
			if (!member?.user_id) return false;
			return JSON.stringify(member.user_id);
		})
		.filter((e) => e !== false);
	if (memberIDs.includes(JSON.stringify(user_id))) return next();

	return res?.status(200)?.send({ errors: [{ message: "Access Denied" }] });
};
