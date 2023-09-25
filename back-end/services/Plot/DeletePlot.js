const Plot = require("../../models/Substory");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const substory = await Plot.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!substory) return res.status(200).send({ errors: [{ message: "Plot Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(substory.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const removePlotFromStoryResult = await removePlotFromStory(req.params.id, substory.story_id);
	if (removePlotFromStoryResult?.errors) return res.status(200).send({ errors: removePlotFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("substory_id", substory._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const substoryDeleteResult = await Plot.deleteOne({ _id: substory._id });
		if (substoryDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Plot Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Plot Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removePlotFromStory(substory_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.substories) newStory.data.substories = [];
	const substoryIndex = newStory.data.substories.findIndex((e) => JSON.stringify(e) === JSON.stringify(substory_id));
	if (substoryIndex !== -1) newStory.data.substories.splice(substoryIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
