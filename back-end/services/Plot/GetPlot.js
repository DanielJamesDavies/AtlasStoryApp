const Plot = require("../../models/Substory");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.uid && req.query?.story_id) {
		let plot = await Plot.findOne({ uid: req.query.uid, story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!plot) return res.status(200).send({ errors: [{ message: "Plot Not Found" }] });

		return res.status(200).send({ message: "Success", data: { plot } });
	}

	if (req.query?.uid && req.query?.story_uid) {
		let story = await Story.findOne({ uid: req.query?.story_uid });
		if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

		let plot = await Plot.findOne({ uid: req.query.uid, story_id: story?._id })
			.exec()
			.catch(() => false);
		if (!plot) return res.status(200).send({ errors: [{ message: "Plot Not Found" }] });

		return res.status(200).send({ message: "Success", data: { plot } });
	}

	if (req.query?.story_id) {
		let plots = await Plot.find({ story_id: req.query.story_id })
			.exec()
			.catch(() => false);
		if (!plots) return res.status(200).send({ errors: [{ message: "Plots Not Found" }] });

		return res.status(200).send({ message: "Success", data: { plots } });
	}

	return res.status(200).send({ message: "Failure", errors: [{ message: "Unknown Request" }] });
};
