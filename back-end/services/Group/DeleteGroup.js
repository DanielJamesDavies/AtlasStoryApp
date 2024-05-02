const Group = require("../../models/Group");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const group = await Group.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(group.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	if (group?.data?.characters?.length !== 0)
		return res.status(200).send({ errors: [{ message: "Group Contains Characters and Could Not Be Deleted" }] });

	const removeGroupFromStoryResult = await removeGroupFromStory(group._id, group.story_id);
	if (removeGroupFromStoryResult?.errors) return res.status(200).send({ errors: removeGroupFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("group_id", group._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const groupDeleteResult = await Group.deleteOne({ _id: group._id });
		if (groupDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Group Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Group Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeGroupFromStory(group_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.groups) newStory.data.groups = [];
	const groupIndex = newStory.data.groups.findIndex((e) => JSON.stringify(e) === JSON.stringify(group_id));
	if (groupIndex !== -1) newStory.data.groups.splice(groupIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
