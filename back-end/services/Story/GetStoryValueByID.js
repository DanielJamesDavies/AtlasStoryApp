const Story = require("../../models/Story");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const story = await Story.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });
	const value = GetValueInNestedObject(JSON.parse(JSON.stringify(story)), req?.body?.path);

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
