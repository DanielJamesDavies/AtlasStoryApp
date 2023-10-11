const mongoose = require("mongoose");

const Event = require("../../models/Event");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || JSON.stringify(req?.body?.path) === JSON.stringify(["_id"]))
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldEvent = await Event.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldEvent) return res.status(200).send({ errors: [{ message: "Event Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldEvent.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let newEvent = JSON.parse(JSON.stringify(oldEvent));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Event.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another event. Please enter a different UID" }] });

			newEvent.uid = newUID;

			break;
		case JSON.stringify(["data", "images"]):
			const oldImages = newEvent.data.images;
			const newImages = req.body.newValue.event_images;

			// Remove Removed Images
			await Promise.all(
				oldImages.map(async (oldImageID) => {
					if (newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(oldImageID)) === -1) {
						try {
							await Image.deleteOne({ _id: oldImageID });
						} catch (error) {}
					}
					return true;
				})
			);

			newEvent.data.development.items = newEvent.data.development.items.map((item) => {
				item.images = item.images.filter((image) => newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(image.image)) !== -1);
				return item;
			});

			// Create New Images
			await Promise.all(
				newImages.map(async (newImageID) => {
					if (oldImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(newImageID)) === -1) {
						let newImage = req.body.newValue.images.find((e) => JSON.stringify(e._id) === JSON.stringify(newImageID))?.image;

						if (newImage) {
							const image = new Image({
								_id: newImageID,
								image: newImage,
								story_id: newEvent.story_id,
								event_id: newEvent._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newEvent.data.images = newImages;

			break;
		case JSON.stringify(["data", "custom_subpages"]):
			let newCustomSubpages = req.body.newValue;

			newCustomSubpages = newCustomSubpages.map((custom_subpage) => {
				const customSubpageIndex = newEvent.data.custom_subpages.findIndex((e) => e.id === custom_subpage.id);
				if (customSubpageIndex === -1) {
					if (!custom_subpage.id) custom_subpage.id = new mongoose.Types.EventId();
				} else {
					const tempSubpage = custom_subpage;
					custom_subpage = newEvent.data.custom_subpages[customSubpageIndex];
					custom_subpage.name = tempSubpage.name;
				}
				return custom_subpage;
			});

			newEvent.data.custom_subpages = newCustomSubpages;
			newEvent = new Event(newEvent);
			newEvent = JSON.parse(JSON.stringify(newEvent));

			break;
		default:
			if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "custom_subpages") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const customSubpageIndex = newEvent.data.custom_subpages.findIndex((e) => JSON.stringify(e.id) === JSON.stringify(newPath[2]));
				if (customSubpageIndex === -1) break;
				newPath[2] = customSubpageIndex;
				newEvent = ChangeValueInNestedObject(newEvent, newPath, req?.body?.newValue);
			} else {
				newEvent = ChangeValueInNestedObject(newEvent, req?.body?.path, req?.body?.newValue);
			}
			break;
	}

	try {
		await Event.findOneAndReplace({ _id: req.params.id }, newEvent, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Event Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { event: newEvent } });
};
