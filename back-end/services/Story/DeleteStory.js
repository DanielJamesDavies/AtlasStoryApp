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
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!story || !story._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	if (!story?.owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
	if (JSON.stringify(user_id) !== JSON.stringify(story.owner)) return res.status(200).send({ errors: [{ message: "Unauthorized Action" }] });

	try {
		const storyDeleteResult = await Story.deleteOne({ _id: story._id });
		if (storyDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Deleted" }] });
	}

	const owner = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Owner Not Found" }] });
		});
	if (!owner) return res.status(200).send({ errors: [{ message: "Owner Not Found" }] });

	const ownerStoryIndex = owner.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story._id));
	if (ownerStoryIndex !== -1) {
		owner.data.stories.splice(ownerStoryIndex, 1);
		try {
			await owner.save();
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Owner Could Not Be Saved" }] });
		}
	}

	if (story?.data?.icon) {
		try {
			await Story.deleteOne({ _id: story.data.icon });
		} catch (error) {}
	}

	if (story?.data?.banner) {
		try {
			await Story.deleteOne({ _id: story.data.banner });
		} catch (error) {}
	}

	if (story?.data?.cover) {
		try {
			await Story.deleteOne({ _id: story.data.cover });
		} catch (error) {}
	}

	// Delete Groups

	// Delete Characters and Character Images

	// Delete Character Types

	return res.status(200).send({ message: "Success" });
};
