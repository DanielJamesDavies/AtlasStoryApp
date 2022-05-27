const Story = require("../../models/Story");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	const oldStory = await Story.findById(req.body.story_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!oldStory) return res.status(200).send({ error: "Character Not Found" });

	const newStory = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldStory)), req?.body?.path, req?.body?.newValue);

	await Story.findOneAndUpdate({ _id: req.params.id }, newStory, { upsert: true });

	return res.status(200).send({ message: "Success", data: { story: newStory } });
};
