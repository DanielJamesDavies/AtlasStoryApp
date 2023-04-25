const Location = require("../../models/Location");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const location = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!location) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(location)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
