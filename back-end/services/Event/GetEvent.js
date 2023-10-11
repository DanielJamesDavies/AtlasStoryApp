const Event = require("../../models/Event");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let event = await Event.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!event) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

		return res.status(200).send({ message: "Success", data: { event } });
	}

	if (req.query?.uid && req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let event = await Event.findOne({ uid: req.query.uid, story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!event) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

		return res.status(200).send({ message: "Success", data: { event } });
	}

	if (req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let events = await Event.find({ story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!events) return res.status(200).send({ errors: [{ message: "Events Not Found" }] });

		return res.status(200).send({ message: "Success", data: { events } });
	}

	if (req.query?.story_id) {
		let events = await Event.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!events) return res.status(200).send({ errors: [{ message: "Events Not Found" }] });

		return res.status(200).send({ message: "Success", data: { events } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
