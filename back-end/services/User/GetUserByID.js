const User = require("../../models/User");

module.exports = async (req, res) => {
	const user = await User.findById(req.params.id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!user) return res.status(200).send({ error: "User Not Found" });

	res.status(200).send({ message: "Success", data: { user } });
};
