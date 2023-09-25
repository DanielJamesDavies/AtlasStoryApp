const Object = require("../../models/Object");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let object = await Object.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!object) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

		return res.status(200).send({ message: "Success", data: { object } });
	}

	if (req.query?.uid && req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let object = await Object.findOne({ uid: req.query.uid, story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!object) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

		return res.status(200).send({ message: "Success", data: { object } });
	}

	if (req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let objects = await Object.find({ story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!objects) return res.status(200).send({ errors: [{ message: "Objects Not Found" }] });

		return res.status(200).send({ message: "Success", data: { objects } });
	}

	if (req.query?.story_id) {
		let objects = await Object.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!objects) return res.status(200).send({ errors: [{ message: "Objects Not Found" }] });

		return res.status(200).send({ message: "Success", data: { objects } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
