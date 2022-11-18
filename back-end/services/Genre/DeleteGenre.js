const Genre = require("../../models/Genre");

module.exports = async (req, res) => {
	const genre = await Genre.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!genre) return res.status(200).send({ errors: [{ message: "Genre Not Found", id: req.params.id }] });

	try {
		const genreDeleteResult = await Genre.deleteOne({ _id: genre._id });
		if (genreDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Genre Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Genre Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};
