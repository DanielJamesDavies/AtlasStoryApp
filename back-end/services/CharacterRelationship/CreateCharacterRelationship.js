const mongoose = require("mongoose");
const Joi = require("joi");

const CharacterRelationship = require("../../models/CharacterRelationship");

module.exports = async (req, res) => {
	let validateCharacterRelationshipResult = validateCharacterRelationship(req.body);
	if (validateCharacterRelationshipResult?.errors) return res.status(200).send({ errors: validateCharacterRelationshipResult.errors });

	const characterRelationship = new CharacterRelationship({
		_id: req?.body?._id ? req.body._id : new mongoose.Types.ObjectId(),
		story_id: req.body.story_id,
		character_ids: req.body.character_ids,
		relationship_type: req.body.relationship_type,
	});

	try {
		await characterRelationship.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { characterRelationship } });
};

function validateCharacterRelationship(characterRelationship) {
	let errors = [];

	if (!characterRelationship?.story_id) errors.push({ attribute: "story_id", message: "Please Enter a Story ID" });

	if (!characterRelationship?.character_ids || characterRelationship?.character_ids?.length !== 2)
		errors.push({ attribute: "character_ids", message: "Please Enter Two Character IDs" });

	if (!characterRelationship?.relationship_type) errors.push({ attribute: "relationship_type", message: "Please Enter a Relationship Type" });

	if (errors.length !== 0) return { errors };

	return {};
}
