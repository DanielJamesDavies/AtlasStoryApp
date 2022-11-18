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

			const newOwnerMembers = newMembers.filter((e) => e.type === "owner" && JSON.stringify(e.user_id) !== JSON.stringify(newStory.owner));
			if (newOwnerMembers.length > 0) {
				const oldOwnerUserID = newStory.owner;
				const newOwnerUserID = newOwnerMembers[0].user_id;

				const newOwnerUser = await User.findById(newOwnerUserID)
					.exec()
					.catch(() => false);
				if (!newOwnerUser) return res.status(200).send({ errors: [{ message: "Could Not Find New Owner" }] });

				let newNewOwnerUser = JSON.parse(JSON.stringify(newOwnerUser));
				if (newNewOwnerUser.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(newStory._id)) === -1)
					newNewOwnerUser.data.stories.push(newStory._id);

				try {
					await User.findOneAndReplace({ _id: newOwnerUserID }, newNewOwnerUser, { upsert: true });
				} catch (error) {
					console.log(error);
					return res.status(200).send({ errors: [{ message: "New Owner Could Not Be Saved" }] });
				}

				const oldOwnerUser = await User.findById(oldOwnerUserID)
					.exec()
					.catch(() => false);
				if (!oldOwnerUser) return res.status(200).send({ errors: [{ message: "Could Not Find Old Owner" }] });

				let newOldOwnerUser = JSON.parse(JSON.stringify(oldOwnerUser));
				const oldOwnerUserStoryIndex = newOldOwnerUser.data.stories.findIndex((e) => JSON.stringify(e) === JSON.stringify(newStory._id));
				if (oldOwnerUserStoryIndex !== -1) newOldOwnerUser.data.stories.splice(oldOwnerUserStoryIndex, 1);

				try {
					await User.findOneAndReplace({ _id: oldOwnerUserID }, newOldOwnerUser, { upsert: true });
				} catch (error) {
					return res.status(200).send({ errors: [{ message: "Old Owner Could Not Be Saved" }] });
				}

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
					if (req?.body?.newValue) newStory.data.notes.push(req.body.newValue);
					break;
				}
				newPath[2] = notesIndex;

				// Notes Images
				let oldNotesImages = [];
				newStory.data.notes[notesIndex].items.forEach((item) => {
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
							} catch (error) {}
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
