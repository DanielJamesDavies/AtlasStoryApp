const mongoose = require("mongoose");

const Location = require("../../models/Location");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if ((req.query?.uid && req.query?.story_id) || (req.query?.uid && req.query?.story_uid)) {
		let location = false;
		let story = false;

		if (req.query?.uid && req.query?.story_id) {
			location = await Location.findOne({ uid: req.query.uid, story_id: req.query.story_id })
				.exec()
				.catch(() => false);
		}

		if (req.query?.uid && req.query?.story_uid) {
			story = await Story.findOne({ uid: req.query?.story_uid });
			if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

			location = await Location.findOne({ uid: req.query.uid, story_id: story?._id })
				.exec()
				.catch(() => false);
		}

		if (!location) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.views += 1;

		if (newLocation?.data?.mapVersions?.length === 0) {
			newLocation.data.mapVersions.push({
				_id: new mongoose.Types.ObjectId(),
				title: "Ver. 1",
				mapImage: new mongoose.Types.ObjectId(),
				mapImageComponents: "",
				regions: [],
				places: [],
			});
		}

		try {
			await Location.findOneAndReplace({ _id: newLocation._id }, newLocation, { upsert: true });
		} catch {}

		return res.status(200).send({ message: "Success", data: { location: newLocation } });
	}

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
