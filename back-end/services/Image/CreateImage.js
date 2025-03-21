const mongoose = require("mongoose");

const Image = require("../../models/Image");

const validateImage = require("./validateImage");

const { storage, ref, uploadString } = require("../FirebaseConfig");

module.exports = async (req, res) => {
	let imageValidationResult = validateImage(req.body.image);
	if (req?.body?.isLocationMapImage) imageValidationResult.errors = imageValidationResult.errors?.filter((e) => e?.key !== "too-large");
	if (imageValidationResult.errors.length > 0) return res.status(200).send({ errors: imageValidationResult.errors });

	const image_id = new mongoose.Types.ObjectId();

	const firebase_path = `images/${image_id}.webp`;
	const storageRef = ref(storage, firebase_path);
	uploadString(storageRef, req.body.newValue.substring(23), "base64");

	const image = new Image({
		_id: image_id,
		image: req.body.image,
		user_id: req.body.user_id,
		story_id: req.body.story_id,
		character_id: req.body.character_id,
		group_id: req.body.group_id,
		character_type_id: req.body.character_type_id,
		substory_id: req.body.substory_id,
	});

	try {
		await image.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Image Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { image } });
};
