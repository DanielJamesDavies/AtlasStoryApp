const Substory = require("../../models/Substory");
const Image = require("../../models/Image");

const GetValueInNestedObject = require("../GetValueInNestedObject");
const ChangeValueInNestedObject = require("../ChangeValueInNestedObject");
const addToStoryChangeLog = require("../Story/AddToStoryChangeLog");

module.exports = async (req, res) => {
	if (!req?.body?.path || req?.body?.path === ["_id"]) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });

	const oldSubstory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!oldSubstory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
	const oldValue = GetValueInNestedObject(oldSubstory, req.body.path);

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

			break;
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
					const groupIndex = newSubstory.data.plot.clusters[clusterIndex].groups.findIndex(
						(e) => JSON.stringify(e._id) === JSON.stringify(newPath[5])
					);
					if (groupIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
					newPath[5] = groupIndex;

					if (newPath.length === 7 && newPath[6] === "items" && req?.body?.newValue?.itemIDs && req?.body?.newValue?.items) {
						newSubstory.data.plot.clusters[clusterIndex].groups[groupIndex].items = req?.body?.newValue?.itemIDs;
						req?.body?.newValue?.itemIDs.forEach((itemID) => {
							const oldItemIndex = newSubstory.data.plot.items.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(itemID));
							const newItemIndex = req?.body?.newValue?.items.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(itemID));
							if (oldItemIndex !== -1 && newItemIndex !== -1)
								newSubstory.data.plot.items[oldItemIndex] = req?.body?.newValue?.items[newItemIndex];
						});
						break;
					}
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

	if (JSON.stringify(oldValue) !== JSON.stringify(req?.body?.newValue))
		addToStoryChangeLog(
			req.body.story_id,
			generateChangeLogItem({
				content_id: req.params.id,
				path: req.body.path,
				substory: newSubstory,
			})
		);

	return res.status(200).send({ message: "Success", data: { substory: newSubstory } });
};

function generateChangeLogItem({ content_id, path, substory }) {
	let newPath = JSON.parse(JSON.stringify(path));
	const newChangeLogItem = { content_type: "story", content_id, title: "", path };

	const pathTitlePairs = [
		{ path: ["uid"], title: "Unique Identifier" },
		{ path: ["data", "title"], title: "Title" },
		{ path: ["data", "isStoryTitleInTitle"], title: "Story Title in Substory Title Status" },
		{ path: ["data", "isTitleOnPoster"], title: "Title on Poster Status" },
		{ path: ["data", "colour"], title: "Colour" },
		{ path: ["data", "number"], title: "Number" },
		{ path: ["data", "posterBackground"], title: "Poster Background Image" },
		{ path: ["data", "overviewBackground"], title: "Overview Background Image" },
		{ path: ["data", "images"], title: "Images" },
		{ path: ["data", "summaryItems"], title: "Summary Items" },
		{ path: ["data", "description"], title: "Description" },
		{ path: ["data", "gallery"], title: "Gallery" },
		{ path: ["data", "plot"], title: "Plot" },
		{ path: ["data", "plot", "items"], title: "Plot Items" },
		{ path: ["data", "plot", "clusters"], title: "Plot Clusters" },
		{ path: ["data", "plot", "clusters", "name"], title: "Name" },
		{ path: ["data", "plot", "clusters", "groups"], title: "Groups" },
		{ path: ["data", "plot", "clusters", "groups", "name"], title: "Name" },
		{ path: ["data", "plot", "clusters", "groups", "items"], title: "Items" },
		{ path: ["data", "soundtrack"], title: "Soundtrack" },
		{ path: ["data", "soundtrack", "playlist_id"], title: "Soundtrack Playlist" },
		{ path: ["data", "soundtrack", "tracks"], title: "Soundtrack Tracks" },
		{ path: ["data", "development"], title: "Development" },
		{ path: ["data", "development", "items"], title: "Development Items" },
		{ path: ["data", "subpages"], title: "Subpages" },
	];

	let plotCluster = false;
	let plotClusterGroup = false;
	if (newPath.length > 3 && newPath[0] === "data" && newPath[1] === "plot" && newPath[2] === "clusters") {
		const plotClusterID = newPath.splice(3, 1)[0];
		plotCluster = substory.data.plot.clusters.find((e) => JSON.stringify(e._id) === JSON.stringify(plotClusterID));

		if (newPath.length > 4 && newPath[3] === "groups") {
			const plotClusterGroupID = newPath.splice(4, 1)[0];
			plotClusterGroup = plotCluster?.groups.find((e) => JSON.stringify(e._id) === JSON.stringify(plotClusterGroupID));
		}
	}

	const pathTitlePair = pathTitlePairs.find((e) => JSON.stringify(e.path) === JSON.stringify(newPath));
	newChangeLogItem.title += pathTitlePair ? pathTitlePair?.title : "";

	if (plotClusterGroup?.name) newChangeLogItem.title += ' on Group "' + plotClusterGroup.name + '"';
	if (plotCluster?.name) newChangeLogItem.title += ' on Plot Cluster "' + plotCluster.name + '"';

	return newChangeLogItem;
}
