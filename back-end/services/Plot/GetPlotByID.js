const Plot = require("../../models/Substory");

module.exports = async (req, res) => {
	const substory = await Plot.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!substory) return res.status(200).send({ errors: [{ message: "Plot Not Found" }] });

	res.status(200).send({ message: "Success", data: { substory } });
};
