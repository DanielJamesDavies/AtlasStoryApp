const User = require("../../models/User");
const Story = require("../../models/Story");
const Image = require("../../models/Image");

const StoryMemberAuthentication = require("../StoryMemberAuthentication");

module.exports = async (req, res) => {
	if (!req?.query?.value) return;
	let lastDate = new Date();

	let searchResults = [];

	let regex = {
		$regex: RegExp(req?.query?.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"),
	};

	const userFilter = { _id: 1, username: 1, "data.nickname": 1, "data.profilePicture": 1 };
	const storyFilter = { _id: 1, uid: 1, owner: 1, "data.title": 1 };

	let users = await User.find(
		{
			$or: [{ username: regex }, { "data.nickname": regex }],
		},
		userFilter
	);
	users = await Promise.all(
		users.map(async (oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.modelType = "user";

			const profilePicture = await Image.findById(newUser.data.profilePicture)
				.exec()
				.catch(() => false);
			newUser.data.profilePicture = profilePicture;
			return newUser;
		})
	);
	searchResults = searchResults.concat(users);

	let stories = await Story.find(
		{
			$or: [{ uid: regex }, { "data.title": regex }, { owner: { $in: users.map((user) => user._id) } }],
		},
		storyFilter
	);

	let ownersOfStories = await User.find({ _id: { $in: stories.map((story) => story.owner) } }, userFilter);

	let newStories = await Promise.all(
		stories.map(async (oldStory) => {
			const storyMemberAuthenticationResponse = await StoryMemberAuthentication(
				req,
				{ story_id: oldStory._id, status: () => {} },
				() => true
			);
			if (storyMemberAuthenticationResponse !== true) return false;

			let newStory = JSON.parse(JSON.stringify(oldStory));
			newStory.modelType = "story";
			let newOwner = ownersOfStories.find((e) => JSON.stringify(e._id) === JSON.stringify(newStory.owner));
			if (newOwner) newStory.data.owner = { _id: newOwner?._id, username: newOwner?.username, nickname: newOwner?.data?.nickname };
			return newStory;
		})
	);
	newStories = newStories.filter((e) => e !== false);
	searchResults = searchResults.concat(newStories);

	ownersOfStories = await Promise.all(
		ownersOfStories.map(async (oldUser) => {
			let newUser = JSON.parse(JSON.stringify(oldUser));
			newUser.modelType = "user";

			const profilePicture = await Image.findById(newUser.data.profilePicture)
				.exec()
				.catch(() => false);
			newUser.data.profilePicture = profilePicture;
			return newUser;
		})
	);
	searchResults = searchResults.concat(ownersOfStories.filter((e) => users.findIndex((e2) => e2._id === e._id) === -1));

	searchResults = searchResults.sort((a, b) => {
		let regex = new RegExp("^" + req?.query?.value, "i");
		let aName = getNameByModel(a);
		let bName = getNameByModel(b);
		return regex.test(aName) ? (regex.test(bName) ? aName.localeCompare(bName) : -1) : 1;
	});

	return res.status(200).send({ message: "Success", data: { searchResults } });
};

function getNameByModel(data) {
	switch (data?.modelType) {
		case "user":
			return data?.data?.nickname;
		case "story":
			return data?.data?.title;
		default:
			return "";
	}
}
