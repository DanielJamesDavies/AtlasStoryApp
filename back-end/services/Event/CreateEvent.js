const mongoose = require("mongoose");
const Joi = require("joi");

const Event = require("../../models/Event");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	req.body.uid = req.body.uid.split(" ").join("-");

	let validateEventResult = await validateEvent(req.body);
	if (validateEventResult?.errors?.length > 0) return res.status(200).send({ errors: validateEventResult.errors });

	// New Event
	const event = new Event({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		uid: req.body.uid,
		data: { name: req.body.name },
	});

	const addEventToStoryResult = await addEventToStory(event._id, req.body.story_id);
	if (addEventToStoryResult?.errors) return res.status(200).send({ errors: addEventToStoryResult?.errors });

	try {
		await event.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Event Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { event_uid: event.uid } });
};

async function validateEvent(event) {
	let errors = [];

	const eventSchema = Joi.object({
		story_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
	});

	const eventValidationError = eventSchema.validate(event, { abortEarly: false })?.error?.details;

	if (eventValidationError) {
		let eventKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			eventValidationError.map((error) => {
				let keyData = eventKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Above " + error.context.limit + " Events";
						break;
					case "string.max":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Below " + error.context.limit + " Events";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			})
		);
	}

	const uidUsed = await Event.findOne({ uid: event.uid, story_id: event.story_id }).exec();
	if (uidUsed) errors.push({ attribute: "uid", message: "This UID is being used by another event. Please enter a different UID" });

	return { errors };
}

async function addEventToStory(event_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.events) newStory.data.events = [];
	if (newStory.data.events.findIndex((e) => JSON.stringify(e) === JSON.stringify(event_id)) === -1) newStory.data.events.push(event_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
