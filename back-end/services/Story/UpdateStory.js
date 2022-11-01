const Story = require("../../models/Story");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");
const GetValueInNestedObject = require("../GetValueInNestedObject");
const addToStoryChangeLog = require("./AddToStoryChangeLog");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldStory = await Story.findById(req.body.story_id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Story Not Found" }] });
		});
	if (!oldStory) return res.status(200).send({ errors: [{ message: "Story Not Found" }] });

	let newStory = JSON.parse(JSON.stringify(oldStory));
	const oldValue = GetValueInNestedObject(newStory, req.body.path);

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Story.findOne({ uid: newUID }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another story. Please enter a different UID" }] });

			newStory.uid = newUID;
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

	if (JSON.stringify(oldValue) !== JSON.stringify(req?.body?.newValue))
		addToStoryChangeLog(
			req.body.story_id,
			generateChangeLogItem({
				content_id: req.params.id,
				path: req.body.path,
			})
		);

	return res.status(200).send({ message: "Success", data: { story: newStory } });
};

function generateChangeLogItem({ content_id, path }) {
	let newPath = JSON.parse(JSON.stringify(path));
	const newChangeLogItem = { content_type: "story", content_id, title: "", path };

	const pathTitlePairs = [
		{ path: ["uid"], title: "Unique Identifier" },
		{ path: ["owner"], title: "Owner" },
		{ path: ["data", "title"], title: "Title" },
		{ path: ["data", "isPrivate"], title: "Privacy" },
		{ path: ["data", "members"], title: "Members" },
		{ path: ["data", "icon"], title: "Icon Image" },
		{ path: ["data", "banner"], title: "Banner Image" },
		{ path: ["data", "description"], title: "Description" },
		{ path: ["data", "genres"], title: "Genres" },
		{ path: ["data", "colours", "accent"], title: "Accent Colour" },
		{ path: ["data", "colours", "accentHover"], title: "Accent Hover Colour" },
		{ path: ["data", "notes"], title: "Notes" },
		{ path: ["data", "groups"], title: "Groups" },
		{ path: ["data", "primaryCharacters"], title: "Primary Characters" },
		{ path: ["data", "characterTypes"], title: "Character Types" },
		{ path: ["data", "characterPreferences", "abilities", "defaultStatistics"], title: "Character Ability Default Statistics" },
		{ path: ["data", "substories"], title: "Substories" },
	];

	if (newPath.length > 2 && newPath[0] === "data" && newPath[1] === "notes") {
		const notesUid = newPath.splice(2, 1)[0];
		switch (notesUid) {
			case "all":
				newChangeLogItem.title += "All ";
				break;
			case "characters":
				newChangeLogItem.title += "Characters ";
				break;
			case "substories":
				newChangeLogItem.title += "Substories ";
				break;
			case "world":
				newChangeLogItem.title += "World ";
				break;
		}
	}

	const pathTitlePair = pathTitlePairs.find((e) => JSON.stringify(e.path) === JSON.stringify(newPath));
	newChangeLogItem.title += pathTitlePair ? pathTitlePair?.title : "";

	return newChangeLogItem;
}
