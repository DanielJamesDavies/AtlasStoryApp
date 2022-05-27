const Group = require("../../models/Group");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	const oldGroup = await Group.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!oldGroup) return res.status(200).send({ error: "Group Not Found" });

	const newGroup = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldGroup)), req?.body?.path, req?.body?.newValue);

	await Group.findOneAndUpdate({ _id: req.params.id }, newGroup, { upsert: true });

	return res.status(200).send({ message: "Success", data: { group: newGroup } });
};
