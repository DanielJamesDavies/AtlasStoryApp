const mongoose = require("mongoose");
const Joi = require("joi");

const CharacterType = require("../../models/CharacterType");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	let validateCharacterTypeResult = validateCharacterType(req.body);
	if (validateCharacterTypeResult?.errors) return res.status(200).send({ errors: validateCharacterTypeResult.errors });

	// New Character Type
	const characterType = new CharacterType({
		_id: new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		data: { name: req.body.name, colour: req.body.colour },
	});

	let story = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => true);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	if (!story.data.characterTypes.includes(characterType._id)) story.data.characterTypes.push(characterType._id);

	try {
		await characterType.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Type Could Not Be Created" }] });
	}

	try {
		await story.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { characterType } });
};

function validateCharacterType(characterType) {
	const characterTypeSchema = Joi.object({
		story_id: Joi.string().required(),
		name: Joi.string().min(1).max(64).required(),
		colour: Joi.string().required(),
	});

	let characterTypeValidationError = characterTypeSchema.validate(characterType, { abortEarly: false })?.error?.details;

	if (!isHexColour(characterType?.colour)) characterTypeValidationError.push({ type: "invalid.hex", path: ["colour"] });

	if (characterTypeValidationError) {
		let characterTypeKeysData = [
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
			{ key: "colour", name: "Colour", indefiniteArticle: "a" },
		];

		return {
			errors: characterTypeValidationError.map((error) => {
				let keyData = characterTypeKeysData.find((e) => e.key === error.path[0]);
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
					case "invalid.hex":
						message = "Please Enter " + keyData.indefiniteArticle + " Valid HEX " + keyData.name;
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

function isHexColour(colour) {
	var colourArray = colour.split("");
	var isValid = colourArray
		.map((value, index) => {
			if (index === 0) {
				if (value === "#") return "y";
				return "n";
			} else {
				if (parseInt(value, 16).toString(16) === value) return "y";
				return "n";
			}
		})
		.join("");
	if (isValid !== "yyyyyyy" && isValid !== "yyyy") return false;
	return true;
}
