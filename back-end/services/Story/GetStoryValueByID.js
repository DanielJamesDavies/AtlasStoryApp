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
	let value = false;

	if (req.body.path.length === 3 && req.body.path[0] === "data" && req.body.path[1] === "notes") {
		let newPath = JSON.parse(JSON.stringify(req.body.path));
		const notesIndex = story.data.notes.findIndex((e) => e.uid === newPath[2]);
		if (notesIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
		newPath[2] = notesIndex;
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(story)), newPath);
	} else {
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(story)), req?.body?.path);
	}

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
