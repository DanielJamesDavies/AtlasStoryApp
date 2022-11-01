const Substory = require("../../models/Substory");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");
const addToStoryChangeLog = require("../Story/AddToStoryChangeLog");

module.exports = async (req, res) => {
	const substory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!substory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

	const removeSubstoryFromStoryResult = await removeSubstoryFromStory(req.params.id, substory.story_id);
	if (removeSubstoryFromStoryResult?.errors) return res.status(200).send({ errors: removeSubstoryFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("substory_id", substory._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const substoryDeleteResult = await Substory.deleteOne({ _id: substory._id });
		if (substoryDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Substory Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Substory Could Not Be Deleted" }] });
	}

	addToStoryChangeLog(req.body.story_id, {
		content_type: "substory",
		title: 'Deleted Substory "' + substory?.data?.name + '"',
	});

	return res.status(200).send({ message: "Success" });
};

async function removeSubstoryFromStory(substory_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Story Not Found" }] };
		});
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
