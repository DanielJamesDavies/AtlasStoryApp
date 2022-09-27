const Story = require("../../models/Story");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldStory = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!oldStory) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Story.findOne({ uid: newUID }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another story. Please enter a different UID" }] });

			newStory.uid = newUID;
			break;
		default:
			if (req.body.path.length === 3 && req.body.path[0] === "data" && req.body.path[1] === "notes") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const notesIndex = newStory.data.notes.findIndex((e) => e.uid === newPath[2]);
				if (notesIndex === -1) {
					if (req?.body?.newValue) newStory.data.notes.push(req.body.newValue);
					break;
				}
				newPath[2] = notesIndex;
				newStory = ChangeValueInNestedObject(newStory, newPath, req?.body?.newValue);
				break;
			}

			newStory = ChangeValueInNestedObject(newStory, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await Story.findOneAndReplace({ _id: req.params.id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { story: newStory } });
};
