const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const Genre = require("../../models/Genre");

module.exports = async (req, res) => {
	if (!req.body.name || req.body.name.length === 0) return res.status(200).send({ errors: [{ message: "Invalid Name." }] });

	const nameUsed = await Genre.findOne({ name: req.body.name }).exec();
	if (nameUsed) return res.status(200).send({ errors: [{ message: "A genre with this name already exists." }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const genre = new Genre({ _id: new mongoose.Types.ObjectId(), name: req.body.name, owner: user_id });

	try {
		await genre.save();
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Genre Could Not Be Created" }] });
	}

	let newGenre = JSON.parse(JSON.stringify(genre));
	newGenre.usersFavourited = 0;
	newGenre.storiesUsing = 0;

	return res.status(200).send({ message: "Success", data: { genre: newGenre } });
};
