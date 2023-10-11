const Event = require("../../models/Event");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const event = await Event.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!event) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	value = GetValueInNestedObject(JSON.parse(JSON.stringify(event)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
