const Character = require("../../models/Character");

module.exports = async (req, res) => {
	if (req.query.card === "true") {
		const character = await Character.findById(req.params.id, {
			_id: 1,
			story_id: 1,
			group_id: 1,
			uid: 1,
			isPrimaryCharacter: 1,
			character_type_id: 1,
			"data.name": 1,
			"data.summaryItems": 1,
			"data.colour": 1,
			"data.cardBackground": 1,
			"data.cardBackgroundProperties": 1,
			"data.faceImage": 1,
		})
			.exec()
			.catch(() => false);
		if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

		return res.status(200).send({ message: "Success", data: { character } });
	}

	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	res.status(200).send({ message: "Success", data: { character } });
};
