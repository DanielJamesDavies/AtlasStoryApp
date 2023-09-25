const LoreItem = require("../../models/LoreItem");

module.exports = async (req, res) => {
	const lore_item = await LoreItem.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!lore_item) return res.status(200).send({ errors: [{ message: "LoreItem Not Found" }] });

	res.status(200).send({ message: "Success", data: { lore_item } });
};
