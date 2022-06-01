const Group = require("../../models/Group");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.url) {
		let group = await Group.findOne({ url: req.query.url })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Group Not Found" }] });
			});
		if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

		return res.status(200).send({ message: "Success", data: { group, url: req.query.url } });
	}

	if (req.query?.story_id || req.query?.story_url) {
		let story = false;

		if (req.query?.story_id) {
			story = await Story.findOne({ _id: req.query.story_id })
				.exec()
				.catch(() => {
					res.status(200).send({ errors: [{ message: "Story Not Found" }] });
				});
		} else {
			story = await Story.findOne({ url: req.query.story_url })
				.exec()
				.catch(() => {
					res.status(200).send({ errors: [{ message: "Story Not Found" }] });
				});
		}

		if (!story || !story?._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		if (!story?.data?.groups) return res.status(200).send({ errors: [{ message: "Groups Not Found in Story" }] });

		let groups = await Promise.all(
			story.data.groups.map(async (groupID) => {
				let group = await Group.findOne({ _id: groupID })
					.exec()
					.catch(() => {
						return false;
					});
				if (!group) return false;
				return group;
			})
		);
		groups = groups.filter((e) => e !== false);

		return res.status(200).send({ message: "Success", data: { groups, story_url: req.query.story_url } });
	}

	return res.status(200).send({ errors: [{ message: "Unknown Request" }] });
};
