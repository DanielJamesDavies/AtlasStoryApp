const Character = require("../../models/Character");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	const oldCharacter = await Character.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!oldCharacter) return res.status(200).send({ error: "Character Not Found" });

	const newCharacter = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldCharacter)), req?.body?.path, req?.body?.newValue);

	await Character.findOneAndUpdate({ _id: req.params.id }, newCharacter, { upsert: true });

	return res.status(200).send({ message: "Success", data: { character: newCharacter } });
};
