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

	let value = false;

	if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "versions") {
		let newPath = JSON.parse(JSON.stringify(req.body.path));
		const versionIndex = character.data.versions.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[2]));
		if (versionIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
		newPath[2] = versionIndex;
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(character)), newPath);
	} else {
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(character)), req?.body?.path);
	}

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
