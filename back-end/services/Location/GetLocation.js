const Location = require("../../models/Location");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let location = await Location.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!location) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

		return res.status(200).send({ message: "Success", data: { location } });
	}

	let story = false;

	if (req?.query?.story_id) {
		story = await Story.findOne({ _id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!story) res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	} else if (req?.query?.story_uid) {
		story = await Story.findOne({ uid: req.query.story_uid })
			.exec()
			.catch(() => false);
		if (!story) res.status(200).send({ errors: [{ message: "Story Not Found" }] });
	}

	if (!story || !story?._id) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let locations = await Location.find({ story_id: story._id })
		.exec()
		.catch(() => false);
	if (!locations) res.status(200).send({ errors: [{ message: "Locations Not Found" }] });

	return res.status(200).send({ message: "Success", data: { locations, story_uid: req.query.story_uid } });
};
