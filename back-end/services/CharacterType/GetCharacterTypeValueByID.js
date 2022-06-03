const CharacterType = require("../../models/CharacterType");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const characterType = await CharacterType.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });
		});
	if (!characterType) return res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(characterType)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
