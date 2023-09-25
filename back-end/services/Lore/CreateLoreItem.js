const mongoose = require("mongoose");
const Joi = require("joi");

const LoreItem = require("../../models/LoreItem");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	req.body.uid = req.body.uid.split(" ").join("-");

	let validateLoreItemResult = await validateLoreItem(req.body);
	if (validateLoreItemResult?.errors?.length > 0) return res.status(200).send({ errors: validateLoreItemResult.errors });

	// New LoreItem Item
	const lore_item = new LoreItem({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		uid: req.body.uid,
		data: { name: req.body.name },
	});

	const addLoreItemToStoryResult = await addLoreItemToStory(lore_item._id, req.body.story_id);
	if (addLoreItemToStoryResult?.errors) return res.status(200).send({ errors: addLoreItemToStoryResult?.errors });

	try {
		await lore_item.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "LoreItem Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { lore_item_uid: lore_item.uid } });
};

async function validateLoreItem(lore_item) {
	let errors = [];

	const lore_itemSchema = Joi.object({
		story_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
	});

	const lore_itemValidationError = lore_itemSchema.validate(lore_item, { abortEarly: false })?.error?.details;

	if (lore_itemValidationError) {
		let lore_itemKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			lore_itemValidationError.map((error) => {
				let keyData = lore_itemKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Above " + error.context.limit + " Lore";
						break;
					case "string.max":
						message =
							"Please Enter " + keyData.indefiniteArticle + " " + keyData.name + " That Is Below " + error.context.limit + " Lore";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			})
		);
	}

	const uidUsed = await LoreItem.findOne({ uid: lore_item.uid, story_id: lore_item.story_id }).exec();
	if (uidUsed) errors.push({ attribute: "uid", message: "This UID is being used by another lore_item. Please enter a different UID" });

	return { errors };
}

async function addLoreItemToStory(lore_item_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.lore) newStory.data.lore = [];
	if (newStory.data.lore.findIndex((e) => JSON.stringify(e) === JSON.stringify(lore_item_id)) === -1) newStory.data.lore.push(lore_item_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
