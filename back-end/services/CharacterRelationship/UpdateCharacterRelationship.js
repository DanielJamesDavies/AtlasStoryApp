const CharacterRelationship = require("../../models/CharacterRelationship");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"] || req?.body?.path === ["story_id"])
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldCharacterRelationship = await CharacterRelationship.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldCharacterRelationship) return res.status(200).send({ errors: [{ message: "Character Relationship Not Found" }] });

	const newCharacterRelationship = ChangeValueInNestedObject(
		JSON.parse(JSON.stringify(oldCharacterRelationship)),
		req?.body?.path,
		req?.body?.newValue
	);

	try {
		await CharacterRelationship.findOneAndReplace({ _id: req.params.id }, newCharacterRelationship, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Relationship Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { characterRelationship: newCharacterRelationship } });
};
