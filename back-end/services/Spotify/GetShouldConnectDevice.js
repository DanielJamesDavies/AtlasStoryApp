module.exports = async (req, res) => {
	return res
		.status(200)
		.send({ message: "Success", shouldConnectDevice: req?.cookies?.AtlasStoryAppShouldConnectDeviceToSpotify ? true : false });
};
