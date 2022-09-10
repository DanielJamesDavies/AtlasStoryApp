const Substory = require("../../models/Substory");

module.exports = async (req, res) => {
	const substory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!substory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

	res.status(200).send({ message: "Success", data: { substory } });
};
