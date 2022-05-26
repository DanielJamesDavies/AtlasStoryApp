const mongoose = require("mongoose");
const Joi = require("joi");

const Character = require("../../models/Character");
const Group = require("../../models/Group");

module.exports = async (req, res) => {
	let validateCharacterResult = validateCharacter(req.body);
	if (validateCharacterResult?.errors) return res.status(200).send({ errors: validateCharacterResult.errors });

	// Check if URL is used
	const urlUsed = await Character.findOne({ url: req.body.url, story_id: req.body.story_id }).exec();

	// If username or email is used, return error
	if (urlUsed) {
		return res
			.status(200)
			.send({ errors: [{ attribute: "url", message: "This URL is being used by another character. Please enter a different URL" }] });
	}

	// New Character
	const character = new Character({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		group_id: req.body.group_id,
		url: req.body.url,
		isPrimaryCharacter: req.body.isPrimaryCharacter,
		data: { name: req.body.name },
	});

	const group = await Group.findById(req.body.group_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!group) return res.status(200).send({ error: "Group Not Found" });

	if (!group.data.characters.includes(character._id)) group.data.characters.push({ user_id: character._id });

	try {
		await character.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Created" }] });
	}

	try {
		await group.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Added to Group" }] });
	}

	return res.status(200).send({ message: "Success", data: { characterURL: character.url } });
};

function validateCharacter(character) {
	const characterSchema = Joi.object({
		story_id: Joi.string().required(),
		group_id: Joi.string().required(),
		url: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
		isPrimaryCharacter: Joi.boolean().required(),
	});

	const characterValidationError = characterSchema.validate(character, { abortEarly: false })?.error?.details;

	if (characterValidationError) {
		let characterKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "group_id", name: "Group ID", indefiniteArticle: "a" },
			{ key: "url", name: "URL", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
			{ key: "isPrimaryCharacter", name: "Primary Character", indefiniteArticle: "a" },
		];

		return {
			errors: characterValidationError.map((error) => {
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
			}),
		};
	}
	return {};
}
