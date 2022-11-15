const Genre = require("../../models/Genre");
const User = require("../../models/User");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (req.query?.owner) {
		let genres = await Genre.find({ owner: req.query.owner })
			.exec()
			.catch(() => {
				res.status(200).send({ errors: [{ message: "Genres Not Found" }] });
			});
		if (!genres) return res.status(200).send({ errors: [{ message: "Genres Not Found" }] });

		let newGenres = await Promise.all(genres.map(async (genre) => await getGenreData(genre)));

		return res.status(200).send({ message: "Success", data: { genres: newGenres } });
	}

	let genres = await Genre.find()
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Genres Not Found" }] });
		});
	if (!genres) return res.status(200).send({ errors: [{ message: "Genres Not Found" }] });

	let newGenres = await Promise.all(genres.map(async (genre) => await getGenreData(genre)));

	return res.status(200).send({ message: "Success", data: { genres: newGenres } });
};

async function getGenreData(oldGenre) {
	let newGenre = JSON.parse(JSON.stringify(oldGenre));

	let usersFavourited = await User.find({ "data.favouritedGenres": newGenre._id })
		.exec()
		.catch(() => {});
	newGenre.usersFavourited = usersFavourited?.length ? usersFavourited?.length : 0;

	let storiesUsing = await Story.find({ "data.genres": newGenre._id })
		.exec()
		.catch(() => {});
	newGenre.storiesUsing = storiesUsing?.length ? storiesUsing?.length : 0;

	return newGenre;
}
