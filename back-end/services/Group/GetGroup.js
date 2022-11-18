const Group = require("../../models/Group");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid) {
		let group = await Group.findOne({ uid: req.query.uid })
			.exec()
			.catch(() => false);
		if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

		return res.status(200).send({ message: "Success", data: { group } });
	}

	if (req.query?.story_id || req.query?.story_uid) {
		let story = false;

		if (req.query?.story_id) {
			story = await Story.findOne({ _id: req.query.story_id })
				.exec()
				.catch(() => false);
			if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		} else {
			story = await Story.findOne({ uid: req.query.story_uid })
				.exec()
				.catch(() => false);
			if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		}

		if (!story || !story?._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		if (!story?.data?.groups) return res.status(200).send({ errors: [{ message: "Groups Not Found in Story" }] });

		let groups = await Promise.all(
			story.data.groups.map(async (groupID) => {
				let group = await Group.findOne({ _id: groupID })
					.exec()
					.catch(() => false);
				if (!group) return false;
				return group;
			})
		);
		groups = groups.filter((e) => e !== false);

		return res.status(200).send({ message: "Success", data: { groups, story_uid: req.query.story_uid } });
	}

	return res.status(200).send({ errors: [{ message: "Unknown Request" }] });
};
