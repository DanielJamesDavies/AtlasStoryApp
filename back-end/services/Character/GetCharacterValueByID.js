const Character = require("../../models/Character");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const character = await Character.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Character Not Found" }] });
		});
	if (!character) return res.status(200).send({ errors: [{ message: "Character Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	if (req.body.path.length > 2 && req.body.path[0] === "data" && req.body.path[1] === "versions") {
		let newPath = JSON.parse(JSON.stringify(req.body.path));
		const versionIndex = character.data.versions.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[2]));
		if (versionIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
		newPath[2] = versionIndex;

		if (newPath.length >= 5 && newPath[3] === "biography") {
			const biographyClusterIndex = character.data.versions[versionIndex].biography.findIndex(
				(e) => JSON.stringify(e._id) === JSON.stringify(newPath[4])
			);
			if (biographyClusterIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
			newPath[4] = biographyClusterIndex;
		}

		if (newPath.length >= 5 && newPath[3] === "abilities") {
			const abilityIndex = character.data.versions[versionIndex].abilities.findIndex(
				(e) => JSON.stringify(e._id) === JSON.stringify(newPath[4])
			);
			if (abilityIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
			newPath[4] = abilityIndex;
		}

		value = GetValueInNestedObject(JSON.parse(JSON.stringify(character)), newPath);
	} else if (JSON.stringify(req.body.path) === JSON.stringify(["data", "images"])) {
		let characterImages = await Promise.all(
			character.data.images.map(async (image_id) => {
				const image = Image.findById(image_id)
					.exec()
					.catch(() => {});
				if (!image) return false;
				return image;
			})
		);
		characterImages = characterImages.filter((e) => e !== false);
		return res.status(200).send({ message: "Success", data: { path: req.body.path, value: character.data.images, images: characterImages } });
	} else {
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(character)), req?.body?.path);
	}

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
