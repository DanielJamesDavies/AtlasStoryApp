const Character = require("../../models/Character");

module.exports = async (req, res) => {
	if (req.query?.story_id) {
		let characters = await Character.find({ story_id: req.query.story_id, isPrimaryCharacter: true })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Characters Not Found" }] });
			});
		if (!characters) return res.status(200).send({ errors: [{ message: "Characters Not Found" }] });

		return res.status(200).send({ message: "Success", data: { characters } });
	}
};
