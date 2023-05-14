const Group = require("../../models/Group");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const group = await Group.findById(req.params.id)
		.exec()
		.catch(() => false);
	if (!group) return res.status(200).send({ errors: [{ message: "Group Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "versions") {
		let newPath = JSON.parse(JSON.stringify(req.body.path));
		const versionIndex = group.data.versions.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[2]));
		if (versionIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
		newPath[2] = versionIndex;

		value = GetValueInNestedObject(JSON.parse(JSON.stringify(group)), newPath);
	} else if (JSON.stringify(req.body.path) === JSON.stringify(["data", "images"])) {
		let groupImages = await Promise.all(
			group.data.images.map(async (image_id) => {
				const image = Image.findById(image_id)
					.exec()
					.catch(() => false);
				if (!image) return false;
				return image;
			})
		);
		groupImages = groupImages.filter((e) => e !== false);
		return res.status(200).send({ message: "Success", data: { path: req.body.path, value: group.data.images, images: groupImages } });
	} else {
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(group)), req?.body?.path);
	}

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
