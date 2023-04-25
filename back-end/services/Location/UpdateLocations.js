const mongoose = require("mongoose");

const Location = require("../../models/Location");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (!req?.body?.story_id) return res.status(200).send({ errors: [{ message: "Invalid Parameters" }] });

	// Update Locations
	const oldLocations = await getStoryLocations(req.body.story_id);
	const newLocations = JSON.parse(JSON.stringify(req.body.locations));
	const addedLocations = newLocations.filter((e) => oldLocations.findIndex((e2) => JSON.stringify(e._id) === JSON.stringify(e2._id)) === -1);
	const removedLocations = oldLocations.filter((e) => newLocations.findIndex((e2) => JSON.stringify(e._id) === JSON.stringify(e2._id)) === -1);

	// Add New Locations
	await Promise.all(
		addedLocations.map(async (addedLocation) => {
			return await createLocation(addedLocation, req.body.story_id);
		})
	);

	// Delete Old Locations
	await Promise.all(
		removedLocations.map(async (removedLocation) => {
			return await deleteLocation(removedLocation, req.body.story_id);
		})
	);

	// Update Story Locations Hierarchy
	const oldStory = await Story.findOne({ _id: req.body.story_id })
		.exec()
		.catch(() => false);
	if (!oldStory) res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));

	newStory.data.locationsHierarchy = JSON.parse(JSON.stringify(req.body.hierarchy));

	try {
		await Story.findOneAndReplace({ _id: newStory._id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Save" }] });
	}

	return res.status(200).send({ message: "Success", data: { locations: newLocations } });
};

async function getStoryLocations(story_id) {
	const locations = await Location.find({ story_id: story_id })
		.exec()
		.catch(() => false);
	if (!locations || locations.length === 0) return [];
	return locations;
}

async function updateLocation(input_location) {
	const location_id = input_location?._id;

	const oldLocation = await Location.findById(location_id)
		.exec()
		.catch(() => false);
	if (!oldLocation) return false;

	let newLocation = JSON.parse(JSON.stringify(oldLocation));

	// Updates
	newLocation.data.name = input_location.name;

	try {
		await Location.findOneAndReplace({ _id: req.params.id }, newLocation, { upsert: true });
	} catch (error) {
		return false;
	}
}

async function createLocation(input_location, story_id) {
	const location = new Location({
		_id: input_location._id,
		story_id,
		type: input_location.type,
		data: { name: input_location.data.name },
	});

	try {
		await location.save();
	} catch (error) {
		return false;
	}
}

async function deleteLocation(location, story_id) {
	if (JSON.stringify(story_id) === JSON.stringify(location)) return false;

	try {
		const locationDeleteResult = await Location.deleteOne({ _id: location._id });
		if (locationDeleteResult?.deletedCount !== 1) return false;
	} catch (error) {
		return false;
	}

	return true;
}
