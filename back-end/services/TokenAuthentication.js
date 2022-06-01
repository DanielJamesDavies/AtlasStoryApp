const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req?.cookies?.AtlasStoryAppToken;
	if (!token) return res.status(200).send({ unauthorized: true, errors: [{ message: "Access Denied" }] });
	try {
		req.authenticated = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (error) {
		return res.status(200).send({ unauthorized: true, errors: [{ message: "Access Denied" }] });
	}
};
