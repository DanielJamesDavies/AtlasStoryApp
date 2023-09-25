const mongoose = require("mongoose");

const Object = require("../../models/Object");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || JSON.stringify(req?.body?.path) === JSON.stringify(["_id"]))
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldObject = await Object.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldObject) return res.status(200).send({ errors: [{ message: "Object Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldObject.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let newObject = JSON.parse(JSON.stringify(oldObject));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Object.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another object. Please enter a different UID" }] });

			newObject.uid = newUID;

			break;
		case JSON.stringify(["data", "images"]):
			const oldImages = newObject.data.images;
			const newImages = req.body.newValue.object_images;

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

			newObject.data.development.items = newObject.data.development.items.map((item) => {
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
								story_id: newObject.story_id,
								object_id: newObject._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newObject.data.images = newImages;

			break;
		case JSON.stringify(["data", "custom_subpages"]):
			let newCustomSubpages = req.body.newValue;

			newCustomSubpages = newCustomSubpages.map((custom_subpage) => {
				const customSubpageIndex = newObject.data.custom_subpages.findIndex((e) => e.id === custom_subpage.id);
				if (customSubpageIndex === -1) {
					if (!custom_subpage.id) custom_subpage.id = new mongoose.Types.ObjectId();
				} else {
					const tempSubpage = custom_subpage;
					custom_subpage = newObject.data.custom_subpages[customSubpageIndex];
					custom_subpage.name = tempSubpage.name;
				}
				return custom_subpage;
			});

			newObject.data.custom_subpages = newCustomSubpages;
			newObject = new Object(newObject);
			newObject = JSON.parse(JSON.stringify(newObject));

			break;
		default:
			if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "custom_subpages") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const customSubpageIndex = newObject.data.custom_subpages.findIndex((e) => JSON.stringify(e.id) === JSON.stringify(newPath[2]));
				if (customSubpageIndex === -1) break;
				newPath[2] = customSubpageIndex;
				newObject = ChangeValueInNestedObject(newObject, newPath, req?.body?.newValue);
			} else {
				newObject = ChangeValueInNestedObject(newObject, req?.body?.path, req?.body?.newValue);
			}
			break;
	}

	try {
		await Object.findOneAndReplace({ _id: req.params.id }, newObject, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Object Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { object: newObject } });
};
