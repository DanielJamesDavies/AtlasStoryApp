const mongoose = require("mongoose");
const Joi = require("joi");

const Object = require("../../models/Object");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	req.body.uid = req.body.uid.split(" ").join("-");

	let validateObjectResult = await validateObject(req.body);
	if (validateObjectResult?.errors?.length > 0) return res.status(200).send({ errors: validateObjectResult.errors });

	// New Object
	const object = new Object({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		uid: req.body.uid,
		data: { name: req.body.name },
	});

	const addObjectToStoryResult = await addObjectToStory(object._id, req.body.story_id);
	if (addObjectToStoryResult?.errors) return res.status(200).send({ errors: addObjectToStoryResult?.errors });

	try {
		await object.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Object Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { object_uid: object.uid } });
};

async function validateObject(object) {
	let errors = [];

	const objectSchema = Joi.object({
		story_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
	});

	const objectValidationError = objectSchema.validate(object, { abortEarly: false })?.error?.details;

	if (objectValidationError) {
		let objectKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			objectValidationError.map((error) => {
				let keyData = objectKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Above " + error.context.limit + " Objects";
						break;
					case "string.max":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Below " + error.context.limit + " Objects";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			})
		);
	}

	const uidUsed = await Object.findOne({ uid: object.uid, story_id: object.story_id }).exec();
	if (uidUsed) errors.push({ attribute: "uid", message: "This UID is being used by another object. Please enter a different UID" });

	return { errors };
}

async function addObjectToStory(object_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.objects) newStory.data.objects = [];
	if (newStory.data.objects.findIndex((e) => JSON.stringify(e) === JSON.stringify(object_id)) === -1) newStory.data.objects.push(object_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
