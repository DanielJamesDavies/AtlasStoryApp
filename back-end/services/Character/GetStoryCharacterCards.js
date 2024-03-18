const CharacterCard = require("../../models/CharacterCard");

module.exports = async (req, res) => {
	const character_cards = await CharacterCard.find({ story_id: req.query.story_id })
		.exec()
		.catch(() => false);
	if (!character_cards) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

	return res.status(200).send({ message: "Success", data: { character_cards } });
};
