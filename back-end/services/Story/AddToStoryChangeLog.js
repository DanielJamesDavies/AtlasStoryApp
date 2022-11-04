const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const Story = require("../../models/Story");

module.exports = async (story_id, changeLogItem) => {
	if (!changeLogItem || !changeLogItem?.content_type || !changeLogItem?.content_id || !changeLogItem?.path || !changeLogItem?.title) return false;

	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return false;
		});
	if (!oldStory) return false;

	let newStory = JSON.parse(JSON.stringify(oldStory));

	let newChangeLogItem = JSON.parse(JSON.stringify(changeLogItem));
	if (newChangeLogItem.content_id) newChangeLogItem.content_id = mongoose.Types.ObjectId(newChangeLogItem.content_id);

	let user_id = false;
	try {
		user_id = jwt_decode(req?.cookies?.AtlasStoryAppToken)?.user_id;
	} catch (error) {}
	if (user_id === false) return false;
	newChangeLogItem.author_id = mongoose.Types.ObjectId(user_id);

	let previousChangeLogItem =
		newStory.data?.changeLog.length === 0 ? {} : JSON.parse(JSON.stringify(newStory.data?.changeLog[newStory.data?.changeLog.length - 1]));
	delete previousChangeLogItem._id;
	delete previousChangeLogItem.date_changed;

	if (newStory.data?.changeLog.length === 0 || JSON.stringify(previousChangeLogItem) !== JSON.stringify(newChangeLogItem))
		newStory.data.changeLog.push(newChangeLogItem);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return false;
	}
	return true;
};
