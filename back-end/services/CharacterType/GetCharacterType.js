const CharacterType = require("../../models/CharacterType");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.story_id || req.query?.story_url) {
		let story = false;

		if (req.query?.story_id) {
			story = await Story.findOne({ _id: req.query.story_id })
				.exec()
				.catch(() => {
					res.status(200).send({ errors: [{ message: "Story Not Found" }] });
				});
		} else {
			story = await Story.findOne({ url: req.query.story_url })
				.exec()
				.catch(() => {
					res.status(200).send({ errors: [{ message: "Story Not Found" }] });
				});
		}

		if (!story || !story?._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		if (!story?.data?.characterTypes) return res.status(200).send({ errors: [{ message: "Character Types Not Found in Story" }] });

		let characterTypes = await Promise.all(
			story.data.characterTypes.map(async (characterTypeID) => {
				let characterType = await CharacterType.findOne({ _id: characterTypeID })
					.exec()
					.catch(() => {
						return false;
					});
				if (!characterType) return false;
				return characterType;
			})
		);
		characterTypes = characterTypes.filter((e) => e !== false);

		return res.status(200).send({ message: "Success", data: { characterTypes, story_url: req.query.story_url } });
	}

	return res.status(200).send({ errors: [{ message: "Unknown Request" }] });
};
