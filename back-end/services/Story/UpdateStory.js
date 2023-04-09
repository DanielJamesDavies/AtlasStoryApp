const Story = require("../../models/Story");
const User = require("../../models/User");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldStory = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => false);
	if (!oldStory) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldStory._id) !== JSON.stringify(req.body.story_id)) return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID" }] });

			const uidUsed = await Story.findOne({ uid: newUID }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another story. Please enter a different UID" }] });

			newStory.uid = newUID;
			break;
		case JSON.stringify(["data", "members"]):
			let newMembers = JSON.parse(JSON.stringify(req?.body?.newValue));

			if (newMembers.length === 0 || newMembers.filter((e) => e.type === "owner").length === 0)
				return res.status(200).send({ errors: [{ message: "Invalid New Members" }] });

			const addedMembers = newMembers.filter(
				(e) => newStory.data.members.findIndex((e2) => JSON.stringify(e2.user_id) === JSON.stringify(e.user_id)) === -1
			);

			await Promise.all(
				addedMembers.map(async (member) => {
					await addStoryToUserStories(member.user_id, newStory._id);
					return true;
				})
			);

			const removedMembers = newStory.data.members.filter(
				(e) => newMembers.findIndex((e2) => JSON.stringify(e2.user_id) === JSON.stringify(e.user_id)) === -1
			);

			await Promise.all(
				removedMembers.map(async (member) => {
					await removeStoryFromUserStories(member.user_id, newStory._id);
					return true;
				})
			);

			const newOwnerMembers = newMembers.filter((e) => e.type === "owner" && JSON.stringify(e.user_id) !== JSON.stringify(newStory.owner));
			if (newOwnerMembers.length > 0) {
				const oldOwnerUserID = newStory.owner;
				const newOwnerUserID = newOwnerMembers[0].user_id;

				newStory.owner = newOwnerUserID;

				const membersOldOwnerIndex = newMembers.findIndex((e) => JSON.stringify(e.user_id) === JSON.stringify(oldOwnerUserID));
				if (membersOldOwnerIndex !== -1) newMembers[membersOldOwnerIndex].type = "viewer";

				const membersNewOwnerIndex = newMembers.findIndex((e) => JSON.stringify(e.user_id) === JSON.stringify(newOwnerUserID));
				if (membersNewOwnerIndex !== -1) {
					const membersNewOwner = newMembers.splice(membersNewOwnerIndex, 1)[0];
					newMembers.splice(0, 0, membersNewOwner);
				}
			}

			newStory.data.members = newMembers;
			break;
		default:
			if (req.body.path.length === 3 && req.body.path[0] === "data" && req.body.path[1] === "notes") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const notesIndex = newStory.data.notes.findIndex((e) => e.uid === newPath[2]);
				if (notesIndex === -1) {
					console.log(req.body.newValue);
					if (!req?.body?.newValue) return;
					newStory.data.notes.push(req.body.newValue);
					newPath[2] = newStory.data.notes.length - 1;
				} else {
					newPath[2] = notesIndex;
				}

				// Notes Images
				let oldNotesImages = [];
				newStory.data.notes[newPath[2]].items.forEach((item) => {
					if (item.images) oldNotesImages = oldNotesImages.concat(item.images.map((image) => image?.image));
				});

				let newNotesImages = [];
				req.body.newValue.items.forEach((item) => {
					if (item.images) newNotesImages = newNotesImages.concat(item.images.map((image) => image?.image));
				});

				// Notes Images: Remove Removed Images
				await Promise.all(
					oldNotesImages.map(async (oldImageID) => {
						if (newNotesImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(oldImageID)) === -1) {
							try {
								await Image.deleteOne({ _id: oldImageID });
							} catch (error) {}
						}
						return true;
					})
				);

				// Notes Images: Create New Images
				await Promise.all(
					newNotesImages.map(async (newImageID) => {
						if (oldNotesImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(newImageID)) === -1) {
							let newImage = req.body.newImages.find((e) => JSON.stringify(e._id) === JSON.stringify(newImageID))?.image;
							if (!newImage) return false;

							const image = new Image({ _id: newImageID, image: newImage, story_id: newStory._id });

							try {
								await image.save();
							} catch (error) {
								console.log(error);
							}
							return true;
						}
					})
				);

				newStory = ChangeValueInNestedObject(newStory, newPath, req?.body?.newValue);
				break;
			}

			newStory = ChangeValueInNestedObject(newStory, req?.body?.path, req?.body?.newValue);
			break;
	}

	try {
		await Story.findOneAndReplace({ _id: req.params.id }, newStory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Story Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { story: newStory } });
};

async function addStoryToUserStories(user_id, story_id) {
	const user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "Could Not Find User" }] });

	let newUser = JSON.parse(JSON.stringify(user));

	const storyIndex = newUser.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story_id));
	if (storyIndex === -1) newUser.data.stories.push(story_id);

	try {
		await User.findOneAndReplace({ _id: newUser._id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	return newUser;
}

async function removeStoryFromUserStories(user_id, story_id) {
	const user = await User.findById(user_id)
		.exec()
		.catch(() => false);
	if (!user) return res.status(200).send({ errors: [{ message: "Could Not Find User" }] });

	let newUser = JSON.parse(JSON.stringify(user));

	const storyIndex = newUser.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(story_id));
	if (storyIndex !== -1) newUser.data.stories.splice(storyIndex, 1);

	try {
		await User.findOneAndReplace({ _id: user_id }, newUser, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "User Could Not Be Saved" }] });
	}

	return newUser;
}
