const Group = require("../../models/Group");

module.exports = async (req, res) => {
	const group = await Group.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Group Not Found" }] });
		});
	if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

	res.status(200).send({ message: "Success", data: { group } });
};
