const Location = require("../../models/Location");
const Story = require("../../models/Story");

const { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy } = require("./StoryLocationHierarchyFunctions");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const location = await Location.findById(req.params.id)
		.exec()
		.catch(() => true);
	if (!location?._id || !location?.story_id) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(location.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const story = await Story.findById(location.story_id)
		.exec()
		.catch(() => true);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	const removeLocationFromStoryLocationsHierarchyResult = await removeLocationFromStoryLocationsHierarchy(req.params.id, story);
	if (removeLocationFromStoryLocationsHierarchyResult?.errors)
		return res.status(200).send({ errors: removeLocationFromStoryLocationsHierarchyResult?.errors });

	const delete_images_result = await deleteImagesByKey("location_id", location._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const locationDeleteResult = await Location.deleteOne({ _id: location._id });
		if (locationDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Location Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Location Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeLocationFromStoryLocationsHierarchy(locationId, oldStory) {
	let newStory = JSON.parse(JSON.stringify(oldStory));

	let newHierarchy = JSON.parse(JSON.stringify(newStory?.data?.locationsHierarchy));
	let parentHierarchyItemPath = getPathToItemInHierarchy(locationId, newHierarchy);
	parentHierarchyItemPath.pop();
	let parentHierarchyItem = getItemInHierarchyFromPath(parentHierarchyItemPath, newHierarchy);

	if (typeof parentHierarchyItem?.children === "Array") {
		const itemIndex = parentHierarchyItem.children.findIndex((e) => e.id === locationId);
		if (itemIndex === -1) return {};
		parentHierarchyItem.children.splice(itemIndex, 1);
	} else {
		const itemIndex = parentHierarchyItem.findIndex((e) => e.id === locationId);
		if (itemIndex === -1) return {};
		parentHierarchyItem.splice(itemIndex, 1);
	}

	newHierarchy = changeItemInHierarchy(parentHierarchyItemPath, parentHierarchyItem, newHierarchy);

	newStory.data.locationsHierarchy = newHierarchy;

	try {
		await Story.findOneAndUpdate({ _id: newStory._id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}
