const Story = require("../../models/Story");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldStory = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!oldStory) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	const newStory = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldStory)), req?.body?.path, req?.body?.newValue);

	try {
		await Story.findOneAndUpdate({ _id: req.params.id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { story: newStory } });
};
