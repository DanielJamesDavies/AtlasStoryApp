const Group = require("../../models/Group");

module.exports = async (req, res) => {
	if (req.query?.url) {
		let group = await Group.findOne({ url: req.query.url })
			.exec()
			.catch((err) => {
				res.status(200).send({ error: err });
			});
		if (!group) return res.status(200).send({ errors: "Group Not Found" });

		return res.status(200).send({ message: "Success", data: { group } });
	}

	if (req.query?.story_id) {
		let groups = await Group.find({ story_id: req.query.story_id })
			.exec()
			.catch((err) => {
				res.status(200).send({ error: err });
			});
		if (!groups) return res.status(200).send({ errors: "Groups Not Found" });

		return res.status(200).send({ message: "Success", data: { groups } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
