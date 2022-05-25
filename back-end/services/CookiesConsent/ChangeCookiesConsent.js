module.exports = async (req, res) => {
	const newCookiesConsent = req?.body?.cookiesConsent;

	if (!newCookiesConsent) {
		res.clearCookie("AtlasStoryAppToken");
		res.clearCookie("AtlasStoryAppCookiesConsent");
	} else {
		res.cookie("AtlasStoryAppCookiesConsent", true, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
			expires: new Date(Math.floor(Date.now()) + 60 * 60 * 24 * 365 * 2 * 1000),
			path: "/",
		});
	}

	return res.status(200).send({ message: "Success", cookiesConsent: newCookiesConsent });
};
