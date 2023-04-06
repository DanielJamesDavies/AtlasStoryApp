const CharacterType = require("../../models/CharacterType");
const Story = require("../../models/Story");

module.exports = async (req, res) => {
	const characterType = await CharacterType.findById(req.params.id)
		.exec()
		.catch(() => true);
	if (!characterType?._id || !characterType?.story_id) return res.status(200).send({ errors: [{ message: "Character Type Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(characterType.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	const oldStory = await Story.findById(characterType.story_id)
		.exec()
		.catch(() => true);
	if (!oldStory || !oldStory?.data?.characterTypes) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));
	const characterTypeIndex = newStory.data.characterTypes.findIndex((e) => e.toString() === characterType._id.toString());
	if (characterTypeIndex !== -1) newStory.data.characterTypes.splice(characterTypeIndex, 1);

	try {
		await Story.findOneAndUpdate({ _id: newStory._id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	try {
		const characterTypeDeleteResult = await CharacterType.deleteOne({ _id: characterType._id });
		if (characterTypeDeleteResult?.deletedCount !== 1)
			return res.status(200).send({ errors: [{ message: "Character Type Could Not Be Deleted" }] });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Type Could Not Be Deleted" }] });
	}

	return res.status(200).send({ message: "Success" });
};
