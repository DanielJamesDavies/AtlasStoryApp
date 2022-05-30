const mongoose = require("mongoose");
const Joi = require("joi");

const Group = require("../../models/Group");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	let validateGroupResult = validateGroup(req.body);
	if (validateGroupResult?.errors) return res.status(200).send({ errors: validateGroupResult.errors });

	// Check if URL is used
	const urlUsed = await Group.findOne({ url: req.body.url, story_id: req.body.story_id }).exec();

	// If username or email is used, return error
	if (urlUsed) {
		return res
			.status(200)
			.send({ errors: [{ attribute: "url", message: "This URL is being used by another group. Please enter a different URL" }] });
	}

	// New Group
	const group = new Group({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		url: req.body.url,
		data: { name: req.body.name, characters: [] },
	});

	let story = await Story.findById(req.body.story_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	if (!story.data.groups.includes(group._id)) story.data.groups.push(group._id);

	try {
		await group.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Group Could Not Be Created" }] });
	}

	try {
		await story.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { groupURL: group.url } });
};

function validateGroup(group) {
	const groupSchema = Joi.object({
		story_id: Joi.string().required(),
		url: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
	});

	const groupValidationError = groupSchema.validate(group, { abortEarly: false })?.error?.details;

	if (groupValidationError) {
		let groupKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "url", name: "URL", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
		];

		return {
			errors: groupValidationError.map((error) => {
				let keyData = groupKeysData.find((e) => e.key === error.path[0]);
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
							" Characters";
						break;
					case "string.max":
						message =
							"Please Enter " +
							keyData.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Below " +
							error.context.limit +
							" Characters";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			}),
		};
	}
	return {};
}
