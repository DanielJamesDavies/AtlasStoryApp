const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("token");
	if (!token) return res.status(401).send({ error: "Access Denied" });
	try {
		req.authenticated = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		return res.status(401).send({ error: "Access Denied" });
	}
};
