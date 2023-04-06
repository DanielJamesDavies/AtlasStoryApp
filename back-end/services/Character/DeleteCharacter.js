const Character = require("../../models/Character");
const Story = require("../../models/Story");
const Group = require("../../models/Group");

const deleteImagesByKey = require("../Image/deleteImagesByKey");

module.exports = async (req, res) => {
	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(character.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const removeCharacterFromStoryPrimaryCharactersResult = await removeCharacterFromStoryPrimaryCharacters(req.params.id, character.story_id);
	if (removeCharacterFromStoryPrimaryCharactersResult?.errors)
		return res.status(200).send({ errors: removeCharacterFromStoryPrimaryCharactersResult?.errors });

	const removeCharacterFromGroupResult = await removeCharacterFromGroup(req.params.id, character.group_id);
	if (removeCharacterFromGroupResult?.errors) return res.status(200).send({ errors: removeCharacterFromGroupResult?.errors });

	const delete_images_result = await deleteImagesByKey("character_id", character._id);
	if (delete_images_result?.errors) return res.status(200).send({ errors: delete_images_result.errors });

	try {
		const characterDeleteResult = await Character.deleteOne({ _id: character._id });
		if (characterDeleteResult?.deletedCount !== 1) return res.status(200).send({ errors: [{ message: "Character Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};

async function removeCharacterFromStoryPrimaryCharacters(character_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.primaryCharacters) newStory.data.primaryCharacters = [];
	const characterIndex = newStory.data.primaryCharacters.findIndex((e) => e === character_id);
	if (characterIndex !== -1) newStory.data.primaryCharacters.splice(characterIndex, 1);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}

async function removeCharacterFromGroup(character_id, group_id) {
	const oldGroup = await Group.findById(group_id)
		.exec()
		.catch(() => false);
	if (!oldGroup) return { errors: [{ message: "Group Not Found" }] };

	let newGroup = JSON.parse(JSON.stringify(oldGroup));
	if (!newGroup?.data?.characters) newGroup.data.characters = [];
	const characterIndex = newGroup.data.characters.findIndex((e) => e.character_id === character_id);
	if (characterIndex !== -1) newGroup.data.characters.splice(characterIndex, 1);

	try {
		await Group.findOneAndReplace({ _id: group_id }, newGroup, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Group Could Not Be Saved" }] };
	}

	return {};
}
