const mongoose = require("mongoose");

const Group = require("../../models/Group");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldGroup = await Group.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldGroup) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldGroup.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let newGroup = JSON.parse(JSON.stringify(oldGroup));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Group.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another group. Please enter a different UID" }] });

			newGroup.uid = newUID;

			break;
		case JSON.stringify(["data", "versions"]):
			if (req.body.newValue.length === 0) return res.status(200).send({ errors: [{ message: "A Group Cannot Have No Versions" }] });

			let newVersions = req.body.newValue;

			newVersions = newVersions.map((version) => {
				const versionIndex = newGroup.data.versions.findIndex((e) => e._id === version._id);
				if (versionIndex === -1) {
					version._id = new mongoose.Types.ObjectId();
				} else {
					const tempVersion = version;
					version = newGroup.data.versions[versionIndex];
					version.title = tempVersion.title;
				}
				return version;
			});

			newGroup.data.versions = newVersions;
			newGroup = new Group(newGroup);
			newGroup = JSON.parse(JSON.stringify(newGroup));

			break;
		case JSON.stringify(["data", "custom_subpages"]):
			let newCustomSubpages = req.body.newValue;

			newCustomSubpages = newCustomSubpages.map((custom_subpage) => {
				const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => e.id === custom_subpage.id);
				if (customSubpageIndex === -1) {
					if (!custom_subpage.id) custom_subpage.id = new mongoose.Types.ObjectId();
				} else {
					const tempSubpage = custom_subpage;
					custom_subpage = newGroup.data.custom_subpages[customSubpageIndex];
					custom_subpage.name = tempSubpage.name;
				}
				return custom_subpage;
			});

			newGroup.data.custom_subpages = newCustomSubpages;
			newGroup = new Group(newGroup);
			newGroup = JSON.parse(JSON.stringify(newGroup));

			break;
		case JSON.stringify(["data", "images"]):
			const oldImages = newGroup.data.images;
			const newImages = req.body.newValue.group_images;

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

			newGroup.data.versions = newGroup.data.versions.map((version) => {
				version.gallery = version.gallery.filter(
					(galleryItem) => newImages.findIndex((e) => JSON.stringify(e) === JSON.stringify(galleryItem.image)) !== -1
				);
				return version;
			});

			newGroup.data.development.items = newGroup.data.development.items.map((item) => {
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
								story_id: newGroup.story_id,
								group_id: newGroup._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newGroup.data.images = newImages;

			break;
		default:
			if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "versions") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const versionIndex = newGroup.data.versions.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[2]));
				if (versionIndex === -1) break;
				newPath[2] = versionIndex;

				newGroup = ChangeValueInNestedObject(newGroup, newPath, req?.body?.newValue);
			} else if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "custom_subpages") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const customSubpageIndex = newGroup.data.custom_subpages.findIndex((e) => JSON.stringify(e.id) === JSON.stringify(newPath[2]));
				if (customSubpageIndex === -1) break;
				newPath[2] = customSubpageIndex;
				newGroup = ChangeValueInNestedObject(newGroup, newPath, req?.body?.newValue);
			} else {
				newGroup = ChangeValueInNestedObject(newGroup, req?.body?.path, req?.body?.newValue);
			}
			break;
	}

	try {
		await Group.findOneAndReplace({ _id: req.params.id }, newGroup, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Group Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { group: newGroup } });
};
