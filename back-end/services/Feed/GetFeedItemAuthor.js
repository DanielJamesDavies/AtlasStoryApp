const User = require("../../models/User");
const Image = require("../../models/Image");

module.exports = async (author_id) => {
	if (!author_id) return undefined;

	let author = { _id: author_id };

	const user = await User.findOne({ _id: author_id });
	if (!user) return author;
	author = { _id: user?._id, username: user?.username, nickname: user?.data?.nickname };

	if (user?.data?.profilePicture) {
		const profilePicture = await Image.findOne({ _id: user?.data?.profilePicture });
		if (profilePicture?.image) author.profilePicture = profilePicture.image;
	}

	return author;
};
