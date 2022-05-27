const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res.status(200).send({ unauthorized: true, error: "Access Denied" });

	let user_id = false;
	try {
		user_id = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		return res.status(200).send({ unauthorized: true, error: "Access Denied" });
	}
	if (!user_id) return res.status(200).send({ unauthorized: true, error: "Access Denied" });

	next();
};
