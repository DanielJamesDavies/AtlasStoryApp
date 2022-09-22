const jwt_decode = require("jwt-decode");
const User = require("../../models/User");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	if (!req?.query?.value) return;

	let searchResults = [];

	let regex = { $regex: RegExp(req.query.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i") };

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
	stories = stories.map((oldStory) => {
		let newStory = JSON.parse(JSON.stringify(oldStory));
		newStory.modelType = "story";
		return newStory;
	});
	searchResults = searchResults.concat(stories);

	let usersOfStories = await User.find({ _id: { $in: stories.map((story) => story.owner) } });
	usersOfStories = usersOfStories.map((oldUser) => {
		let newUser = JSON.parse(JSON.stringify(oldUser));
		newUser.modelType = "user";
		return newUser;
	});
	searchResults = searchResults.concat(usersOfStories.filter((e) => users.findIndex((e2) => e2._id === e._id) === -1));

	return res.status(200).send({ message: "Success", data: { searchResults } });
};
