const Character = require("../../models/Character");

module.exports = async (req, res) => {
	const character = await Character.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!character) return res.status(200).send({ error: "Character Not Found" });

	res.status(200).send({ message: "Success", data: { character } });
};
