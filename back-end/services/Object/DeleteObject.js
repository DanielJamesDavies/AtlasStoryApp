const Object = require("../../models/Object");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const object = await Object.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!object) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(object.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const removeObjectFromStoryResult = await removeObjectFromStory(req.params.id, object.story_id);
	if (removeObjectFromStoryResult?.errors) return res.status(200).send({ errors: removeObjectFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("object_id", object._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const objectDeleteResult = await Object.deleteOne({ _id: object._id });
		if (objectDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Object Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Object Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeObjectFromStory(object_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.objects) newStory.data.objects = [];
	const objectIndex = newStory.data.objects.findIndex((e) => JSON.stringify(e) === JSON.stringify(object_id));
	if (objectIndex !== -1) newStory.data.objects.splice(objectIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
