const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const Story = require("../../models/Story");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "Authentication Error" }] });
	}

	let user = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ attribute: "deleteUser", message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "User Not Found" }] });

	let stories = await Story.find({ owner: user._id })
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ attribute: "deleteUser", message: "User Not Found" }] });
		});
	if (stories?.length > 0)
		return res
			.status(200)
			.send({ errors: [{ attribute: "deleteUser", message: "This User Cannot Be Deleted as It Is the Owner of a Story." }] });

	try {
		const userDeleteResult = await User.deleteOne({ _id: user_id });
		if (userDeleteResult?.deletedCount !== 1)
			return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "User Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "User Could Not Be Deleted" }] });
	}

	if (user?.data?.profilePicture) {
		try {
			const profilePictureDeleteResult = await Image.deleteOne({ _id: user.data.profilePicture });
			if (profilePictureDeleteResult?.deletedCount !== 1)
				return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "Profile Picture Could Not Be Deleted" }] });
		} catch (error) {
			return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "Profile Picture Could Not Be Deleted" }] });
		}
	}

	if (user?.data?.banner) {
		try {
			const bannerDeleteResult = await Image.deleteOne({ _id: user.data.banner });
			if (bannerDeleteResult?.deletedCount !== 1)
				return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "Banner Could Not Be Deleted" }] });
		} catch (error) {
			return res.status(200).send({ errors: [{ attribute: "deleteUser", message: "Banner Could Not Be Deleted" }] });
		}
	}

	return res.status(200).send({ message: "Success" });
};
