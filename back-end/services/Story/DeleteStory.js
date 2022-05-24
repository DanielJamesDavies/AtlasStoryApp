const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const story = await Story.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!story || !story._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	if (!story?.owner) return res.status(200).send({ error: "Owner Not Found" });
	if (user_id !== story.owner) return res.status(200).send({ errors: [{ message: "Unauthorized Action" }] });

	try {
		const storyDeleteResult = await Story.deleteOne({ _id: story._id });
		if (storyDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	}

	const owner = await User.findById(user_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!owner) return res.status(200).send({ error: "Owner Not Found" });

	const ownerStoryIndex = owner.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story._id));
	if (ownerStoryIndex !== -1) {
		owner.stories.splice(ownerStoryIndex, 1);
		try {
			await owner.save();
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Owner Could Not Be Saved" }] });
		}
	}

	return res.status(200).send({ message: "Success" });
};
