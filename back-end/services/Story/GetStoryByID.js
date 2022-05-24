const Story = require("../../models/Story");
const User = require("../../models/User");

module.exports = async (req, res) => {
	const story = await Story.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!story) return res.status(200).send({ error: "Story Not Found" });
	let newStory = JSON.parse(JSON.stringify(story));

	if (!story?.owner) return res.status(200).send({ error: "Owner Not Found" });

	const owner = await User.findById(story.owner)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!owner) return res.status(200).send({ error: "Owner Not Found" });
	newStory.owner = { _id: owner._id, username: owner.username, nickname: owner.nickname };

	res.status(200).send({ message: "Success", data: { story: newStory } });
};
