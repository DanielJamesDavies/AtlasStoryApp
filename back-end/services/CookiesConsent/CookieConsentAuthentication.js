module.exports = (req, res, next) => {
	const cookieConsent = req?.cookies?.AtlasStoryAppCookiesConsent;
	if (!cookieConsent) return res.status(200).send({ cookiesConsent: false, error: "Access Denied" });
	next();
};
