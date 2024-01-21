const mongoose = require("mongoose");

const Location = require("../../models/Location");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	let story = false;

	if ((req.query?.uid && req.query?.story_id) || (req.query?.uid && req.query?.story_uid)) {
		let location = false;

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
				mapImageComponents: new mongoose.Types.ObjectId(),
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

	let locations = false;
	if (!story?.data?.locations || story?.data?.locations.length === 0) {
		locations = await Location.find({ story_id: story._id })
			.exec()
			.catch(() => false);
		if (!locations) res.status(200).send({ errors: [{ message: "Locations Not Found" }] });

		if (locations.length !== 0) {
			let newStory = JSON.parse(JSON.stringify(story));
			newStory.data.locations = locations?.map((e) => JSON.parse(JSON.stringify(e?._id)));
			console.log(newStory);
			try {
				await Story.findOneAndReplace({ _id: newStory._id }, newStory, { upsert: true });
			} catch {}
		}
	} else {
		locations = await Promise.all(
			story?.data?.locations?.map(async (location_id) => {
				return await Location.findById(location_id)
					.exec()
					.catch(() => false);
			})
		);
	}

	console.log(story?.data?.locations);

	return res.status(200).send({ message: "Success", data: { locations, story_uid: req.query.story_uid } });
};
