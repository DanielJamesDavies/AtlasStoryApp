const Group = require("../../models/Group");

module.exports = async (req, res) => {
	const group = await Group.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!group) return res.status(200).send({ error: "Group Not Found" });

	res.status(200).send({ message: "Success", data: { group } });
};
