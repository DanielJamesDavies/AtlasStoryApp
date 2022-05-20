const User = require("../../models/User");
const jwt_decode = require("jwt-decode");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req.header("token"));
	} catch (error) {
		return res.status(200).send({ error: "Authentication Error" });
	}

	var user = await User.findById(user_id)
		.exec()
		.catch((err) => {
			res.status(200).send({ error: err });
		});
	if (!user) return res.status(200).send({ error: "User Not Found" });

	res.status(200).send({ message: "Success", data: user });
};
