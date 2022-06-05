const jwt_decode = require("jwt-decode");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (!req.query.url) return;

	let story = await Story.findOne({ url: req.query.url })
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	return res
		.status(200)
		.send({ message: "Success", data: { story, isAuthorizedToEdit: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, story) } });
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
