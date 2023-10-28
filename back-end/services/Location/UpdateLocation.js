const Location = require("../../models/Location");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if ((!req?.body?.path && !req?.body?.paths) || JSON.stringify(req?.body?.path) === JSON.stringify(["_id"]))
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldLocation = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldLocation) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	let newLocation = JSON.parse(JSON.stringify(oldLocation));

	// Story Authentication Check
	if (JSON.stringify(oldLocation.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	if (req?.body?.paths && req?.body?.newValues) {
		req?.body?.paths?.map((path, index) => {
			if (["_id", "uid"].includes(path.join("/"))) return false;
			newLocation = ChangeValueInNestedObject(JSON.parse(JSON.stringify(newLocation)), path, req?.body?.newValues[index]);
			return true;
		});
	} else {
		if (JSON.stringify(req?.body?.path) === JSON.stringify(["uid"])) {
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Location.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another location. Please enter a different UID" }] });

			newLocation.uid = newUID;
		} else if (JSON.stringify(req?.body?.path) === JSON.stringify(["data", "images"])) {
			const oldImages = newLocation.data.images;
			const newImages = req.body.newValue.images;
			const newImagesData = req.body.newValue.images_data;

			// Remove Removed Images
			await Promise.all(
				oldImages.map(async (oldItem) => {
					if (newImages.findIndex((e) => JSON.stringify(e?.image) === JSON.stringify(oldItem?.image)) === -1) {
						try {
							await Image.deleteOne({ _id: oldItem?.image });
						} catch (error) {}
					}
					return true;
				})
			);

			// Create New Images
			await Promise.all(
				newImages.map(async (newItem) => {
					if (oldImages.findIndex((e) => JSON.stringify(e?.image) === JSON.stringify(newItem?.image)) === -1) {
						const newImage = newImagesData.find((e) => JSON.stringify(e._id) === JSON.stringify(newItem?.image))?.image;

						if (newImage) {
							const image = new Image({
								_id: newItem?.image,
								image: newImage,
								story_id: newLocation.story_id,
								location_id: newLocation._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newLocation.data.images = newImages;
		} else if (JSON.stringify(req?.body?.path) === JSON.stringify(["data", "gallery"])) {
			if (req?.body?.newValue?.gallery !== undefined) {
				const newGallery = req.body.newValue.gallery;

				// Create new images
				const newImages = (
					await Promise.all(
						req.body.newValue.images.map(async (image) => {
							const image_exists = await Image.exists({ _id: image?._id });
							if (image_exists) return false;
							return image;
						})
					)
				).filter((e) => e !== false);

				await Promise.all(
					newImages.map(async (newImage) => {
						if (newImage?._id && newImage?.image) {
							const image = new Image({
								_id: newImage?._id,
								image: newImage?.image,
								story_id: newLocation.story_id,
								location_id: newLocation._id,
							});
							try {
								await image.save();
							} catch (error) {}
						}
					})
				);

				const newLocationImages = [...new Set(newLocation.data.images.concat(newGallery.map((e) => e.image)))];

				// Change gallery to new gallery
				newLocation.data.images = newLocationImages;
				newLocation.data.gallery = newGallery;
			} else {
				newLocation.data.gallery = req?.body?.newValue;
			}
		} else {
			newLocation = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldLocation)), req?.body?.path, req?.body?.newValue);
		}
	}

	try {
		await Location.findOneAndReplace({ _id: req.params.id }, newLocation, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Location Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { location: newLocation } });
};
