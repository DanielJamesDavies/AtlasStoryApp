const jwt_decode = require("jwt-decode");
const User = require("../../models/User");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (!req?.query?.value) return;

	let searchResults = [];

	let regex = {
		$regex: RegExp(req?.query?.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i"),
	};

	let users = await User.find({
		$or: [{ username: regex }, { "data.nickname": regex }],
	});
	users = users.map((oldUser) => {
		let newUser = JSON.parse(JSON.stringify(oldUser));
		newUser.modelType = "user";
		return newUser;
	});
	searchResults = searchResults.concat(users);

	let stories = await Story.find({
		$or: [{ uid: regex }, { "data.title": regex }, { owner: { $in: users.map((user) => user._id) } }],
	});

	let usersOfStories = await User.find({ _id: { $in: stories.map((story) => story.owner) } });

	let newStories = stories.map((oldStory) => {
		let newStory = JSON.parse(JSON.stringify(oldStory));
		newStory.modelType = "story";
		let newOwner = usersOfStories.find((e) => JSON.stringify(e._id) === JSON.stringify(newStory.owner));
		if (newOwner) newStory.owner = { _id: newOwner?._id, username: newOwner?.username, nickname: newOwner?.data?.nickname };
		return newStory;
	});
	searchResults = searchResults.concat(newStories);

	usersOfStories = usersOfStories.map((oldUser) => {
		let newUser = JSON.parse(JSON.stringify(oldUser));
		newUser.modelType = "user";
		return newUser;
	});
	searchResults = searchResults.concat(usersOfStories.filter((e) => users.findIndex((e2) => e2._id === e._id) === -1));

	searchResults = searchResults.sort((a, b) => {
		let re = new RegExp("^" + req?.query?.value, "i");
		let aName = getNameByModel(a);
		let bName = getNameByModel(b);
		return re.test(aName) ? (re.test(bName) ? aName.localeCompare(bName) : -1) : 1;
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
