const mongoose = require("mongoose");

const Character = require("../../models/Character");
const Group = require("../../models/Group");
const Story = require("../../models/Story");
const Image = require("../../models/Image");

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
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Character.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another character. Please enter a different UID" }] });

			newCharacter.uid = newUID;
		case JSON.stringify(["group_id"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "group_id", message: "Invalid Arguments Given" }] });

			const addCharacterToGroupResult = await addCharacterToGroup(req.params.id, req.body.newValue);
			if (addCharacterToGroupResult?.errors) return res.status(200).send({ errors: addCharacterToGroupResult?.errors });

			const removeCharacterFromGroupResult = await removeCharacterFromGroup(req.params.id, newCharacter.group_id);
			if (removeCharacterFromGroupResult?.errors) return res.status(200).send({ errors: removeCharacterFromGroupResult?.errors });

			newCharacter.group_id = req.body.newValue;

			break;
		case JSON.stringify(["isPrimaryCharacter"]):
			if (req.body.newValue) {
				const addCharacterToStoryPrimaryCharactersResult = await addCharacterToStoryPrimaryCharacters(req.params.id, newCharacter.story_id);
				if (addCharacterToStoryPrimaryCharactersResult?.errors)
					return res.status(200).send({ errors: addCharacterToStoryPrimaryCharactersResult?.errors });
			} else {
				const removeCharacterFromStoryPrimaryCharactersResult = await removeCharacterFromStoryPrimaryCharacters(
					req.params.id,
					newCharacter.story_id
				);
				if (removeCharacterFromStoryPrimaryCharactersResult?.errors)
					return res.status(200).send({ errors: removeCharacterFromStoryPrimaryCharactersResult?.errors });
			}

			newCharacter.isPrimaryCharacter = req.body.newValue;
			break;
		case JSON.stringify(["data", "versions"]):
			if (req.body.newValue.length === 0) return res.status(200).send({ errors: [{ message: "A Character Cannot Have No Versions" }] });

			let newVersions = req.body.newValue;

			newVersions = newVersions.map((version) => {
				const versionIndex = newCharacter.data.versions.findIndex((e) => e._id === version._id);
				if (versionIndex === -1) {
					version._id = new mongoose.Types.ObjectId();
				} else {
					const tempVersion = version;
					version = newCharacter.data.versions[versionIndex];
					version.title = tempVersion.title;
				}
				return version;
			});

			newCharacter.data.versions = newVersions;
			newCharacter = new Character(newCharacter);
			newCharacter = JSON.parse(JSON.stringify(newCharacter));

			break;
		case JSON.stringify(["data", "images"]):
			const oldImages = newCharacter.data.images;
			const newImages = req.body.newValue.character_images;

			// Remove Removed Images
			await Promise.all(
				oldImages.map(async (oldImageID) => {
					if (newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(oldImageID)) === -1) {
						try {
							await Image.deleteOne({ _id: oldImageID });
						} catch (error) {}
					}
					return true;
				})
			);

			newCharacter.data.versions = newCharacter.data.versions.map((version) => {
				version.gallery = version.gallery.filter(
					(galleryItem) => newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
				);
				return version;
			});

			newCharacter.data.development.items = newCharacter.data.development.items.map((item) => {
				item.images = item.images.filter((image) => newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(image.image)) !== -1);
				return item;
			});

			// Create New Images
			await Promise.all(
				newImages.map(async (newImageID) => {
					if (oldImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(newImageID)) === -1) {
						let newImage = req.body.newValue.images.find((e) => JSON.stringify(e._id) === JSON.stringify(newImageID))?.image;

						if (newImage) {
							const image = new Image({
								_id: newImageID,
								image: newImage,
								story_id: newCharacter.story_id,
								character_id: newCharacter._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newCharacter.data.images = newImages;

			break;
		default:
			if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "versions") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const versionIndex = newCharacter.data.versions.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[2]));
				if (versionIndex === -1) break;
				newPath[2] = versionIndex;

				if (newPath[3] === "abilities") {
					if (newPath.length === 4) {
						newAbilities = req?.body?.newValue.map((ability) => {
							const abilityIndex = newCharacter.data.versions[versionIndex].abilities.findIndex(
								(e) => JSON.stringify(e._id) === JSON.stringify(ability._id)
							);
							if (abilityIndex === -1) return { _id: ability?._id };
							return newCharacter.data.versions[versionIndex].abilities[abilityIndex];
						});
						newCharacter = ChangeValueInNestedObject(newCharacter, newPath, newAbilities);
						break;
					}

					if (newPath.length > 4) {
						abilityIndex = newCharacter.data.versions[versionIndex].abilities.findIndex(
							(e) => JSON.stringify(e._id) === JSON.stringify(newPath[4])
						);
						if (abilityIndex === -1) {
							abilityIndex = newCharacter.data.versions[versionIndex].abilities.length;
							newCharacter.data.versions[versionIndex].abilities.push({ _id: newPath[4] });
						}
						newPath[4] = abilityIndex;
					}
				}

				newCharacter = ChangeValueInNestedObject(newCharacter, newPath, req?.body?.newValue);
			} else {
				newCharacter = ChangeValueInNestedObject(newCharacter, req?.body?.path, req?.body?.newValue);
			}
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

async function addCharacterToStoryPrimaryCharacters(character_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Story Not Found" }] };
		});
	if (!oldStory) return { errors: [{ message: "Story Not Found" }] };

	let newStory = JSON.parse(JSON.stringify(oldStory));
	if (!newStory?.data?.primaryCharacters) newStory.data.primaryCharacters = [];
	if (newStory.data.primaryCharacters.findIndex((e) => e === character_id) === -1) newStory.data.primaryCharacters.push(character_id);

	try {
		await Story.findOneAndReplace({ _id: story_id }, newStory, { upsert: true });
	} catch (error) {
		return { errors: [{ message: "Story Could Not Be Saved" }] };
	}

	return {};
}

async function removeCharacterFromStoryPrimaryCharacters(character_id, story_id) {
	const oldStory = await Story.findById(story_id)
		.exec()
		.catch(() => {
			return { errors: [{ message: "Story Not Found" }] };
		});
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
