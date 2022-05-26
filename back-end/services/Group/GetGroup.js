const Group = require("../../models/Group");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.url) {
		let group = await Group.findOne({ url: req.query.url })
			.exec()
			.catch((err) => {
				res.status(200).send({ errors: [{ message: err }] });
			});
		if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

		return res.status(200).send({ message: "Success", data: { group, url: req.query.url } });
	}

	if (req.query?.story_id) {
		let groups = await Group.find({ story_id: req.query.story_id })
			.exec()
			.catch((err) => {
				res.status(200).send({ errors: [{ message: err }] });
			});
		if (!groups) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

		return res.status(200).send({ message: "Success", data: { groups, story_id: req.query.story_id } });
	}

	if (req.query?.story_url) {
		let story = await Story.findOne({ url: req.query.story_url })
			.exec()
			.catch((err) => {
				res.status(200).send({ errors: [{ message: err }] });
			});
		if (!story || !story?._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let groups = await Group.find({ story_id: story._id })
			.exec()
			.catch((err) => {
				res.status(200).send({ errors: [{ message: err }] });
			});
		if (!groups) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

		return res.status(200).send({ message: "Success", data: { groups, story_url: req.query.story_url } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
