const LoreItem = require("../../models/LoreItem");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const lore_item = await LoreItem.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!lore_item) return res.status(200).send({ errors: [{ message: "LoreItem Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	value = GetValueInNestedObject(JSON.parse(JSON.stringify(lore_item)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
