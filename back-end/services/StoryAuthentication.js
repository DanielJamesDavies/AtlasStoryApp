const jwt = require("jsonwebtoken");
const Story = require("../models/Story");

module.exports = async (req, res, next) => {
	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let user_id = false;
	try {
		user_id = jwt.verify(token, process.env.TOKEN_SECRET)?.user_id;
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });
	}
	if (!user_id) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const story = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => false);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	if (story?.owner && JSON.stringify(user_id) === JSON.stringify(story?.owner)) return next();

	if (!story?.data?.members) return res.status(200).send({ errors: [{ message: "Access Denied" }] });
	const collaboratorIDs = story.data.members
		.map((member) => {
			if (!member?.user_id || member?.type !== "collaborator") return false;
			return JSON.stringify(member?.user_id);
		})
		.filter((e) => e !== false);
	if (collaboratorIDs.includes(JSON.stringify(user_id))) return next();

	return res.status(200).send({ errors: [{ message: "Access Denied" }] });
};
