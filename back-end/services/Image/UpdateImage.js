const Image = require("../../models/Image");

const validateImage = require("./validateImage");

module.exports = async (req, res) => {
	if (!req?.params?.id) return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
	if (!req?.body?.newValue) return res.status(200).send({ errors: [{ message: "New Value Not Given" }] });
	if (typeof req?.body?.newValue !== "string") return res.status(200).send({ errors: [{ message: "Invalid New Value" }] });

	const imageValidationResult = validateImage(req.body.newValue);
	if (imageValidationResult.errors.length > 0) return res.status(200).send({ errors: imageValidationResult.errors });

	const oldImage = await Image.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Image Not Found" }] });
		});
	if (!oldImage) {
		const newImage = new Image({
			_id: req.params.id,
			image: req.body.newValue,
			user_id: req.body.user_id,
			story_id: req.body.story_id,
			character_id: req.body.character_id,
			group_id: req.body.group_id,
			character_type_id: req.body.character_type_id,
		});

		try {
			await newImage.save();
		} catch (error) {
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
