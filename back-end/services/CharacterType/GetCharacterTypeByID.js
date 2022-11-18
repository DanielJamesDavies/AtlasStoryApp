const CharacterType = require("../../models/CharacterType");

module.exports = async (req, res) => {
	const characterType = await CharacterType.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!characterType) return res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });

	res.status(200).send({ message: "Success", data: { characterType } });
};
