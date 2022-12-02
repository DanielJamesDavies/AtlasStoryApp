module.exports = async (req, res) => {
	return res.status(200).send({ message: "Success", data: { cookiesConsent: req?.cookies?.AtlasStoryAppCookiesConsent ? true : false } });
};
