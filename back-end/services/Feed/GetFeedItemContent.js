const User = require("../../models/User");
const Story = require("../../models/Story");
const Group = require("../../models/Group");
const CharacterType = require("../../models/CharacterType");
const Character = require("../../models/Character");
const Substory = require("../../models/Substory");
const Image = require("../../models/Image");

module.exports = async (content_id, content_type) => {
	let content = { _id: content_id, content_type };
	let includeStoryData = false;
	switch (content_type) {
		case "user":
			const user = await User.findOne({ _id: content_id });
			if (user) content = { _id: content_id, content_type, username: user?.username, nickname: user?.data?.nickname };
			break;
		case "story":
			const story = await Story.findOne({ _id: content_id });
			if (story) content = { _id: content_id, content_type, uid: story?.uid, story_id: story?._id };
			includeStoryData = true;
			break;
		case "group":
			const group = await Group.findOne({ _id: content_id });
			if (group) content = { _id: content_id, content_type, uid: group?.uid, story_id: group?.story_id, name: group?.data?.name };
			includeStoryData = true;
			break;
		case "character_type":
			const characterType = await CharacterType.findOne({ _id: content_id });
			if (characterType) content = { _id: content_id, content_type, story_id: characterType?.story_id, name: characterType?.data?.name };
			includeStoryData = true;
			break;
		case "character":
			const character = await Character.findOne({ _id: content_id });
			if (character)
				content = { _id: content_id, content_type, uid: character?.uid, story_id: character?.story_id, name: character?.data?.name };
			includeStoryData = true;
			break;
		case "substory":
			const substory = await Substory.findOne({ _id: content_id });
			if (substory)
				content = { _id: content_id, content_type, uid: substory?.uid, story_id: substory?.story_id, name: substory?.data?.title };
			includeStoryData = true;
			break;
	}

	if (includeStoryData) {
		const story = await Story.findOne({ _id: content?.story_id });
		if (story) content.story = { _id: story._id, uid: story?.uid, title: story?.data?.title };

		if (story?.data?.icon) {
			const storyIcon = await Image.findOne({ _id: story?.data?.icon });
			if (storyIcon?.image) content.story.icon = storyIcon.image;
		}
	}

	return content;
};
