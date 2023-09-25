const Object = require("../../models/Object");

module.exports = async (req, res) => {
	const object = await Object.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!object) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

	res.status(200).send({ message: "Success", data: { object } });
};
