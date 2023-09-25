const LoreItem = require("../../models/LoreItem");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const lore_item = await LoreItem.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!lore_item) return res.status(200).send({ errors: [{ message: "LoreItem Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(lore_item.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const removeLoreItemFromStoryResult = await removeLoreItemFromStory(req.params.id, lore_item.story_id);
	if (removeLoreItemFromStoryResult?.errors) return res.status(200).send({ errors: removeLoreItemFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("lore_item_id", lore_item._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const lore_itemDeleteResult = await LoreItem.deleteOne({ _id: lore_item._id });
		if (lore_itemDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "LoreItem Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "LoreItem Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeLoreItemFromStory(lore_item_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.lore) newStory.data.lore = [];
	const lore_itemIndex = newStory.data.lore.findIndex((e) => JSON.stringify(e) === JSON.stringify(lore_item_id));
	if (lore_itemIndex !== -1) newStory.data.lore.splice(lore_itemIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
