const mongoose = require("mongoose");

const Image = require("../../models/Image");

module.exports = async (req, res) => {
	const image = new Image({
		_id: new mongoose.Types.ObjectId(),
		image: req.body.image,
		user_id: req.body.user_id,
		story_id: req.body.story_id,
		character_id: req.body.character_id,
		group_id: req.body.group_id,
		character_type_id: req.body.character_type_id,
	});

	try {
		await image.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Image Could Not Be Created" }] });
	}

	return res.status(200).send({ message: "Success", data: { image } });
};
