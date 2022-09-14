const Substory = require("../../models/Substory");
const Image = require("../../models/Image");
const GetValueInNestedObject = require("../GetValueInNestedObject");

module.exports = async (req, res) => {
	const substory = await Substory.findById(req.params.id)
		.exec()
		.catch(() => {
			res.status(200).send({ errors: [{ message: "Substory Not Found" }] });
		});
	if (!substory) return res.status(200).send({ errors: [{ message: "Substory Not Found" }] });

	if (!req.body.path) return res.status(200).send({ errors: [{ message: "Path Not Provided" }] });

	let value = false;

	if (req.body.path.length > 3 && req.body.path[0] === "data" && req.body.path[1] === "plot" && req.body.path[2] === "clusters") {
		let newPath = JSON.parse(JSON.stringify(req.body.path));
		const clusterIndex = substory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[3]));
		if (clusterIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
		newPath[3] = clusterIndex;

		if (newPath.length >= 6 && newPath[4] === "groups") {
			const groupIndex = substory.data.plot.clusters.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(newPath[5]));
			if (groupIndex === -1) return res.status(200).send({ errors: [{ message: "Invalid Path" }] });
			newPath[5] = groupIndex;
		}

		value = GetValueInNestedObject(JSON.parse(JSON.stringify(substory)), newPath);
	} else {
		value = GetValueInNestedObject(JSON.parse(JSON.stringify(substory)), req?.body?.path);
	}

	res.status(200).send({ message: "Success", data: { path: req.body.path, value } });
};
