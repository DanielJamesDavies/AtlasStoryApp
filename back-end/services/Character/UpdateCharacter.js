const Character = require("../../models/Character");
const Group = require("../../models/Group");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldCharacter = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!oldCharacter) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	let newCharacter = JSON.parse(JSON.stringify(oldCharacter));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["url"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "url", message: "Invalid Arguments Given" }] });

			const newURL = req.body.newValue.split(" ").join("-");

			if (newURL.length < 1)
				return res.status(200).send({ errors: [{ attribute: "url", message: "This URL is too short. Please enter a different URL." }] });

			const urlUsed = await Character.findOne({ url: newURL, story_id: req.body.story_id }).exec();
			if (urlUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "url", message: "This URL is being used by another character. Please enter a different URL" }] });

			newCharacter.url = newURL;
		case JSON.stringify(["group_id"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "url", message: "Invalid Arguments Given" }] });

			const addCharacterToGroupResult = await addCharacterToGroup(req.params.id, req.body.newValue);
			if (addCharacterToGroupResult?.errors) return res.status(200).send({ errors: addCharacterToGroupResult?.errors });

			const removeCharacterFromGroupResult = await removeCharacterFromGroup(req.params.id, newCharacter.group_id);
			if (removeCharacterFromGroupResult?.errors) return res.status(200).send({ errors: removeCharacterFromGroupResult?.errors });

			newCharacter.group_id = req.body.newValue;

			break;
		default:
			newCharacter = ChangeValueInNestedObject(newCharacter, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await Character.findOneAndReplace({ _id: req.params.id }, newCharacter, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Character Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { character: newCharacter } });
};

async function addCharacterToGroup(character_id, group_id) {
	const oldGroup = await Group.findById(group_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Group Not Found" }] };
		});
	if (!oldGroup) return { errors: [{ message: "Group Not Found" }] };

	let newGroup = JSON.parse(JSON.stringify(oldGroup));
	if (!newGroup?.data?.characters) newGroup.data.characters = [];
	if (newGroup.data.characters.findIndex((e) => e.character_id === character_id) === -1) newGroup.data.characters.push({ character_id });

	try {
		await Group.findOneAndReplace({ _id: group_id }, newGroup, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Group Could Not Be Saved" }] };
	}

	return {};
}

async function removeCharacterFromGroup(character_id, group_id) {
	const oldGroup = await Group.findById(group_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Group Not Found" }] };
		});

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
