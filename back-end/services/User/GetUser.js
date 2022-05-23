const User = require("../../models/User");
const jwt_decode = require("jwt-decode");

module.exports = async (req, res) => {
	if (req.query.username) {
		let user = await User.findOne({ username: req.query.username })
			.exec()
			.catch((err) => {
				res.status(200).send({ error: err });
			});
		if (!user) return res.status(200).send({ error: "User Not Found" });

		return res.status(200).send({ message: "Success", data: user });
	}

	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ error: "Authentication Error" });
	}

	let user = await User.findById(user_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!user) return res.status(200).send({ error: "User Not Found" });

	res.status(200).send({ message: "Success", data: user });
};
