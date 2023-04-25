const Location = require("../../models/Location");

module.exports = async (req, res) => {
	const location = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!location) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	res.status(200).send({ message: "Success", data: { location } });
};
