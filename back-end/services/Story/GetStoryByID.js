const jwt_decode = require("jwt-decode");
const Story = require("../../models/Story");
const User = require("../../models/User");

module.exports = async (req, res) => {
	const story = await Story.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	let newStory = JSON.parse(JSON.stringify(story));

	if (!story?.owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });

	const owner = await User.findById(story.owner)
		.exec()
		.catch(() => false);
	if (!owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
	newStory.data.owner = { _id: owner._id, username: owner.username, nickname: owner?.data?.nickname };

	res.status(200).send({
		message: "Success",
		data: { story: newStory, isAuthorizedToEdit: getIsAuthorizedToModify(req?.cookies?.AtlasStoryAppToken, newStory) },
	});
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
