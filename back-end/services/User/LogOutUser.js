module.exports = async (req, res) => {
	return res
		.status(200)
		.clearCookie("AtlasStoryAppToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
			path: "/",
		})
		.send({ message: "Success", unauthorized: true });
};
