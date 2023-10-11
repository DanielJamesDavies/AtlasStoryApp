const Event = require("../../models/Event");

module.exports = async (req, res) => {
	const event = await Event.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!event) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

	res.status(200).send({ message: "Success", data: { event } });
};
