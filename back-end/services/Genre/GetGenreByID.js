const Genre = require("../../models/Genre");
const User = require("../../models/User");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	const genre = await Genre.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!genre) return res.status(200).send({ errors: [{ message: "Genre Not Found" }] });

	const newGenre = await getGenreData(genre);

	res.status(200).send({ message: "Success", data: { genre: newGenre } });
};

async function getGenreData(oldGenre) {
	let newGenre = JSON.parse(JSON.stringify(oldGenre));

	let usersFavourited = await User.find({ "data.favouritedGenres": newGenre._id })
		.exec()
		.catch(() => false);
	newGenre.usersFavourited = usersFavourited?.length ? usersFavourited?.length : 0;

	let storiesUsing = await Story.find({ "data.genres": newGenre._id })
		.exec()
		.catch(() => false);
	newGenre.storiesUsing = storiesUsing?.length ? storiesUsing?.length : 0;

	return newGenre;
}
