const Substory = require("../../models/Substory");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let substory = await Substory.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
			});
		if (!substory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

		return res.status(200).send({ message: "Success", data: { substory } });
	}

	if (req.query?.story_id) {
		let substorys = await Substory.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Substorys Not Found" }] });
			});
		if (!substorys) return res.status(200).send({ errors: [{ message: "Substorys Not Found" }] });

		return res.status(200).send({ message: "Success", data: { substorys } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
