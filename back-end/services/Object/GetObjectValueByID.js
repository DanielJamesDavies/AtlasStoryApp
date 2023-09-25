const Object = require("../../models/Object");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const object = await Object.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!object) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	value = GetValueInNestedObject(JSON.parse(JSON.stringify(object)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
