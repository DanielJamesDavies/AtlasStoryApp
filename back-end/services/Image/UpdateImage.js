const Image = require("../../models/Image");

const validateImage = require("./validateImage");

const { uploadBase64, deleteFile } = require("../R2Config");
const { checkStorageQuota, getBase64SizeBytes } = require("./storage-quota");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
	if (typeof req?.body?.newValue !== "string" && req?.body?.newValue !== undefined)
		return res.status(200).send({ errors: [{ message: "Invalid New Value" }] });

	if (req?.body?.newValue !== "NO_IMAGE") {
		let imageValidationResult = validateImage(req.body.newValue);
		if (req?.body?.isLocationMapImage) imageValidationResult.errors = imageValidationResult.errors?.filter((e) => e?.key !== "too-large");
		if (imageValidationResult.errors.length > 0) return res.status(200).send({ errors: imageValidationResult.errors });
	}

	const oldImage = await Image.findById(req.params.id)
		.exec()
		.catch(() => false);

	try {
		if (req.body.newValue === undefined || (!req.body.newValue.startsWith("blob:http") && !req.body.newValue.startsWith("https://"))) {
			const path = `images/${req.params.id}.webp`;
			if (req?.body?.newValue !== "NO_IMAGE") {
				const base64String = req.body.newValue === undefined ? "" : req.body.newValue.substring(23);
				const file_size_bytes = getBase64SizeBytes(base64String);
				const existingSizeBytes = oldImage?.file_size_bytes || 0;

				const quota = await checkStorageQuota(file_size_bytes, existingSizeBytes);
				if (quota.exceeded) return res.status(200).send({ errors: [{ message: "Storage limit reached. No new images can be uploaded at this time." }] });

				req.body._file_size_bytes = file_size_bytes;
				uploadBase64(path, base64String);
			} else {
				deleteFile(path).catch((e) => {
					console.log("Error in UpdateImage.js. ", e);
				});
			}
		}
	} catch (e) {
		console.log("Error in UpdateImage.js. ", e);
	}
	if (!oldImage) {
		const newImage = new Image({
			_id: req.params.id,
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
			file_size_bytes: req.body._file_size_bytes,
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
		if (req.body._file_size_bytes !== undefined) newImage.file_size_bytes = req.body._file_size_bytes;

		try {
			await Image.findOneAndReplace({ _id: req.params.id }, newImage, { upsert: true });
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Image Could Not Be Saved" }] });
		}

		return res.status(200).send({ message: "Success", data: { image: newImage } });
	}
};
