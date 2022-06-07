const Character = require("../../models/Character");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(character)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
