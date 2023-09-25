const Character = require("../../models/Character");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let character = await Character.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

		return res.status(200).send({ message: "Success", data: { character } });
	}

	if (req.query?.uid && req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let character = await Character.findOne({ uid: req.query.uid, story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

		return res.status(200).send({ message: "Success", data: { character } });
	}

	if (req.query?.group_id && req.query?.story_id) {
		let characters = await Character.find({ group_id: req.query.group_id, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!characters) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

		return res.status(200).send({ message: "Success", data: { characters } });
	}

	if (req.query?.story_id) {
		let characters = await Character.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!characters) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

		return res.status(200).send({ message: "Success", data: { characters } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
