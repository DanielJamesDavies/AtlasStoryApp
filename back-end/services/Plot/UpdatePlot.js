const mongoose = require("mongoose");

const Plot = require("../../models/Substory");
const Image = require("../../models/Image");

const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");

module.exports = async (req, res) => {
	if (!req?.body?.path || JSON.stringify(req?.body?.path) === JSON.stringify(["_id"]))
		return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldPlot = await Plot.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!oldPlot) return res.status(200).send({ errors: [{ message: "Plot Not Found" }] });

	// Story Authentication Check
	if (JSON.stringify(oldPlot.story_id) !== JSON.stringify(req.body.story_id))
		return res.status(200).send({ errors: [{ message: "Access Denied" }] });

	let newPlot = JSON.parse(JSON.stringify(oldPlot));

	switch (JSON.stringify(req.body.path)) {
		case JSON.stringify(["uid"]):
			if (!req?.body?.newValue) return res.status(200).send({ errors: [{ attribute: "uid", message: "Invalid Arguments Given" }] });

			const newUID = req.body.newValue.split(" ").join("-");

			if (newUID.length < 1)
				return res.status(200).send({ errors: [{ attribute: "uid", message: "This UID is too short. Please enter a different UID." }] });

			const uidUsed = await Plot.findOne({ uid: newUID, story_id: req.body.story_id }).exec();
			if (uidUsed)
				return res
					.status(200)
					.send({ errors: [{ attribute: "uid", message: "This UID is being used by another substory. Please enter a different UID" }] });

			newPlot.uid = newUID;

			break;
		case JSON.stringify(["data", "images"]):
			const oldImages = newPlot.data.images;
			const newImages = req.body.newValue.plot_images;

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

			newPlot.data.development.items = newPlot.data.development.items.map((item) => {
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
								story_id: newPlot.story_id,
								substory_id: newPlot._id,
							});

							try {
								await image.save();
							} catch (error) {}
						}
					}
				})
			);

			newPlot.data.images = newImages;

			break;
		case JSON.stringify(["data", "plot", "clusters"]):
			newPlot.data.plot.clusters = req?.body?.newValue.map((cluster) => {
				let newCluster = cluster;
				const clusterIndex = newPlot.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(cluster._id));
				if (clusterIndex === -1) return newCluster;
				newCluster = newPlot.data.plot.clusters[clusterIndex];
				newCluster.name = cluster.name;
				return newCluster;
			});
			if (newPlot.data.plot.clusters.findIndex((e) => e.isAll === true) === -1)
				newPlot.data.plot.clusters.splice(0, 0, { isAll: true, name: "All Plot Items" });

			break;
		case JSON.stringify(["data", "custom_subpages"]):
			let newCustomSubpages = req.body.newValue;

			newCustomSubpages = newCustomSubpages.map((custom_subpage) => {
				const customSubpageIndex = newPlot.data.custom_subpages.findIndex((e) => e.id === custom_subpage.id);
				if (customSubpageIndex === -1) {
					if (!custom_subpage.id) custom_subpage.id = new mongoose.Types.ObjectId();
				} else {
					const tempSubpage = custom_subpage;
					custom_subpage = newPlot.data.custom_subpages[customSubpageIndex];
					custom_subpage.name = tempSubpage.name;
				}
				return custom_subpage;
			});

			newPlot.data.custom_subpages = newCustomSubpages;
			newPlot = new Plot(newPlot);
			newPlot = JSON.parse(JSON.stringify(newPlot));

			break;
		default:
			if (req.body.path.length > 3 && req.body.path[0] === "data" && req.body.path[1] === "plot" && req.body.path[2] === "clusters") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const clusterIndex = newPlot.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[3]));
				if (clusterIndex === -1) break;
				newPath[3] = clusterIndex;

				if (req.body.path.length === 5 && req.body.path[4] === "groups") {
					newPlot.data.plot.clusters[clusterIndex].groups = req?.body?.newValue.map((group) => {
						let newGroup = group;
						const groupIndex = newPlot.data.plot.clusters[clusterIndex].groups.findIndex(
							(e) => JSON.stringify(e._id) === JSON.stringify(group._id)
						);
						if (groupIndex === -1) return newGroup;
						newGroup = newPlot.data.plot.clusters[clusterIndex].groups[groupIndex];
						newGroup.name = group.name;
						return newGroup;
					});
					break;
				}

				if (newPath.length >= 6 && newPath[4] === "groups") {
					const groupIndex = newPlot.data.plot.clusters[clusterIndex].groups.findIndex(
						(e) => JSON.stringify(e._id) === JSON.stringify(newPath[5])
					);
					if (groupIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
					newPath[5] = groupIndex;

					if (newPath.length === 7 && newPath[6] === "items" && req?.body?.newValue?.itemIDs && req?.body?.newValue?.items) {
						newPlot.data.plot.clusters[clusterIndex].groups[groupIndex].items = req?.body?.newValue?.itemIDs;
						req?.body?.newValue?.itemIDs.forEach((itemID) => {
							const oldItemIndex = newPlot.data.plot.items.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(itemID));
							const newItemIndex = req?.body?.newValue?.items.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(itemID));
							if (oldItemIndex !== -1 && newItemIndex !== -1)
								newPlot.data.plot.items[oldItemIndex] = req?.body?.newValue?.items[newItemIndex];
						});
						break;
					}
				}

				newPlot = ChangeValueInNestedObject(newPlot, newPath, req?.body?.newValue);
			} else if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "custom_subpages") {
				let newPath = JSON.parse(JSON.stringify(req.body.path));
				const customSubpageIndex = newPlot.data.custom_subpages.findIndex((e) => JSON.stringify(e.id) === JSON.stringify(newPath[2]));
				if (customSubpageIndex === -1) break;
				newPath[2] = customSubpageIndex;
				newPlot = ChangeValueInNestedObject(newPlot, newPath, req?.body?.newValue);
			} else {
				newPlot = ChangeValueInNestedObject(newPlot, req?.body?.path, req?.body?.newValue);
			}
			break;
	}

	try {
		await Plot.findOneAndReplace({ _id: req.params.id }, newPlot, { upsert: true });
	} catch (error) {
		return res.status(200).send({ errors: [{ message: "Plot Could Not Be Saved" }] });
	}

	return res.status(200).send({ message: "Success", data: { substory: newPlot } });
};
