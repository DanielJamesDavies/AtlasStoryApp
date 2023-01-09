const CharacterRelationship = require("../../models/CharacterRelationship");

const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const characterRelationship = await CharacterRelationship.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!characterRelationship) return res.status(200).send({ errors: [{ message: "Character Relationship Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(characterRelationship)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
