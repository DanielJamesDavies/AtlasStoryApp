const LoreItem = require("../../models/LoreItem");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let lore = await LoreItem.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!lore) return res.status(200).send({ errors: [{ message: "Lore Item Not Found" }] });

		return res.status(200).send({ message: "Success", data: { lore } });
	}

	if (req.query?.uid && req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let lore = await LoreItem.findOne({ uid: req.query.uid, story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!lore) return res.status(200).send({ errors: [{ message: "Lore Item Not Found" }] });

		return res.status(200).send({ message: "Success", data: { lore } });
	}

	if (req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let lore = await LoreItem.find({ story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!lore) return res.status(200).send({ errors: [{ message: "Lore Not Found" }] });

		return res.status(200).send({ message: "Success", data: { lore } });
	}

	if (req.query?.story_id) {
		let lore = await LoreItem.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!lore) return res.status(200).send({ errors: [{ message: "Lore Not Found" }] });

		return res.status(200).send({ message: "Success", data: { lore } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
