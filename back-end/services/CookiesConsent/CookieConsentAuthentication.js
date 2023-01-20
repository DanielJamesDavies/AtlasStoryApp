module.exports = (req, res, next) => {
	const cookiesConsent = req?.cookies?.AtlasStoryAppCookiesConsent;
	if (!cookiesConsent) return res.status(200).send({ cookiesConsent: false, errors: [{ message: "Access Denied" }] });
	next();
};
