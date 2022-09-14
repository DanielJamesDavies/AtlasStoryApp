const mongoose = require("mongoose");

const Substory = require("../../models/Substory");
const Group = require("../../models/Group");
const Story = require("../../models/Story");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldSubstory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!oldSubstory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

	let newSubstory = JSON.parse(JSON.stringify(oldSubstory));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Substory.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another substory. Please enter a different UID" }] });

			newSubstory.uid = newUID;
		case JSON.stringify(["data", "images"]):
			const oldImages = newSubstory.data.images;
			const newImages = req.body.newValue.substory_images;

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

			newSubstory.data.development.items = newSubstory.data.development.items.map((item) => {
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
								story_id: newSubstory.story_id,
								substory_id: newSubstory._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newSubstory.data.images = newImages;

			break;
		case JSON.stringify(["data", "plot", "clusters"]):
			newSubstory.data.plot.clusters = req?.body?.newValue.map((cluster) => {
				let newCluster = cluster;
				const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
				if (clusterIndex === -1) return newCluster;
				newCluster = newSubstory.data.plot.clusters[clusterIndex];
				newCluster.name = cluster.name;
				return newCluster;
			});
			if (newSubstory.data.plot.clusters.findIndex((e) => e.isAll === true) === -1)
				newSubstory.data.plot.clusters.splice(0, 0, { isAll: true, name: "All Plot Items" });

			break;
		default:
			if (req.body.path.length > 3 && req.body.path[0] === "data" && req.body.path[1] === "plot" && req.body.path[2] === "clusters") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const clusterIndex = newSubstory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[3]));
				if (clusterIndex === -1) break;
				newPath[3] = clusterIndex;

				if (req.body.path.length === 5 && req.body.path[4] === "groups") {
					newSubstory.data.plot.clusters[clusterIndex].groups = req?.body?.newValue.map((group) => {
						let newGroup = group;
						const groupIndex = newSubstory.data.plot.clusters[clusterIndex].groups.findIndex(
							(e) => JSON.stringify(e._id) === JSON.stringify(group._id)
						);
						if (groupIndex === -1) return newGroup;
						newGroup = newSubstory.data.plot.clusters[clusterIndex].groups[groupIndex];
						newGroup.name = group.name;
						return newGroup;
					});
					break;
				}

				if (newPath.length >= 6 && newPath[4] === "groups") {
					console.log(newPath[5]);
					const groupIndex = newSubstory.data.plot.clusters[clusterIndex].groups.findIndex(
						(e) => JSON.stringify(e._id) === JSON.stringify(newPath[5])
					);
					if (groupIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
					newPath[5] = groupIndex;
				}

				newSubstory = ChangeValueInNestedObject(newSubstory, newPath, req?.body?.newValue);
			} else {
				newSubstory = ChangeValueInNestedObject(newSubstory, req?.body?.path, req?.body?.newValue);
			}
			break;
	}

	try {
		await Substory.findOneAndReplace({ _id: req.params.id }, newSubstory, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Substory Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { substory: newSubstory } });
};
