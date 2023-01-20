module.exports = async (req, res) => {
	const newCookiesConsent = req?.body?.cookiesConsent;

	if (!newCookiesConsent) {
		res.clearCookie("AtlasStoryAppToken");
		res.clearCookie("AtlasStoryAppCookiesConsent");
		res.clearCookie("AtlasStoryAppShouldConnectDeviceToSpotify");
	} else {
		res.cookie("AtlasStoryAppCookiesConsent", true, req.cookieOptions);
	}

	return res.status(200).send({ message: "Success", cookiesConsent: newCookiesConsent });
};
