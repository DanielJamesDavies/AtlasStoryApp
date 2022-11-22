const StoryFollow = require("../../models/StoryFollow");

module.exports = async (req, res) => {
	const user_id = req?.params?.id;
	if (!user_id) return res.status(200).send({ errors: [{ message: "Invalid Arguments" }] });

	const storyFollows = await StoryFollow.find({ user_id })
		.exec()
		.catch(() => false);
	if (!storyFollows) return res.status(200).send({ errors: [{ message: "Failure" }] });

	return res.status(200).send({ message: "Success", data: { storyFollows } });
};
