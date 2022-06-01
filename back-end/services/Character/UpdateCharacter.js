const Character = require("../../models/Character");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	const oldCharacter = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!oldCharacter) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	const newCharacter = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldCharacter)), req?.body?.path, req?.body?.newValue);

	try {
		await Character.findOneAndUpdate({ _id: req.params.id }, newCharacter, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { character: newCharacter } });
};
