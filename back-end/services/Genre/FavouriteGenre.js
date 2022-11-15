const jwt_decode = require("jwt-decode");

const Genre = require("../../models/Genre");
const User = require("../../models/User");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	const genre = await Genre.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Genre Not Found" }] });
		});
	if (!genre || !genre?._id) return res.status(200).send({ errors: [{ message: "Genre Not Found" }] });

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const user = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	let newUser = JSON.parse(JSON.stringify(user));

	if (newUser.data.favouritedGenres.findIndex((e) => JSON.stringify(e) === JSON.stringify(genre._id)) === -1)
		newUser.data.favouritedGenres.push(genre._id);

	try {
		await User.findOneAndReplace({ _id: user_id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	const newGenre = await getGenreData(genre);

	res.status(200).send({ message: "Success", data: { genre: newGenre } });
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
