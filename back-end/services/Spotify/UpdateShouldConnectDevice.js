module.exports = async (req, res) => {
	const newShouldConnectDevice = req?.body?.shouldConnectDevice;

	if (!newShouldConnectDevice) {
		res.clearCookie("AtlasStoryAppShouldConnectDeviceToSpotify");
	} else {
		res.cookie("AtlasStoryAppShouldConnectDeviceToSpotify", true, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
			expires: new Date(Math.floor(Date.now()) + 60 * 60 * 24 * 365 * 2 * 1000),
			path: "/",
		});
	}

	return res.status(200).send({ message: "Success", shouldConnectDevice: newShouldConnectDevice });
};
