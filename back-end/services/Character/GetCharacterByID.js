const Character = require("../../models/Character");
const CharacterCard = require("../../models/CharacterCard");

module.exports = async (req, res) => {
	if (req.query.card === "true") {
		const character_card = await CharacterCard.findById(req.params.id)
			.exec()
			.catch(() => false);

		if (!character_card) {
			const character = await Character.findById(req.params.id, {
				_id: 1,
				story_id: 1,
				group_id: 1,
				uid: 1,
				isPrimaryCharacter: 1,
				isBackgroundCharacter: 1,
				character_type_id: 1,
				"data.name": 1,
				"data.summaryItems": 1,
				"data.colour": 1,
				"data.cardNameColour": 1,
				"data.cardBackground": 1,
				"data.cardBackgroundProperties": 1,
				"data.faceImage": 1,
			})
				.exec()
				.catch(() => false);
			if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

			console.log(character?.data?.name, "did not have a character card.");

			const character_card = new CharacterCard({
				_id: req.params.id,
				story_id: character?.story_id,
				group_id: character?.group_id,
				uid: character?.uid,
				isPrimaryCharacter: character?.isPrimaryCharacter,
				isBackgroundCharacter: character?.isBackgroundCharacter,
				character_type_id: character?.character_type_id,
				data: {
					name: character?.data?.name,
					summaryItems: character?.data?.summaryItems,
					colour: character?.data?.colour,
					cardNameColour: character?.data?.cardNameColour,
					cardBackground: character?.data?.cardBackground,
					cardBackgroundProperties: character?.data?.cardBackgroundProperties,
					faceImage: character?.data?.faceImage,
				},
			});

			try {
				await character_card.save();
			} catch (error) {}

			return res.status(200).send({ message: "Success", data: { character } });
		}

		return res.status(200).send({ message: "Success", data: { character: character_card } });
	}

	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	res.status(200).send({ message: "Success", data: { character } });
};
