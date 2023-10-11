const Event = require("../../models/Event");
const Story = require("../../models/Story");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const event = await Event.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!event) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(event.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const removeEventFromStoryResult = await removeEventFromStory(req.params.id, event.story_id);
	if (removeEventFromStoryResult?.errors) return res.status(200).send({ errors: removeEventFromStoryResult?.errors });

	const delete_images_result = await deleteImagesByKey("event_id", event._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const eventDeleteResult = await Event.deleteOne({ _id: event._id });
		if (eventDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Event Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Event Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeEventFromStory(event_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.events) newStory.data.events = [];
	const eventIndex = newStory.data.events.findIndex((e) => JSON.stringify(e) === JSON.stringify(event_id));
	if (eventIndex !== -1) newStory.data.events.splice(eventIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
