const Location = require("../../models/Location");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldLocation = await Location.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldLocation) return res.status(200).send({ errors: [{ message: "Location Not Found" }] });

	let newLocation = JSON.parse(JSON.stringify(oldLocation));

	// Story Authentication Check
	if (JSON.stringify(oldLocation.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	if (JSON.stringify(req?.body?.path) === JSON.stringify(["data", "gallery"])) {
		const oldGallery = newLocation.data.gallery;
		const newGallery = req.body.newValue.gallery;
		const newImages = req.body.newValue.images;

		// Remove Removed Images
		await Promise.all(
			oldGallery.map(async (oldItem) => {
				if (newGallery.findIndex((e) => JSON.stringify(e?.image) === JSON.stringify(oldItem?.image)) === -1) {
					try {
						await Image.deleteOne({ _id: oldItem?.image });
					} catch (error) {}
				}
				return true;
			})
		);

		// Create New Images
		await Promise.all(
			newGallery.map(async (newItem) => {
				if (oldGallery.findIndex((e) => JSON.stringify(e?.image) === JSON.stringify(newItem?.image)) === -1) {
					const newImage = newImages.find((e) => JSON.stringify(e._id) === JSON.stringify(newItem?.image))?.image;

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

		newLocation.data.gallery = newGallery;
	} else {
		newLocation = ChangeValueInNestedObject(JSON.parse(JSON.stringify(oldLocation)), req?.body?.path, req?.body?.newValue);
	}

	try {
		await Location.findOneAndReplace({ _id: req.params.id }, newLocation, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Location Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { location: newLocation } });
};
