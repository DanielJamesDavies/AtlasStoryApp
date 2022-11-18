const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");
const User = require("../../models/User");

module.exports = async (req, res) => {
	try {
		var { user_id } = jwt_decode(req?.cookies?.AtlasStoryAppToken);
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Authentication Error" }] });
	}

	const user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "Could Not Find User" }] });

	let newUser = JSON.parse(JSON.stringify(user));

	const storyIndex = newUser.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(req.params.id));
	if (storyIndex !== -1) newUser.data.stories.splice(storyIndex, 1);

	const oldStory = await Story.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldStory) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));

	if (JSON.stringify(newStory.owner) === JSON.stringify(user_id))
		return res.status(200).send({ errors: [{ message: "You Cannot Leave Story You Are An Owner Of" }] });

	const memberIndex = newStory.data.members.findIndex((e) => JSON.stringify(e.user_id) === JSON.stringify(user_id));
	if (memberIndex !== -1) newStory.data.members.splice(memberIndex, 1);

	try {
		await User.findOneAndReplace({ _id: newUser._id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	try {
		await Story.findOneAndReplace({ _id: newStory._id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success" });
};
