const Substory = require("../../models/Substory");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const substory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!substory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = GetValueInNestedObject(JSON.parse(JSON.stringify(substory)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
