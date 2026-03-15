const mongoose = require("mongoose");

const Image = require("../../models/Image");

const validateImage = require("./validateImage");

const { uploadBase64 } = require("../R2Config");
const { checkStorageQuota, getBase64SizeBytes } = require("./storage-quota");

module.exports = async (req, res) => {
	let imageValidationResult = validateImage(req.body.image);
	if (req?.body?.isLocationMapImage) imageValidationResult.errors = imageValidationResult.errors?.filter((e) => e?.key !== "too-large");
	if (imageValidationResult.errors.length > 0) return res.status(200).send({ errors: imageValidationResult.errors });

	const base64String = req.body.newValue.substring(23);
	const file_size_bytes = getBase64SizeBytes(base64String);

	const quota = await checkStorageQuota(file_size_bytes);
	if (quota.exceeded) return res.status(200).send({ errors: [{ message: "Storage limit reached. No new images can be uploaded at this time." }] });

	const image_id = new mongoose.Types.ObjectId();

	uploadBase64(`images/${image_id}.webp`, base64String);

	const image = new Image({
		_id: image_id,
		user_id: req.body.user_id,
		story_id: req.body.story_id,
		character_id: req.body.character_id,
		group_id: req.body.group_id,
		character_type_id: req.body.character_type_id,
		substory_id: req.body.substory_id,
		file_size_bytes,
	});

	try {
		await image.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Image Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { image } });
};
