const Character = require("../../models/Character");

module.exports = async (req, res) => {
	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	res.status(200).send({ message: "Success", data: { character } });
};
