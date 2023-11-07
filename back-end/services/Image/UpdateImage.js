const Image = require("../../models/Image");

const validateImage = require("./validateImage");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
	if (typeof req?.body?.newValue !== "string" && req?.body?.newValue !== undefined)
		return res.status(200).send({ errors: [{ message: "Invalid New Value" }] });

	if (req?.body?.newValue !== "NO_IMAGE") {
		const imageValidationResult = validateImage(req.body.newValue);
		if (imageValidationResult.errors.length > 0) return res.status(200).send({ errors: imageValidationResult.errors });
	}

	const oldImage = await Image.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldImage) {
		const newImage = new Image({
			_id: req.params.id,
			image: req.body.newValue,
			user_id: req.body.user_id,
			story_id: req.body.story_id,
			character_id: req.body.character_id,
			group_id: req.body.group_id,
			character_type_id: req.body.character_type_id,
			substory_id: req.body.substory_id,
			location_id: req.body.location_id,
			location_map_version_id: req.body.location_map_version_id,
			event_id: req.body.event_id,
			object_id: req.body.object_id,
			lore_item_id: req.body.lore_item_id,
		});

		try {
			await newImage.save();
		} catch (error) {
			console.log(error);
			return res.status(200).send({ errors: [{ message: "Image Could Not Be Created" }] });
		}

		return res.status(200).send({ message: "Success", data: { image: newImage } });
	} else {
		let newImage = JSON.parse(JSON.stringify(oldImage));
		newImage.image = req.body.newValue;

		try {
			await Image.findOneAndReplace({ _id: req.params.id }, newImage, { upsert: true });
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Image Could Not Be Saved" }] });
		}

		return res.status(200).send({ message: "Success", data: { image: newImage } });
	}
};
