const Genre = require("../../models/Genre");

module.exports = async (req, res) => {
	const oldGenre = await Genre.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldGenre) return res.status(200).send({ errors: [{ message: "Genre Not Found" }] });

	let newGenre = JSON.parse(JSON.stringify(oldGenre));

	if (req?.body?.name) {
		const nameUsed = await Genre.findOne({ name: req.body.name }).exec();
		if (nameUsed) return res.status(200).send({ errors: [{ message: "A genre with this name already exists." }] });
		newGenre.name = req.body.name;
	}

	if (req?.body?.owner) newGenre.owner = req.body.owner;

	try {
		await Genre.findOneAndReplace({ _id: req.params.id }, newGenre, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Genre Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { genre: newGenre } });
};
