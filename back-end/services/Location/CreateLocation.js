const Joi = require("joi");

const Location = require("../../models/Location");
const Story = require("../../models/Story");

const { getPathToItemInHierarchy, getItemInHierarchyFromPath, changeItemInHierarchy } = require("./StoryLocationHierarchyFunctions");

module.exports = async (req, res) => {
	let validateLocationResult = validateLocation(req.body);
	if (validateLocationResult?.errors) return res.status(200).send({ errors: validateLocationResult.errors });

	// Check if UID is used
	const uidUsed = await Location.findOne({ uid: req.body.uid, story_id: req.body.story_id }).exec();
	if (uidUsed)
		return res
			.status(200)
			.send({ errors: [{ attribute: "uid", message: "This UID is being used by another location. Please enter a different UID" }] });

	// New Location
	const location = new Location({
		_id: req.body._id,
		story_id: req.body.story_id,
		uid: req.body.uid,
		type: req.body.type,
		specific_type: req?.body?.specific_type || "",
		data: { name: req.body.name },
	});

	let story = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => false);
	if (!story) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	const newHierarchyItem = { _id: req?.body?._id, children: [], isChildrenVisible: true };
	let newHierarchy = JSON.parse(JSON.stringify(story?.data?.locationsHierarchy));
	if (req?.body?.item_parent === "root") {
		newHierarchy.push(newHierarchyItem);
	} else {
		const parentPath = getPathToItemInHierarchy(req?.body?.item_parent, newHierarchy);
		const parentHierarchyItem = getItemInHierarchyFromPath(parentPath, newHierarchy);
		parentHierarchyItem.children.push(newHierarchyItem);
		newHierarchy = changeItemInHierarchy(parentPath, parentHierarchyItem, newHierarchy);
	}
	story.data.locationsHierarchy = newHierarchy;

	story.data.locations.push(req.body._id);

	try {
		await location.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Location Could Not Be Created", error }] });
	}

	try {
		await story.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { location } });
};

function validateLocation(location) {
	const locationSchema = Joi.object({
		_id: Joi.string().required(),
		story_id: Joi.string().required(),
		uid: Joi.string().min(1).max(64).required(),
		name: Joi.string().min(1).max(64).required(),
		item_parent: Joi.string().required(),
		type: Joi.string().required(),
		specific_type: Joi.string().optional().allow(false).allow(""),
	});

	const locationValidationError = locationSchema.validate(location, { abortEarly: false })?.error?.details;

	if (locationValidationError) {
		let locationKeysData = [
			{ key: "_id", name: "ID", indefiniteArticle: "an" },
			{ key: "story_id", name: "Story ID", indefiniteArticle: "a" },
			{ key: "uid", name: "UID", indefiniteArticle: "a" },
			{ key: "name", name: "Name", indefiniteArticle: "a" },
			{ key: "item_parent", name: "Item Parent", indefiniteArticle: "a" },
		];

		return {
			errors: locationValidationError.map((error) => {
				let keyData = locationKeysData.find((e) => e.key === error.path[0]);
				let message = "";

				switch (error.type) {
					case "string.empty":
						message = "Please Enter " + keyData?.indefiniteArticle + " " + keyData.name;
						break;
					case "string.min":
						message =
							"Please Enter " +
							keyData?.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Above " +
							error.context.limit +
							" Characters";
						break;
					case "string.max":
						message =
							"Please Enter " +
							keyData?.indefiniteArticle +
							" " +
							keyData.name +
							" That Is Below " +
							error.context.limit +
							" Characters";
						break;
					default:
						message = "An Unknown Error Has Occured. Please Try Again";
						break;
				}

				return { attribute: error.path[0], message };
			}),
		};
	}
	return {};
}
