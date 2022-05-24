const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (!req.query.story_url) return;

	let story = await Story.findOne({ story_url: req.query.story_url })
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!story) return res.status(200).send({ errors: "Story Not Found" });

	return res.status(200).send({ message: "Success", data: { story } });
};
