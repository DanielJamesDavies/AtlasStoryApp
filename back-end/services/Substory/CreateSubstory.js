const mongoose = require("mongoose");
const Joi = require("joi");

const Substory = require("../../models/Substory");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	req.body.uid = req.body.uid.split(" ").join("-");

	let validateSubstoryResult = await validateSubstory(req.body);
	if (validateSubstoryResult?.errors?.length > 0) return res.status(200).send({ errors: validateSubstoryResult.errors });

	// New Substory
	const substory = new Substory({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		uid: req.body.uid,
		data: { name: req.body.name },
	});

	const addSubstoryToStoryResult = await addSubstoryToStory(substory._id, req.body.story_id);
	if (addSubstoryToStoryResult?.errors) return res.status(200).send({ errors: addSubstoryToStoryResult?.errors });

	try {
		await substory.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Substory Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { substory_uid: substory.uid } });
};

async function validateSubstory(substory) {
	let errors = [];

	const substorySchema = Joi.object({
		story_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
	});

	const substoryValidationError = substorySchema.validate(substory, { abortEarly: false })?.error?.details;

	if (substoryValidationError) {
		let substoryKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			substoryValidationError.map((error) => {
				let keyData = substoryKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Above " +
							error.context.limit +
							" Substorys";
						break;
					case "string.max":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Below " +
							error.context.limit +
							" Substorys";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			})
		);
	}

	const uidUsed = await Substory.findOne({ uid: substory.uid, story_id: substory.story_id }).exec();
	if (uidUsed) errors.push({ attribute: "uid", message: "This UID is being used by another substory. Please enter a different UID" });

	return { errors };
}

async function addSubstoryToStory(substory_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Story Not Found" }] };
		});
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.substories) newStory.data.substories = [];
	if (newStory.data.substories.findIndex((e) => JSON.stringify(e) === JSON.stringify(substory_id)) === -1)
		newStory.data.substories.push(substory_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
