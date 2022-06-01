const jwt_decode = require("jwt-decode");

const User = require("../../models/User");
const UserVerification = require("../../models/UserVerification");
const Image = require("../../models/Image");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	let user = await User.findById(user_id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "User Not Found" }] });
		});
	if (!user) return res.status(200).send({ errors: [{ message: "User Not Found" }] });

	try {
		const userDeleteResult = await User.deleteOne({ _id: user_id });
		if (userDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "User Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Deleted" }] });
	}

	if (user?.data?.profilePicture) {
		try {
			const profilePictureDeleteResult = await Image.deleteOne({ _id: user.data.profilePicture });
			if (profilePictureDeleteResult?.deletedCount !== 1)
				return res.status(200).send({ errors: [{ message: "Profile Picture Could Not Be Deleted" }] });
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Profile Picture Could Not Be Deleted" }] });
		}
	}

	if (user?.data?.banner) {
		try {
			const bannerDeleteResult = await Image.deleteOne({ _id: user.data.banner });
			if (bannerDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Banner Could Not Be Deleted" }] });
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "Banner Could Not Be Deleted" }] });
		}
	}

	if (user?.verified) {
		try {
			const userVerificationDeleteResult = await UserVerification.deleteOne({ user_id });
			if (userVerificationDeleteResult?.deletedCount !== 1)
				return res.status(200).send({ errors: [{ message: "User Verification Could Not Be Deleted" }] });
		} catch (error) {
			return res.status(200).send({ errors: [{ message: "User Verification Could Not Be Deleted" }] });
		}
	}

	return res.status(200).send({ message: "Success" });
};
