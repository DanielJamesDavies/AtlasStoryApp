module.exports = async (req, res) => {
	return res.status(200).clearCookie("AtlasStoryAppToken").send({ message: "Success" });
};
