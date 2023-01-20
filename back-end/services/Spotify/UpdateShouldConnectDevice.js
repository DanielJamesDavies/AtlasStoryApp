module.exports = async (req, res) => {
	const newShouldConnectDevice = req?.body?.shouldConnectDevice;

	if (!newShouldConnectDevice) {
		res.clearCookie("AtlasStoryAppShouldConnectDeviceToSpotify");
	} else {
		res.cookie("AtlasStoryAppShouldConnectDeviceToSpotify", true, req.cookieOptions);
	}

	return res.status(200).send({ message: "Success", shouldConnectDevice: newShouldConnectDevice });
};
