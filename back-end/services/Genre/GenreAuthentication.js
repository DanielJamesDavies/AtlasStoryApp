const jwt = require("jsonwebtoken");
const Genre = require("../../models/Genre");

module.exports = async (req, res, next) => {
	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let user_id = false;
	try {
		user_id = jwt.verify(token, process.env.TOKEN_SECRET)?.user_id;
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });
	}
	if (!user_id) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const genre = await Genre.findById(req.body.genre_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Genre Not Found" }] });
		});
	if (!genre) return res.status(200).send({ errors: [{ message: "Genre Not Found" }] });

	if (genre?.owner && JSON.stringify(user_id) === JSON.stringify(genre?.owner)) return next();

	return res.status(200).send({ errors: [{ message: "Access Denied" }] });
};
