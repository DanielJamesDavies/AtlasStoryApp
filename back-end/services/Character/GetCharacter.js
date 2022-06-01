const Character = require("../../models/Character");

module.exports = async (req, res) => {
	if (req.query?.url) {
		let character = await Character.findOne({ url: req.query.url })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Character Not Found" }] });
			});
		if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

		return res.status(200).send({ message: "Success", data: { character } });
	}

	if (req.query?.group_id) {
		let characters = await Character.find({ group_id: req.query.group_id })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Characters Not Found" }] });
			});
		if (!characters) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

		return res.status(200).send({ message: "Success", data: { characters } });
	}

	if (req.query?.story_id) {
		let characters = await Character.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Characters Not Found" }] });
			});
		if (!characters) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

		return res.status(200).send({ message: "Success", data: { characters } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
