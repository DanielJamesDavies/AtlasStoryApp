const mongoose = require("mongoose");
const Joi = require("joi");

const Character = require("../../models/Character");
const Group = require("../../models/Group");
const Story = require("../../models/Story");

const addToStoryChangeLog = require("../Story/AddToStoryChangeLog");

module.exports = async (req, res) => {
	req.body.uid = req.body.uid.split(" ").join("-");

	let validateCharacterResult = await validateCharacter(req.body);
	if (validateCharacterResult?.errors?.length > 0) return res.status(200).send({ errors: validateCharacterResult.errors });

	// New Character
	const character = new Character({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		group_id: req.body.group_id,
		uid: req.body.uid,
		isPrimaryCharacter: req.body.isPrimaryCharacter,
		data: { name: req.body.name },
	});

	const addCharacterToGroupResult = await addCharacterToGroup(character._id, req.body.group_id);
	if (addCharacterToGroupResult?.errors) return res.status(200).send({ errors: addCharacterToGroupResult?.errors });

	try {
		await character.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Created" }] });
	}

	addToStoryChangeLog(req, req.body.story_id, { content_type: "character", content_id: character?._id, title: "New Character Created" });

	if (req?.body?.isPrimaryCharacter === true) {
		const addCharacterToStoryPrimaryCharactersResult = await addCharacterToStoryPrimaryCharacters(character._id, req.body.story_id);
		if (addCharacterToStoryPrimaryCharactersResult?.errors)
			return res.status(200).send({ errors: addCharacterToStoryPrimaryCharactersResult?.errors });
	}

	return res.status(200).send({ message: "Success", data: { character_uid: character.uid } });
};

async function validateCharacter(character) {
	let errors = [];

	const characterSchema = Joi.object({
		story_id: Joi.string().required(),
		group_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
		isPrimaryCharacter: Joi.boolean().required(),
	});

	const characterValidationError = characterSchema.validate(character, { abortEarly: false })?.error?.details;

	if (characterValidationError) {
		let characterKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "group_id", name: "Group ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
			{ key: "isPrimaryCharacter", name: "Primary Character", indefiniteArticle: "a" },
		];

		errors = errors.concat(
			characterValidationError.map((error) => {
				let keyData = characterKeysData.find((e) => e.key === error.path[0]);
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
			})
		);
	}

	const uidUsed = await Character.findOne({ uid: character.uid, story_id: character.story_id }).exec();
	if (uidUsed) errors.push({ attribute: "uid", message: "This UID is being used by another character. Please enter a different UID" });

	return { errors };
}

async function addCharacterToGroup(character_id, group_id) {
	const oldGroup = await Group.findById(group_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Group Not Found" }] };
		});
	if (!oldGroup) return { errors: [{ message: "Group Not Found" }] };

	let newGroup = JSON.parse(JSON.stringify(oldGroup));
	if (!newGroup?.data?.characters) newGroup.data.characters = [];
	if (newGroup.data.characters.findIndex((e) => e.character_id === character_id) === -1) newGroup.data.characters.push({ character_id });

	try {
		await Group.findOneAndReplace({ _id: group_id }, newGroup, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Group Could Not Be Saved" }] };
	}

	return {};
}

async function addCharacterToStoryPrimaryCharacters(character_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Story Not Found" }] };
		});
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.primaryCharacters) newStory.data.primaryCharacters = [];
	if (newStory.data.primaryCharacters.findIndex((e) => e === character_id) === -1) newStory.data.primaryCharacters.push(character_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
